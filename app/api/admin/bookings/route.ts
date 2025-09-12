import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    const tourId = searchParams.get('tourId')
    const page = parseInt(searchParams.get('page') || '1')
    const limit = parseInt(searchParams.get('limit') || '20')

    const where: any = {}
    if (status) where.status = status
    if (tourId) {
      where.departure = {
        conquistatourId: tourId
      }
    }

    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
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
          traveler: {
            include: {
              profile: true
            }
          },
          travelers: true,
          payments: true
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip: (page - 1) * limit,
        take: limit
      }),
      prisma.booking.count({ where })
    ])

    const totalPages = Math.ceil(total / limit)

    return NextResponse.json({
      bookings,
      pagination: {
        page,
        limit,
        total,
        totalPages,
        hasNext: page < totalPages,
        hasPrev: page > 1
      },
      summary: {
        totalBookings: total,
        totalRevenue: bookings.reduce((sum, booking) => sum + booking.totalPrice, 0),
        averageBookingSize: bookings.length > 0 ? 
          bookings.reduce((sum, booking) => sum + booking.participants, 0) / bookings.length : 0
      }
    })

  } catch (error) {
    console.error('Error fetching bookings for admin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch bookings' },
      { status: 500 }
    )
  }
}