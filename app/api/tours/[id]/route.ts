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
    
    const tour = await prisma.conquistaTour.findUnique({
      where: { id },
      include: {
        leader: {
          include: {
            profile: true
          }
        },
        departures: {
          where: {
            status: 'LIVE',
            startDate: {
              gte: new Date()
            }
          },
          orderBy: {
            startDate: 'asc'
          }
        },
        reviews: {
          include: {
            traveler: {
              include: {
                profile: true
              }
            }
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        _count: {
          select: {
            reviews: true
          }
        }
      }
    })

    if (!tour) {
      return NextResponse.json(
        { error: 'Tour not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(tour)

  } catch (error) {
    console.error('Error fetching tour:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tour' },
      { status: 500 }
    )
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params
    const body = await request.json()
    
    // This would be protected by authentication and authorization
    const updateTourSchema = z.object({
      title: z.string().min(1).optional(),
      tagline: z.string().min(1).optional(),
      description: z.string().min(1).optional(),
      location: z.string().min(1).optional(),
      duration: z.number().min(1).max(30).optional(),
      cuisineTypes: z.string().min(1).optional(),
      groupSize: z.number().min(1).max(20).optional(),
      pricePerPerson: z.number().min(100).optional(),
      highlights: z.array(z.string()).optional(),
      inclusions: z.array(z.string()).optional(),
      exclusions: z.array(z.string()).optional(),
      itinerary: z.array(z.any()).optional(),
      heroImages: z.array(z.string()).optional(),
      galleryImages: z.array(z.string()).optional(),
      minAge: z.number().min(0).optional(),
      maxAge: z.number().optional(),
      difficulty: z.string().optional(),
      cancellationPolicy: z.enum(['FLEXIBLE', 'MODERATE', 'STRICT']).optional(),
      status: z.enum(['DRAFT', 'PENDING_APPROVAL', 'APPROVED', 'LIVE', 'PAUSED', 'CANCELLED']).optional()
    })

    const validatedData = updateTourSchema.parse(body)

    // Convert arrays to JSON strings for SQLite
    const updateData: any = { ...validatedData }
    if (validatedData.highlights) updateData.highlights = JSON.stringify(validatedData.highlights)
    if (validatedData.inclusions) updateData.inclusions = JSON.stringify(validatedData.inclusions)
    if (validatedData.exclusions) updateData.exclusions = JSON.stringify(validatedData.exclusions)
    if (validatedData.itinerary) updateData.itinerary = JSON.stringify(validatedData.itinerary)
    if (validatedData.heroImages) updateData.heroImages = JSON.stringify(validatedData.heroImages)
    if (validatedData.galleryImages) updateData.galleryImages = JSON.stringify(validatedData.galleryImages)

    // Update slug if title changed
    if (validatedData.title) {
      updateData.slug = validatedData.title
        .toLowerCase()
        .replace(/[^\w\s-]/g, '')
        .replace(/\s+/g, '-')
        .replace(/-+/g, '-')
        .trim()
    }

    const tour = await prisma.conquistaTour.update({
      where: { id },
      data: updateData,
      include: {
        leader: {
          include: {
            profile: true
          }
        },
        departures: true,
        reviews: true
      }
    })

    return NextResponse.json(tour)

  } catch (error) {
    console.error('Error updating tour:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to update tour' },
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
    
    // This would be protected by authentication and authorization
    await prisma.conquistaTour.delete({
      where: { id }
    })

    return NextResponse.json({ message: 'Tour deleted successfully' })

  } catch (error) {
    console.error('Error deleting tour:', error)
    return NextResponse.json(
      { error: 'Failed to delete tour' },
      { status: 500 }
    )
  }
}