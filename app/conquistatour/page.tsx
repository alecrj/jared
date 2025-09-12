import { PrismaClient } from '@prisma/client'
import { ToursGrid } from '@/components/conquistatour/tours-grid'
import { TourFilters } from '@/components/conquistatour/tour-filters'

const prisma = new PrismaClient()

interface ToursPageProps {
  searchParams: Promise<{
    search?: string
    cuisine?: string
    location?: string
    minPrice?: string
    maxPrice?: string
    duration?: string
    page?: string
  }>
}

export default async function ToursPage({ searchParams }: ToursPageProps) {
  const params = await searchParams
  
  const page = parseInt(params.page || '1')
  const limit = 12
  
  const where: any = {
    status: 'LIVE'
  }

  // Apply filters
  if (params.search) {
    where.OR = [
      { title: { contains: params.search, mode: 'insensitive' } },
      { description: { contains: params.search, mode: 'insensitive' } },
      { location: { contains: params.search, mode: 'insensitive' } }
    ]
  }

  if (params.cuisine) {
    where.cuisineTypes = {
      contains: params.cuisine,
      mode: 'insensitive'
    }
  }

  if (params.location) {
    where.location = {
      contains: params.location,
      mode: 'insensitive'
    }
  }

  if (params.minPrice || params.maxPrice) {
    where.pricePerPerson = {}
    if (params.minPrice) where.pricePerPerson.gte = parseInt(params.minPrice) * 100
    if (params.maxPrice) where.pricePerPerson.lte = parseInt(params.maxPrice) * 100
  }

  if (params.duration) {
    where.duration = parseInt(params.duration)
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
        }
      },
      orderBy: [
        { featuredOrder: 'asc' },
        { createdAt: 'desc' }
      ],
      skip: (page - 1) * limit,
      take: limit
    }),
    prisma.conquistaTour.count({ where })
  ])

  const totalPages = Math.ceil(total / limit)

  // Get unique cuisines for filter
  const allTours = await prisma.conquistaTour.findMany({
    where: { status: 'LIVE' },
    select: { cuisineTypes: true }
  })

  const allCuisines = new Set<string>()
  allTours.forEach(tour => {
    tour.cuisineTypes.split(',').forEach(cuisine => {
      if (cuisine.trim()) {
        allCuisines.add(cuisine.trim())
      }
    })
  })

  return (
    <div className="min-h-screen bg-white">
      <div className="container">
        {/* Header */}
        <div className="section text-center">
          <h1 className="display-lg text-gray-800 mb-6">
            Culinary experiences
          </h1>
          <p className="body-xl text-gray-600 max-w-2xl mx-auto">
            Discover authentic food culture through hands-on experiences with passionate local hosts
          </p>
        </div>

        {/* Filters and Results */}
        <div className="section">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-1">
              <TourFilters
                availableCuisines={Array.from(allCuisines).sort()}
                currentFilters={params}
              />
            </div>
            
            <div className="lg:col-span-3">
              <div className="mb-8 flex items-center justify-between">
                <p className="body-base text-gray-600">
                  {total === 1 
                    ? '1 experience'
                    : `${total} experiences`
                  }
                </p>
                <div className="caption text-gray-500">
                  Page {page} of {totalPages}
                </div>
              </div>
              
              <ToursGrid 
                tours={tours} 
                currentPage={page}
                totalPages={totalPages}
                baseUrl="/conquistatour"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export const metadata = {
  title: 'Unique Experiences - Conquistador',
  description: 'Join group adventures and discover authentic experiences with passionate local guides around the world.',
}