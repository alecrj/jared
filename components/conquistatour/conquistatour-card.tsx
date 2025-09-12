'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star } from 'lucide-react'
import { formatPrice } from '@/lib/utils'

interface ConquistaTourCardProps {
  tour: {
    id: string
    title: string
    slug: string
    tagline: string
    location: string
    duration: number
    cuisineTypes: string
    pricePerPerson: number
    heroImages: string
    groupSize: number
    leader: {
      profile?: {
        displayName: string
        avatarUrl?: string
      }
    }
    reviews: {
      rating: number
    }[]
  }
  index?: number
}

export function ConquistaTourCard({ tour, index = 0 }: ConquistaTourCardProps) {
  const heroImages = JSON.parse(tour.heroImages || '[]')
  const averageRating = tour.reviews.length > 0 
    ? tour.reviews.reduce((acc, review) => acc + review.rating, 0) / tour.reviews.length
    : 0

  return (
    <Link 
      href={`/conquistatour/${tour.slug}`}
      className="group block animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="card card-hover">
        {/* Image Container */}
        <div className="aspect-photo relative overflow-hidden bg-gray-100">
          <Image
            src={heroImages[0] || '/placeholder-food.svg'}
            alt={tour.title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* Favorite Heart */}
          <button className="absolute top-4 right-4 p-2 hover:scale-110 transition-transform">
            <div className="w-7 h-7 border-2 border-white rounded-full bg-black/10 flex items-center justify-center backdrop-blur-sm">
              <div className="w-4 h-4 border border-white rounded-full" />
            </div>
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6 space-y-3">
          {/* Location & Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center caption text-gray-600">
              <MapPin className="w-3 h-3 mr-1" />
              <span>{tour.location}</span>
            </div>
            {averageRating > 0 && (
              <div className="flex items-center">
                <Star className="w-3 h-3 mr-1 text-gray-800 fill-current" />
                <span className="caption font-medium text-gray-800">
                  {averageRating.toFixed(1)}
                </span>
                <span className="caption text-gray-500 ml-1">
                  ({tour.reviews.length})
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 className="heading-md text-gray-800 line-clamp-2 group-hover:text-gray-600 transition-colors">
            {tour.title}
          </h3>

          {/* Duration & Host */}
          <p className="body-sm text-gray-600">
            {tour.duration} days · Hosted by {tour.leader.profile?.displayName || 'Local Guide'}
          </p>
          
          {/* Price */}
          <div className="flex items-baseline pt-2">
            <span className="heading-md text-gray-800">
              {formatPrice(tour.pricePerPerson)}
            </span>
            <span className="body-sm text-gray-600 ml-1">
              per person
            </span>
          </div>
        </div>
      </div>
    </Link>
  )
}