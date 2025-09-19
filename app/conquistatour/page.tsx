import { PrismaClient } from '@prisma/client'
import { ExperiencesClient } from '@/components/conquistatour/experiences-client'
import NavScrollHandler from '../components/NavScrollHandler'

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

  return (
    <>
      <NavScrollHandler />
      <ExperiencesClient
        tours={tours}
        total={total}
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}

export const metadata = {
  title: 'Unique Experiences - Conquistador',
  description: 'Join group adventures and discover authentic experiences with passionate local guides around the world.',
}