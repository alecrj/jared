import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const createBookingSchema = z.object({
  departureId: z.string().cuid(),
  participants: z.number().min(1).max(20),
  travelers: z.array(z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    phone: z.string().optional(),
    dateOfBirth: z.string().optional(),
    dietaryRestrictions: z.string().optional(),
    emergencyContact: z.object({
      name: z.string(),
      phone: z.string(),
      relationship: z.string()
    })
  })),
  specialRequests: z.string().optional(),
  travelerId: z.string().cuid() // In real app, this would come from session
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const validatedData = createBookingSchema.parse(body)

    // Check departure availability
    const departure = await prisma.departure.findUnique({
      where: { id: validatedData.departureId },
      include: {
        conquistatour: true,
        bookings: {
          where: {
            status: { in: ['PENDING', 'CONFIRMED'] }
          }
        }
      }
    })

    if (!departure) {
      return NextResponse.json(
        { error: 'Departure not found' },
        { status: 404 }
      )
    }

    // Calculate current bookings
    const currentBookings = departure.bookings.reduce((sum, booking) => sum + booking.participants, 0)
    
    if (currentBookings + validatedData.participants > departure.availableSpots) {
      return NextResponse.json(
        { error: 'Not enough spots available' },
        { status: 400 }
      )
    }

    // Calculate pricing
    const totalPrice = departure.conquistatour.pricePerPerson * validatedData.participants
    const depositAmount = Math.round(totalPrice * departure.conquistatour.depositPercentage)
    
    // Calculate balance due date (21 days before tour)
    const balanceDueAt = new Date(departure.startDate)
    balanceDueAt.setDate(balanceDueAt.getDate() - 21)

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        departureId: validatedData.departureId,
        travelerId: validatedData.travelerId,
        participants: validatedData.participants,
        totalPrice,
        depositAmount,
        balanceDueAt,
        specialRequests: validatedData.specialRequests,
        status: 'PENDING',
        travelers: {
          create: validatedData.travelers.map(traveler => ({
            firstName: traveler.firstName,
            lastName: traveler.lastName,
            email: traveler.email,
            phone: traveler.phone,
            dateOfBirth: traveler.dateOfBirth ? new Date(traveler.dateOfBirth) : null,
            dietaryRestrictions: traveler.dietaryRestrictions,
            emergencyContact: JSON.stringify(traveler.emergencyContact)
          }))
        }
      },
      include: {
        departure: {
          include: {
            conquistatour: {
              include: {
                leader: {
                  include: {
                    profile: true
                  }
                }
              }
            }
          }
        },
        travelers: true,
        traveler: {
          include: {
            profile: true
          }
        }
      }
    })

    return NextResponse.json(booking, { status: 201 })

  } catch (error) {
    console.error('Error creating booking:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create booking' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const status = searchParams.get('status')

    if (!userId) {
      return NextResponse.json(
        { error: 'User ID required' },
        { status: 400 }
      )
    }

    const where: any = { travelerId: userId }
    if (status) {
      where.status = status
    }

    const bookings = await prisma.booking.findMany({
      where,
      include: {
        departure: {
          include: {
            conquistatour: {
              include: {
                leader: {
                  include: {
                    profile: true
                  }
                }
              }
            }
          }
        },
        travelers: true,
        payments: true
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(bookings)

  } catch (error) {
    console.error('Error fetching bookings:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}