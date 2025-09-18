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
      className="group block"
      style={{
        animationDelay: `${index * 120}ms`,
        animation: 'modernFadeIn 1s var(--ease-out-expo) forwards',
        opacity: 0,
        transform: 'translateY(40px) scale(0.95)'
      }}
    >
      <div className="card">
        {/* Image Container */}
        <div style={{
          aspectRatio: '4/3',
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--color-neutral-100)',
          borderRadius: 'var(--radius-xl) var(--radius-xl) 0 0'
        }}>
          <Image
            src={heroImages[0] || '/placeholder-food.svg'}
            alt={tour.title}
            fill
            className="object-cover"
            style={{ transition: 'transform 0.6s var(--ease-out-expo)' }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
          />
          {/* Favorite Heart - Modern 3D Style */}
          <button
            className="absolute top-4 right-4 p-2"
            style={{
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'var(--blur-md)',
              WebkitBackdropFilter: 'var(--blur-md)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid rgba(255, 255, 255, 0.3)',
              transition: 'all 0.5s var(--ease-out-expo)',
              boxShadow: 'var(--shadow-medium)',
              zIndex: 10
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'scale(1.1) translateY(-2px)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
              e.currentTarget.style.boxShadow = 'var(--shadow-large)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'scale(1) translateY(0)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
              e.currentTarget.style.boxShadow = 'var(--shadow-medium)'
            }}
          >
            <div style={{
              width: '14px',
              height: '14px',
              border: '2px solid var(--color-neutral-700)',
              borderRadius: '50%'
            }} />
          </button>
        </div>
        
        {/* Content */}
        <div className="card-content">
          {/* Location & Rating */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 'var(--space-md)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              fontSize: 'var(--text-sm)',
              color: 'var(--color-neutral-500)',
              fontWeight: '500'
            }}>
              <MapPin className="w-3 h-3 mr-1" />
              <span>{tour.location}</span>
            </div>
            {averageRating > 0 && (
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <Star
                  className="w-3 h-3 mr-1"
                  style={{
                    color: 'var(--color-brand)',
                    fill: 'currentColor'
                  }}
                />
                <span style={{
                  fontSize: 'var(--text-sm)',
                  fontWeight: '600',
                  color: 'var(--color-primary)'
                }}>
                  {averageRating.toFixed(1)}
                </span>
                <span style={{
                  fontSize: 'var(--text-sm)',
                  color: 'var(--color-neutral-500)',
                  marginLeft: 'var(--space-xs)'
                }}>
                  ({tour.reviews.length})
                </span>
              </div>
            )}
          </div>

          {/* Title */}
          <h3 style={{
            fontSize: 'var(--text-xl)',
            fontWeight: '600',
            marginBottom: 'var(--space-md)',
            color: 'var(--color-primary)',
            lineHeight: '1.3',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
            fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif"
          }}>
            {tour.title}
          </h3>

          {/* Duration & Host */}
          <p style={{
            fontSize: 'var(--text-base)',
            color: 'var(--color-neutral-500)',
            marginBottom: 'var(--space-xl)',
            lineHeight: '1.6',
            fontWeight: '400'
          }}>
            {tour.duration} days · Hosted by {tour.leader.profile?.displayName || 'Local Guide'}
          </p>

          {/* Price */}
          <div className="price">
            {formatPrice(tour.pricePerPerson)} per person
          </div>
        </div>
      </div>
    </Link>
  )
}