'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Users } from 'lucide-react'

interface FeaturedToursSectionProps {
  tours: any[]
}

export function FeaturedToursSection({ tours }: FeaturedToursSectionProps) {
  // Mock travel experiences if no real data
  const mockExperiences = [
    {
      id: '1',
      title: 'Hidden Rome Walking Tour',
      location: 'Rome, Italy',
      price: 85,
      rating: 4.9,
      reviewCount: 234,
      duration: '3 hours',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      host: 'Maria',
      slug: 'hidden-rome-walking-tour'
    },
    {
      id: '2',
      title: 'Tokyo Night Photography',
      location: 'Tokyo, Japan',
      price: 120,
      rating: 4.8,
      reviewCount: 189,
      duration: '4 hours',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      host: 'Kenji',
      slug: 'tokyo-night-photography'
    },
    {
      id: '3',
      title: 'Barcelona Architecture Tour',
      location: 'Barcelona, Spain',
      price: 95,
      rating: 4.9,
      reviewCount: 156,
      duration: '5 hours',
      image: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      host: 'Carlos',
      slug: 'barcelona-architecture-tour'
    },
    {
      id: '4',
      title: 'Tuscany Vineyard Experience',
      location: 'Tuscany, Italy',
      price: 150,
      rating: 5.0,
      reviewCount: 98,
      duration: '6 hours',
      image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      host: 'Giovanni',
      slug: 'tuscany-vineyard-experience'
    }
  ]

  const displayTours = tours.length > 0 ? tours : mockExperiences

  const getImageUrl = (experience: any) => {
    if (experience.image) return experience.image
    if (experience.heroImages) {
      try {
        const images = JSON.parse(experience.heroImages)
        if (Array.isArray(images) && images.length > 0) {
          return images[0]
        }
      } catch (e) {
        return experience.heroImages
      }
    }
    return '/placeholder-travel.svg'
  }

  return (
    <section className="section-padding bg-gray-50">
      <div className="container-premium">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-display-md text-gray-900 mb-6">
            Featured experiences
          </h2>
          <p className="text-body-xl text-gray-600 max-w-2xl mx-auto">
            Discover unique adventures and authentic local experiences around the world
          </p>
        </div>

        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {displayTours.slice(0, 4).map((experience, index) => (
            <Link 
              key={experience.id} 
              href={`/conquistatour/${experience.slug}`}
              className="group block hover-lift"
            >
              <div className="card-premium overflow-hidden">
                {/* Image Container */}
                <div className="aspect-square relative overflow-hidden">
                  <Image
                    src={getImageUrl(experience)}
                    alt={experience.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-700"
                  />
                  
                  {/* Favorite Heart */}
                  <button className="absolute top-4 right-4 p-2 bg-white/80 backdrop-blur-sm rounded-full hover:bg-white transition-all duration-200">
                    <div className="w-4 h-4 border border-gray-400 rounded-full" />
                  </button>
                </div>

                {/* Content */}
                <div className="p-6">
                  {/* Location & Rating */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center text-gray-500">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span className="text-body-sm">{experience.location}</span>
                    </div>
                    {(experience.rating || 4.9) > 0 && (
                      <div className="flex items-center">
                        <Star className="w-4 h-4 mr-1 text-gray-900 fill-current" />
                        <span className="text-body-sm font-medium text-gray-900">
                          {experience.rating || 4.9}
                        </span>
                        <span className="text-body-sm text-gray-500 ml-1">
                          ({experience.reviewCount || experience.reviews?.length || 0})
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Title */}
                  <h3 className="text-heading-md text-gray-900 mb-2 line-clamp-2">
                    {experience.title}
                  </h3>

                  {/* Duration & Host */}
                  <p className="text-body-sm text-gray-600 mb-3">
                    {experience.duration} · Hosted by {experience.host || experience.leader?.profile?.displayName || 'Local Guide'}
                  </p>

                  {/* Price */}
                  <div className="flex items-baseline">
                    <span className="text-heading-md text-gray-900">
                      ${experience.price || Math.floor((experience.pricePerPerson || 0) / 100)}
                    </span>
                    <span className="text-body-sm text-gray-600 ml-1">
                      per person
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Show More Button */}
        <div className="text-center">
          <Link href="/conquistatour" className="btn btn-secondary btn-lg">
            View all experiences
          </Link>
        </div>
      </div>
    </section>
  )
}