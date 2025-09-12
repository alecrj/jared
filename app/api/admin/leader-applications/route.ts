import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const reviewApplicationSchema = z.object({
  applicationId: z.string().cuid(),
  status: z.enum(['APPROVED', 'REJECTED']),
  notes: z.string().optional()
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const status = searchParams.get('status') || 'PENDING'

    const applications = await prisma.leaderApplication.findMany({
      where: { status },
      include: {
        user: {
          include: {
            profile: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(applications)

  } catch (error) {
    console.error('Error fetching leader applications:', error)
    return NextResponse.json(
      { error: 'Failed to fetch leader applications' },
      { status: 500 }
    )
  }
}

export async function PUT(request: NextRequest) {
  try {
    const body = await request.json()
    const { applicationId, status, notes } = reviewApplicationSchema.parse(body)

    // Update application status
    const application = await prisma.leaderApplication.update({
      where: { id: applicationId },
      data: {
        status,
        notes,
        updatedAt: new Date()
      },
      include: {
        user: {
          include: {
            profile: true
          }
        }
      }
    })

    // If approved, update user role to LEADER
    if (status === 'APPROVED') {
      await prisma.user.update({
        where: { id: application.userId },
        data: {
          role: 'LEADER'
        }
      })
    }

    // Log admin action
    await prisma.adminAction.create({
      data: {
        adminId: body.adminId || 'admin_placeholder', // In real app, get from session
        targetType: 'LEADER_APPLICATION',
        targetId: applicationId,
        action: `APPLICATION_${status}`,
        notes
      }
    })

    return NextResponse.json({
      success: true,
      application,
      message: `Leader application ${status.toLowerCase()}`
    })

  } catch (error) {
    console.error('Error reviewing leader application:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to review application' },
      { status: 500 }
    )
  }
}