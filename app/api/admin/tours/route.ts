import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const updateTourStatusSchema = z.object({
  tourId: z.string().cuid(),
  status: z.enum(['APPROVED', 'LIVE', 'PAUSED', 'CANCELLED']),
  adminNotes: z.string().optional(),
  featuredOrder: z.number().optional()
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status')
    
    const where: any = {}
    if (status) {
      where.status = status
    }

    const tours = await prisma.conquistaTour.findMany({
      where,
      include: {
        leader: {
          include: {
            profile: true
          }
        },
        departures: {
          include: {
            bookings: {
              where: {
                status: { in: ['PENDING', 'CONFIRMED'] }
              }
            }
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      },
      orderBy: [
        { status: 'asc' },
        { createdAt: 'desc' }
      ]
    })

    return NextResponse.json(tours)

  } catch (error) {
    console.error('Error fetching tours for admin:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { tourId, status, adminNotes, featuredOrder } = updateTourStatusSchema.parse(body)

    const tour = await prisma.conquistaTour.update({
      where: { id: tourId },
      data: {
        status,
        adminNotes,
        featuredOrder,
        updatedAt: new Date()
      },
      include: {
        leader: {
          include: {
            profile: true
          }
        }
      }
    })

    // Log admin action
    await prisma.adminAction.create({
      data: {
        adminId: body.adminId || 'admin_placeholder', // In real app, get from session
        targetType: 'CONQUISTATOUR',
        targetId: tourId,
        action: `STATUS_UPDATE_${status}`,
        notes: adminNotes
      }
    })

    return NextResponse.json({
      success: true,
      tour,
      message: `Tour status updated to ${status}`
    })

  } catch (error) {
    console.error('Error updating tour status:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update tour status' },
      { status: 500 }
    )
  }
}