import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const searchSchema = z.object({
  search: z.string().optional(),
  cuisine: z.string().optional(),
  location: z.string().optional(),
  minPrice: z.number().optional(),
  maxPrice: z.number().optional(),
  duration: z.number().optional(),
  page: z.number().min(1).default(1),
  limit: z.number().min(1).max(50).default(12)
})

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    
    const query = searchSchema.parse({
      search: searchParams.get('search') || undefined,
      cuisine: searchParams.get('cuisine') || undefined,
      location: searchParams.get('location') || undefined,
      minPrice: searchParams.get('minPrice') ? Number(searchParams.get('minPrice')) : undefined,
      maxPrice: searchParams.get('maxPrice') ? Number(searchParams.get('maxPrice')) : undefined,
      duration: searchParams.get('duration') ? Number(searchParams.get('duration')) : undefined,
      page: searchParams.get('page') ? Number(searchParams.get('page')) : 1,
      limit: searchParams.get('limit') ? Number(searchParams.get('limit')) : 12
    })

    const where: any = {
      status: 'LIVE'
    }

    // Search filters
    if (query.search) {
      where.OR = [
        { title: { contains: query.search, mode: 'insensitive' } },
        { description: { contains: query.search, mode: 'insensitive' } },
        { location: { contains: query.search, mode: 'insensitive' } }
      ]
    }

    if (query.cuisine) {
      where.cuisineTypes = {
        contains: query.cuisine,
        mode: 'insensitive'
      }
    }

    if (query.location) {
      where.location = {
        contains: query.location,
        mode: 'insensitive'
      }
    }

    if (query.minPrice || query.maxPrice) {
      where.pricePerPerson = {}
      if (query.minPrice) where.pricePerPerson.gte = query.minPrice * 100 // Convert to cents
      if (query.maxPrice) where.pricePerPerson.lte = query.maxPrice * 100
    }

    if (query.duration) {
      where.duration = query.duration
    }

    const [tours, total] = await Promise.all([
      prisma.conquistaTour.findMany({
        where,
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
            },
            take: 3
          },
          reviews: {
            select: {
              rating: true
            }
          },
          _count: {
            select: {
              reviews: true
            }
          }
        },
        orderBy: [
          { featuredOrder: 'asc' },
          { createdAt: 'desc' }
        ],
        skip: (query.page - 1) * query.limit,
        take: query.limit
      }),
      prisma.conquistaTour.count({ where })
    ])

    const totalPages = Math.ceil(total / query.limit)

    return NextResponse.json({
      tours,
      pagination: {
        page: query.page,
        limit: query.limit,
        total,
        totalPages,
        hasNext: query.page < totalPages,
        hasPrev: query.page > 1
      }
    })

  } catch (error) {
    console.error('Error fetching tours:', error)
    return NextResponse.json(
      { error: 'Failed to fetch tours' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // This would be protected by authentication in a real app
    const body = await request.json()
    
    // Validation schema for creating tours
    const createTourSchema = z.object({
      title: z.string().min(1),
      tagline: z.string().min(1),
      description: z.string().min(1),
      location: z.string().min(1),
      duration: z.number().min(1).max(30),
      cuisineTypes: z.string().min(1),
      groupSize: z.number().min(1).max(20),
      pricePerPerson: z.number().min(100),
      highlights: z.array(z.string()).optional(),
      inclusions: z.array(z.string()).optional(),
      exclusions: z.array(z.string()).optional(),
      itinerary: z.array(z.any()).optional(),
      heroImages: z.array(z.string()).optional(),
      galleryImages: z.array(z.string()).optional(),
      minAge: z.number().min(0).default(18),
      maxAge: z.number().optional(),
      difficulty: z.string().default('All Levels'),
      cancellationPolicy: z.enum(['FLEXIBLE', 'MODERATE', 'STRICT']).default('MODERATE')
    })

    const validatedData = createTourSchema.parse(body)

    // Generate slug from title
    const slug = validatedData.title
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim()

    const tour = await prisma.conquistaTour.create({
      data: {
        ...validatedData,
        slug,
        leaderId: body.leaderId, // This would come from the authenticated user
        highlights: JSON.stringify(validatedData.highlights || []),
        inclusions: JSON.stringify(validatedData.inclusions || []),
        exclusions: JSON.stringify(validatedData.exclusions || []),
        itinerary: JSON.stringify(validatedData.itinerary || []),
        heroImages: JSON.stringify(validatedData.heroImages || []),
        galleryImages: JSON.stringify(validatedData.galleryImages || []),
        status: 'DRAFT'
      },
      include: {
        leader: {
          include: {
            profile: true
          }
        }
      }
    })

    return NextResponse.json(tour, { status: 201 })

  } catch (error) {
    console.error('Error creating tour:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create tour' },
      { status: 500 }
    )
  }
}