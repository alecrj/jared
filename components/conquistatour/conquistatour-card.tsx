'use client'

import Image from 'next/image'
import Link from 'next/link'
import { MapPin, Star, Heart, Clock, Users, Calendar } from 'lucide-react'
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
    <div
      style={{
        animationDelay: `${index * 120}ms`,
        animation: 'fadeInUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        opacity: 0,
        transform: 'translateY(32px)'
      }}
    >
      <Link
        href={`/conquistatour/${tour.slug}`}
        style={{
          textDecoration: 'none',
          color: 'inherit',
          display: 'block'
        }}
      >
        <div style={{
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'all 0.4s cubic-bezier(0.16, 1, 0.3, 1)',
          border: '1px solid var(--color-neutral-200)',
          position: 'relative',
          cursor: 'pointer'
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)'
          e.currentTarget.style.boxShadow = '0 24px 48px rgba(0, 0, 0, 0.12), 0 8px 16px rgba(5, 150, 105, 0.08)'
          e.currentTarget.style.borderColor = 'var(--color-brand)'
          const img = e.currentTarget.querySelector('img')
          if (img) img.style.transform = 'scale(1.1)'
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0) scale(1)'
          e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.04)'
          e.currentTarget.style.borderColor = 'var(--color-neutral-200)'
          const img = e.currentTarget.querySelector('img')
          if (img) img.style.transform = 'scale(1)'
        }}
        >
          {/* Image Container */}
          <div style={{
            position: 'relative',
            aspectRatio: '4/3',
            overflow: 'hidden'
          }}>
            <Image
              src={heroImages[0] || '/placeholder-food.svg'}
              alt={tour.title}
              fill
              className="object-cover"
              style={{
                transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
              }}
            />

            {/* Gradient Overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '50%',
              background: 'linear-gradient(180deg, rgba(0, 0, 0, 0.3) 0%, transparent 100%)',
              opacity: 0,
              transition: 'opacity 0.3s ease'
            }} />

            {/* Premium Badge */}
            <div style={{
              position: 'absolute',
              top: '16px',
              left: '16px',
              background: 'var(--color-brand-gradient)',
              color: 'white',
              padding: '8px 16px',
              borderRadius: '50px',
              fontSize: '12px',
              fontWeight: '700',
              fontFamily: 'var(--font-primary)',
              backdropFilter: 'blur(10px)',
              boxShadow: '0 4px 12px rgba(5, 150, 105, 0.4)',
              letterSpacing: '0.5px',
              textTransform: 'uppercase'
            }}>
              {tour.duration === 1 ? '★ Day Trip' : `★ ${tour.duration} Days`}
            </div>

            {/* Heart Button */}
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
              }}
              style={{
                position: 'absolute',
                top: '16px',
                right: '16px',
                width: '40px',
                height: '40px',
                border: 'none',
                background: 'rgba(255, 255, 255, 0.9)',
                borderRadius: '50%',
                cursor: 'pointer',
                zIndex: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.2s ease',
                backdropFilter: 'blur(10px)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'var(--color-brand)'
                e.currentTarget.style.transform = 'scale(1.1)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.9)'
                e.currentTarget.style.transform = 'scale(1)'
              }}
            >
              <Heart
                size={18}
                style={{
                  color: 'var(--color-neutral-600)',
                  transition: 'color 0.2s ease'
                }}
              />
            </button>
          </div>

          {/* Content */}
          <div style={{
            padding: '20px'
          }}>
            {/* Location & Rating */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '8px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}>
                <MapPin size={14} style={{ color: 'var(--color-brand)' }} />
                <span style={{
                  fontSize: '14px',
                  fontWeight: '500',
                  color: 'var(--color-neutral-600)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  {tour.location}
                </span>
              </div>
              {averageRating > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'var(--color-neutral-100)',
                  padding: '4px 8px',
                  borderRadius: '8px'
                }}>
                  <Star
                    size={12}
                    style={{
                      color: 'var(--color-brand)',
                      fill: 'var(--color-brand)'
                    }}
                  />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--color-neutral-700)',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    {averageRating.toFixed(1)}
                  </span>
                </div>
              )}
            </div>

            {/* Title */}
            <h3 style={{
              fontSize: '18px',
              fontWeight: '700',
              color: 'var(--color-primary)',
              lineHeight: '1.3',
              marginBottom: '12px',
              fontFamily: 'var(--font-display)',
              letterSpacing: '-0.01em',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden'
            }}>
              {tour.title}
            </h3>

            {/* Meta Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '16px',
              marginBottom: '16px'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Clock size={14} style={{ color: 'var(--color-neutral-500)' }} />
                <span style={{
                  fontSize: '13px',
                  color: 'var(--color-neutral-600)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  {tour.duration} {tour.duration === 1 ? 'day' : 'days'}
                </span>
              </div>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}>
                <Users size={14} style={{ color: 'var(--color-neutral-500)' }} />
                <span style={{
                  fontSize: '13px',
                  color: 'var(--color-neutral-600)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  Max {tour.groupSize}
                </span>
              </div>
            </div>

            {/* Host */}
            <div style={{
              fontSize: '14px',
              color: 'var(--color-neutral-600)',
              marginBottom: '16px',
              fontFamily: 'var(--font-primary)'
            }}>
              Hosted by {tour.leader.profile?.displayName || 'Local Expert'}
            </div>

            {/* Price */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}>
              <div>
                <span style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-display)'
                }}>
                  {formatPrice(tour.pricePerPerson)}
                </span>
                <span style={{
                  fontSize: '14px',
                  color: 'var(--color-neutral-600)',
                  marginLeft: '4px',
                  fontFamily: 'var(--font-primary)'
                }}>
                  per person
                </span>
              </div>
              <div style={{
                padding: '12px 20px',
                background: 'var(--color-brand-gradient)',
                color: 'white',
                borderRadius: '14px',
                fontSize: '13px',
                fontWeight: '700',
                fontFamily: 'var(--font-primary)',
                boxShadow: '0 4px 16px rgba(5, 150, 105, 0.3)',
                transition: 'all 0.2s ease',
                cursor: 'pointer',
                letterSpacing: '0.3px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.05)'
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(5, 150, 105, 0.4)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)'
                e.currentTarget.style.boxShadow = '0 4px 16px rgba(5, 150, 105, 0.3)'
              }}
              >
                Reserve Experience
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  )
}