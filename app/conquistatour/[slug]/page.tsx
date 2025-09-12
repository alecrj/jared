import { PrismaClient } from '@prisma/client'
import { notFound } from 'next/navigation'
import { TourHero } from '@/components/conquistatour/tour-hero'
import { TourDetails } from '@/components/conquistatour/tour-details'
import { BookingCard } from '@/components/booking/booking-card'

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

  return (
    <div className="min-h-screen bg-white">
      <TourHero tour={tour} />
      
      <div className="container-airbnb py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main content */}
          <div className="lg:col-span-2">
            <TourDetails tour={tour} />
          </div>
          
          {/* Booking sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <BookingCard tour={tour} departures={tour.departures} />
            </div>
          </div>
        </div>
      </div>
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