'use client'

import { useState } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, MapPin, Calendar, Users, Star, Share } from 'lucide-react'

interface TourHeroProps {
  tour: {
    title: string
    tagline: string
    location: string
    duration: number
    cuisineTypes: string
    groupSize: number
    heroImages: string
    reviews: { rating: number }[]
    leader: {
      profile?: {
        displayName: string
        avatarUrl?: string
      }
    }
  }
}

export function TourHero({ tour }: TourHeroProps) {
  const heroImages = JSON.parse(tour.heroImages || '[]')
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const cuisines = tour.cuisineTypes.split(',').filter(Boolean)
  const averageRating = tour.reviews.length > 0 
    ? tour.reviews.reduce((acc, review) => acc + review.rating, 0) / tour.reviews.length
    : 0

  const nextImage = () => {
    setCurrentImageIndex((prev) => 
      prev === heroImages.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => 
      prev === 0 ? heroImages.length - 1 : prev - 1
    )
  }

  return (
    <div className="relative h-[70vh] overflow-hidden bg-black">
      {/* Image Carousel - Airbnb Style */}
      <div className="relative w-full h-full">
        <div className="absolute inset-0">
          <Image
            src={heroImages[currentImageIndex] || '/placeholder-tour.jpg'}
            alt={`${tour.title} - Image ${currentImageIndex + 1}`}
            fill
            className="object-cover transition-opacity duration-500"
            priority
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        {/* Navigation arrows */}
        {heroImages.length > 1 && (
          <>
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
            >
              <ChevronLeft className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 transition-all"
            >
              <ChevronRight className="w-6 h-6 text-white" />
            </button>
          </>
        )}

        {/* Image indicators */}
        {heroImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
            {heroImages.map((_: string, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentImageIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentImageIndex 
                    ? 'bg-white' 
                    : 'bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Content overlay - Clean Airbnb Style */}
      <div className="absolute inset-0 flex items-end">
        <div className="container-airbnb pb-16">
          <div className="max-w-4xl text-white">
            {/* Title */}
            <h1 className="text-display-large md:text-6xl font-semibold mb-4">
              {tour.title}
            </h1>
            
            {/* Tour info */}
            <div className="flex flex-wrap gap-6 mb-8 text-body">
              <div className="flex items-center">
                <MapPin className="w-5 h-5 mr-2" />
                <span>{tour.location}</span>
              </div>
              <div className="flex items-center">
                <Calendar className="w-5 h-5 mr-2" />
                <span>{tour.duration} days</span>
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                <span>Up to {tour.groupSize} guests</span>
              </div>
              {averageRating > 0 && (
                <div className="flex items-center">
                  <Star className="w-5 h-5 mr-2 fill-current" />
                  <span>{averageRating.toFixed(1)} · {tour.reviews.length} reviews</span>
                </div>
              )}
            </div>

            {/* Host info */}
            {tour.leader.profile && (
              <div className="flex items-center mb-8">
                <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center mr-4">
                  {tour.leader.profile.avatarUrl ? (
                    <Image 
                      src={tour.leader.profile.avatarUrl} 
                      alt={tour.leader.profile.displayName}
                      width={48}
                      height={48}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-white font-semibold text-body">
                      {tour.leader.profile.displayName.charAt(0).toUpperCase()}
                    </span>
                  )}
                </div>
                <div>
                  <p className="text-caption opacity-90">Hosted by</p>
                  <p className="text-body-large font-medium">{tour.leader.profile.displayName}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}