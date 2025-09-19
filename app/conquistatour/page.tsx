import { PrismaClient } from '@prisma/client'
import Link from 'next/link'
import { ToursGrid } from '@/components/conquistatour/tours-grid'
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
              Premium Cultural Journeys
            </h1>
            <p style={{
              fontSize: '1.2rem',
              color: 'var(--color-neutral-600)',
              maxWidth: '700px',
              margin: '0 auto 4rem',
              lineHeight: '1.7'
            }}>
              Discover multi-day adventures that immerse you in authentic local culture, cuisine, and hidden treasures
            </p>
          </div>

          {/* Results */}
          <div className="section">
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
                  ? '1 premium experience'
                  : `${total} premium experiences`
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
    </>
  )
}

export const metadata = {
  title: 'Premium Cultural Journeys - Conquistador',
  description: 'Discover multi-day adventures that immerse you in authentic local culture, cuisine, and hidden treasures around the world.',
}