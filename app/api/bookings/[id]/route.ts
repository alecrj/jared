import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    const booking = await prisma.booking.findUnique({
      where: { id },
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
        },
        payments: true,
        messages: {
          include: {
            from: {
              include: {
                profile: true
              }
            },
            to: {
              include: {
                profile: true
              }
            }
          },
          orderBy: {
            createdAt: 'asc'
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(booking)

  } catch (error) {
    console.error('Error fetching booking:', error)
    return NextResponse.json(
      { error: 'Failed to fetch booking' },
      { status: 500 }
    )
  }
}

const updateBookingSchema = z.object({
  status: z.enum(['PENDING', 'CONFIRMED', 'CANCELLED', 'REFUNDED']).optional(),
  specialRequests: z.string().optional(),
  paidDeposit: z.boolean().optional(),
  paidBalance: z.boolean().optional()
})

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    const validatedData = updateBookingSchema.parse(body)

    const booking = await prisma.booking.update({
      where: { id },
      data: validatedData,
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
      }
    })

    return NextResponse.json(booking)

  } catch (error) {
    console.error('Error updating booking:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update booking' },
      { status: 500 }
    )
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    
    // Check if booking can be cancelled based on policies
    const booking = await prisma.booking.findUnique({
      where: { id },
      include: {
        departure: {
          include: {
            conquistatour: true
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Calculate cancellation eligibility
    const now = new Date()
    const startDate = new Date(booking.departure.startDate)
    const daysBefore = Math.floor((startDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24))

    const policy = booking.departure.conquistatour.cancellationPolicy
    let canCancel = false
    let refundAmount = 0

    switch (policy) {
      case 'FLEXIBLE':
        canCancel = daysBefore >= 7
        refundAmount = canCancel ? booking.totalPrice : 0
        break
      case 'MODERATE':
        canCancel = daysBefore >= 14
        refundAmount = canCancel ? booking.totalPrice * 0.8 : 0 // 20% cancellation fee
        break
      case 'STRICT':
        canCancel = daysBefore >= 30
        refundAmount = canCancel ? booking.totalPrice * 0.5 : 0 // 50% cancellation fee
        break
    }

    if (!canCancel) {
      return NextResponse.json(
        { error: 'Cancellation not allowed within the policy timeframe' },
        { status: 400 }
      )
    }

    // Update booking status
    const updatedBooking = await prisma.booking.update({
      where: { id },
      data: {
        status: 'CANCELLED',
        updatedAt: new Date()
      }
    })

    // Create refund record if applicable
    if (refundAmount > 0 && booking.paidDeposit) {
      await prisma.refund.create({
        data: {
          bookingId: id,
          paymentId: '', // Would link to actual payment
          amount: refundAmount,
          reason: 'Customer cancellation',
          status: 'PENDING'
        }
      })
    }

    return NextResponse.json({
      message: 'Booking cancelled successfully',
      refundAmount,
      booking: updatedBooking
    })

  } catch (error) {
    console.error('Error cancelling booking:', error)
    return NextResponse.json(
      { error: 'Failed to cancel booking' },
      { status: 500 }
    )
  }
}