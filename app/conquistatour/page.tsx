import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { ToursGrid } from '@/components/conquistatour/tours-grid'
import { TourFilters } from '@/components/conquistatour/tour-filters'
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
    <>
      <NavScrollHandler />
      
      {/* Modern Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link href="/" className="logo">
              Conquistador
            </Link>
            <div className="nav-links">
              <Link href="/conquistatour">Experiences</Link>
              <Link href="/leader/apply">Host</Link>
              <Link href="/auth/login">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container" style={{ paddingTop: '120px' }}>
          {/* Header */}
          <div className="section text-center">
            <h1 style={{ 
              fontSize: 'clamp(2.5rem, 5vw, 3.5rem)', 
              fontWeight: '700', 
              color: 'var(--color-primary)', 
              marginBottom: '1.5rem',
              letterSpacing: '-0.02em',
              lineHeight: '1.2'
            }}>
              Unique experiences
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--color-neutral-600)',
              maxWidth: '700px',
              margin: '0 auto 4rem',
              lineHeight: '1.7'
            }}>
              Discover authentic adventures and cultural experiences with passionate local guides around the world
            </p>
          </div>

          {/* Filters and Results */}
          <div className="section">
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '3rem', alignItems: 'start' }}>
              <div>
                <TourFilters
                  availableCuisines={Array.from(allCuisines).sort()}
                  currentFilters={params}
                />
              </div>
              
              <div>
                <div style={{ 
                  marginBottom: '2rem', 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'space-between',
                  padding: '1.5rem',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(10px)',
                  borderRadius: '16px',
                  border: '1px solid rgba(15, 20, 25, 0.1)'
                }}>
                  <p style={{ 
                    fontSize: '1rem',
                    color: 'var(--color-neutral-600)',
                    fontWeight: '500'
                  }}>
                    {total === 1 
                      ? '1 experience found'
                      : `${total} experiences found`
                    }
                  </p>
                  <div style={{ 
                    fontSize: '0.875rem',
                    color: 'var(--color-neutral-500)'
                  }}>
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
    </>
  )
}

export const metadata = {
  title: 'Unique Experiences - Conquistador',
  description: 'Join group adventures and discover authentic experiences with passionate local guides around the world.',
}