'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowLeft, Heart, Share2, Star, MapPin, Calendar, Users, Clock, Play } from 'lucide-react'

interface PremiumTourHeroProps {
  tour: {
    id: string
    title: string
    tagline: string
    location: string
    duration: number
    groupSize: number
    heroImages: string
    galleryImages: string
    pricePerPerson: number
    reviews: { rating: number }[]
  }
}

export function PremiumTourHero({ tour }: PremiumTourHeroProps) {
  const [selectedImageIndex, setSelectedImageIndex] = useState(0)
  const [showGallery, setShowGallery] = useState(false)

  const heroImages = JSON.parse(tour.heroImages || '[]')
  const galleryImages = JSON.parse(tour.galleryImages || '[]')
  const allImages = [...heroImages, ...galleryImages]

  const averageRating = tour.reviews.length > 0
    ? tour.reviews.reduce((acc, review) => acc + review.rating, 0) / tour.reviews.length
    : 0

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 100)
  }

  return (
    <>
      {/* Enhanced Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(255, 255, 255, 0.98)',
        backdropFilter: 'blur(25px)',
        borderBottom: '1px solid rgba(0, 0, 0, 0.08)',
        padding: '20px 0',
        boxShadow: '0 1px 20px rgba(0, 0, 0, 0.1)',
        transition: 'all 0.3s ease'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Link href="/conquistatour" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              fontSize: '15px',
              fontWeight: '500',
              fontFamily: 'var(--font-primary)'
            }}>
              <ArrowLeft size={18} />
              Back to Experiences
            </Link>
            <Link href="/" style={{
              fontSize: '20px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-primary)',
              textDecoration: 'none'
            }}>
              Conquistador
            </Link>
            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: '8px',
                background: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)'
              }}>
                <Share2 size={14} />
                Share
              </button>
              <button style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                padding: '8px 16px',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: '8px',
                background: 'white',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)'
              }}>
                <Heart size={14} />
                Save
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Enhanced Hero Section */}
      <div style={{
        paddingTop: '90px',
        background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 50%, #f1f5f9 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Subtle animated background pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 20%, rgba(59, 130, 246, 0.03) 0%, transparent 50%), radial-gradient(circle at 80% 80%, rgba(168, 85, 247, 0.03) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        <div className="container">
          {/* Enhanced Title Section */}
          <div style={{
            padding: '40px 0',
            borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
            position: 'relative',
            zIndex: 2
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              marginBottom: '12px'
            }}>
              <div style={{
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                color: 'white',
                padding: '6px 16px',
                borderRadius: '50px',
                fontSize: '12px',
                fontWeight: '700',
                fontFamily: 'var(--font-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.8px',
                boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                animation: 'pulse 2s infinite'
              }}>
                ★ Featured Experience
              </div>
              {averageRating > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                  background: 'white',
                  padding: '4px 12px',
                  borderRadius: '50px',
                  border: '1px solid var(--color-neutral-200)'
                }}>
                  <Star size={12} style={{ color: 'var(--color-brand)', fill: 'var(--color-brand)' }} />
                  <span style={{
                    fontSize: '12px',
                    fontWeight: '600',
                    color: 'var(--color-primary)',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    {averageRating.toFixed(1)} ({tour.reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>

            <h1 style={{
              fontSize: 'clamp(32px, 5vw, 52px)',
              fontWeight: '800',
              fontFamily: 'var(--font-display)',
              background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              lineHeight: '1.1',
              marginBottom: '16px',
              letterSpacing: '-0.03em',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'
            }}>
              {tour.title}
            </h1>

            <p style={{
              fontSize: '20px',
              color: '#64748b',
              lineHeight: '1.7',
              marginBottom: '24px',
              fontFamily: 'var(--font-primary)',
              fontWeight: '400',
              maxWidth: '800px'
            }}>
              {tour.tagline}
            </p>

            {/* Quick Stats */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <MapPin size={16} style={{ color: 'var(--color-brand)' }} />
                <span style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  {tour.location}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Clock size={16} style={{ color: 'var(--color-brand)' }} />
                <span style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  {tour.duration} {tour.duration === 1 ? 'day' : 'days'}
                </span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Users size={16} style={{ color: 'var(--color-brand)' }} />
                <span style={{
                  fontSize: '15px',
                  fontWeight: '500',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  Max {tour.groupSize} guests
                </span>
              </div>
              <div style={{
                fontSize: '24px',
                fontWeight: '800',
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontFamily: 'var(--font-display)',
                textShadow: '0 2px 4px rgba(5, 150, 105, 0.2)'
              }}>
                {formatPrice(tour.pricePerPerson)} per person
              </div>
            </div>
          </div>

          {/* Enhanced Premium Photo Gallery */}
          <div style={{
            padding: '40px 0',
            position: 'relative'
          }}>
            {allImages.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: '2fr 1fr 1fr',
                gridTemplateRows: '360px 360px',
                gap: '16px',
                borderRadius: '24px',
                overflow: 'hidden',
                boxShadow: '0 25px 50px rgba(0, 0, 0, 0.15)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}>
                {/* Main Image */}
                <div
                  style={{
                    gridRowSpan: 2,
                    position: 'relative',
                    cursor: 'pointer',
                    overflow: 'hidden',
                    borderRadius: '20px',
                    background: '#000'
                  }}
                  onClick={() => setShowGallery(true)}
                >
                  <Image
                    src={allImages[0]}
                    alt={tour.title}
                    fill
                    className="object-cover"
                    style={{
                      transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: 'brightness(0.95)'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.transform = 'scale(1.08)'
                      e.currentTarget.style.filter = 'brightness(1.1)'
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.transform = 'scale(1)'
                      e.currentTarget.style.filter = 'brightness(0.95)'
                    }}
                  />
                  {/* Enhanced Video Play Button Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    background: 'rgba(0, 0, 0, 0.8)',
                    borderRadius: '50%',
                    width: '90px',
                    height: '90px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    backdropFilter: 'blur(15px)',
                    border: '3px solid rgba(255, 255, 255, 0.3)',
                    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.3)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1.15)'
                    e.currentTarget.style.borderColor = 'rgba(59, 130, 246, 0.8)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(0, 0, 0, 0.8)'
                    e.currentTarget.style.transform = 'translate(-50%, -50%) scale(1)'
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
                  }}
                  >
                    <Play size={36} style={{ color: 'white', marginLeft: '4px', transition: 'color 0.3s ease' }} />
                  </div>
                </div>

                {/* Thumbnail Images */}
                {allImages.slice(1, 5).map((image, index) => (
                  <div
                    key={index}
                    style={{
                      position: 'relative',
                      cursor: 'pointer',
                      overflow: 'hidden'
                    }}
                    onClick={() => {
                      setSelectedImageIndex(index + 1)
                      setShowGallery(true)
                    }}
                  >
                    <Image
                      src={image}
                      alt={`${tour.title} ${index + 2}`}
                      fill
                      className="object-cover"
                      style={{
                        transition: 'transform 0.6s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'scale(1.1)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'scale(1)'
                      }}
                    />
                    {/* Last image overlay */}
                    {index === 3 && allImages.length > 5 && (
                      <div style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.6)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        fontFamily: 'var(--font-primary)'
                      }}>
                        +{allImages.length - 5} more
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* View All Photos Button */}
            <button
              onClick={() => setShowGallery(true)}
              style={{
                position: 'absolute',
                bottom: '48px',
                right: '24px',
                padding: '12px 20px',
                background: 'rgba(255, 255, 255, 0.95)',
                border: '1px solid rgba(0, 0, 0, 0.2)',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                fontFamily: 'var(--font-primary)',
                backdropFilter: 'blur(10px)',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'white'
                e.currentTarget.style.transform = 'translateY(-2px)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.95)'
                e.currentTarget.style.transform = 'translateY(0)'
              }}
            >
              View all {allImages.length} photos
            </button>
          </div>
        </div>
      </div>

      {/* Full Screen Gallery Modal */}
      {showGallery && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Gallery Header */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              color: 'white',
              fontSize: '16px',
              fontWeight: '600',
              fontFamily: 'var(--font-primary)'
            }}>
              {selectedImageIndex + 1} / {allImages.length}
            </div>
            <button
              onClick={() => setShowGallery(false)}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              ×
            </button>
          </div>

          {/* Gallery Content */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '80vh',
              aspectRatio: '16/10'
            }}>
              <Image
                src={allImages[selectedImageIndex]}
                alt={`${tour.title} ${selectedImageIndex + 1}`}
                fill
                className="object-contain"
              />
            </div>
          </div>

          {/* Gallery Navigation */}
          <div style={{
            padding: '20px',
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            overflowX: 'auto'
          }}>
            {allImages.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImageIndex(index)}
                style={{
                  width: '60px',
                  height: '40px',
                  border: selectedImageIndex === index ? '2px solid white' : '1px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '4px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  position: 'relative',
                  opacity: selectedImageIndex === index ? 1 : 0.6,
                  transition: 'all 0.2s ease'
                }}
              >
                <Image
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </>
  )
}