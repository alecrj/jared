import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { PremiumTourHero } from '@/components/conquistatour/premium-tour-hero'
import { PremiumTourDetails } from '@/components/conquistatour/premium-tour-details'
import { PremiumBookingCard } from '@/components/conquistatour/premium-booking-card'
import { VideoGallery } from '@/components/conquistatour/video-gallery'
import { RouteMap } from '@/components/conquistatour/route-map'

const prisma = new PrismaClient()

interface TourPageProps {
  params: Promise<{ slug: string }>
}

export default async function TourPage({ params }: TourPageProps) {
  const { slug } = await params
  
  const tour = await prisma.conquistaTour.findUnique({
    where: { 
      slug,
      status: 'LIVE'
    },
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
        },
        take: 10
      }
    }
  })

  if (!tour) {
    notFound()
  }

  // Convert tour to match component types
  const tourForComponents = {
    ...tour,
    maxAge: tour.maxAge ?? undefined,
    leader: {
      ...tour.leader,
      profile: tour.leader.profile ? {
        displayName: tour.leader.profile.displayName,
        avatarUrl: tour.leader.profile.avatarUrl ?? undefined
      } : undefined
    }
  }

  return (
    <div className="min-h-screen" style={{
      background: 'linear-gradient(135deg, var(--color-neutral-50) 0%, #ffffff 50%, var(--color-neutral-50) 100%)'
    }}>
      <PremiumTourHero tour={tourForComponents as any} />

      <div className="container" style={{ padding: '64px 0' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '64px',
          alignItems: 'start'
        }}>
          {/* Main content */}
          <div>
            <PremiumTourDetails tour={tourForComponents as any} />
          </div>

          {/* Booking sidebar */}
          <div style={{ position: 'sticky', top: '120px' }}>
            <PremiumBookingCard tour={tour} departures={tour.departures} />
          </div>
        </div>
      </div>

      {/* Video Gallery Section */}
      <VideoGallery tour={tourForComponents as any} />

      {/* Interactive Route Map Section */}
      <RouteMap tour={tourForComponents as any} />
    </div>
  )
}

export async function generateMetadata({ params }: TourPageProps) {
  const { slug } = await params
  
  const tour = await prisma.conquistaTour.findUnique({
    where: { slug },
    select: {
      title: true,
      tagline: true,
      location: true,
      heroImages: true
    }
  })

  if (!tour) {
    return {
      title: 'Tour Not Found',
    }
  }

  const heroImages = JSON.parse(tour.heroImages || '[]')

  return {
    title: `${tour.title} - Conquistador`,
    description: tour.tagline,
    keywords: `culinary tour, food travel, ${tour.location}, cooking class, food experience`,
    openGraph: {
      title: tour.title,
      description: tour.tagline,
      images: heroImages.length > 0 ? [heroImages[0]] : undefined,
    },
  }
}