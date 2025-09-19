'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  Clock,
  Users,
  Star,
  MapPin,
  Calendar,
  CheckCircle,
  XCircle,
  Award,
  Utensils,
  Camera,
  Bed,
  ChevronDown,
  ChevronUp,
  Play,
  Map as MapIcon
} from 'lucide-react'

interface PremiumTourDetailsProps {
  tour: {
    id: string
    title: string
    description: string
    location: string
    duration: number
    groupSize: number
    difficulty: string
    minAge: number
    highlights: string
    inclusions: string
    exclusions: string
    itinerary: string
    cuisineTypes: string
    leader: {
      profile?: {
        displayName: string
        bio?: string
        culinaryBackground?: string
        avatarUrl?: string
      }
    }
    reviews: any[]
  }
}

export function PremiumTourDetails({ tour }: PremiumTourDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const [expandedDay, setExpandedDay] = useState<number | null>(1)

  const highlights = JSON.parse(tour.highlights || '[]')
  const inclusions = JSON.parse(tour.inclusions || '[]')
  const exclusions = JSON.parse(tour.exclusions || '[]')
  const itinerary = JSON.parse(tour.itinerary || '[]')

  const tabs = [
    { id: 'overview', label: 'Overview', icon: MapIcon },
    { id: 'itinerary', label: 'Itinerary', icon: Calendar },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'host', label: 'Your Host', icon: Award }
  ]

  const averageRating = tour.reviews.length > 0
    ? tour.reviews.reduce((acc, review) => acc + review.rating, 0) / tour.reviews.length
    : 0

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      overflow: 'hidden',
      boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
      border: '1px solid var(--color-neutral-200)'
    }}>
      {/* Tab Navigation */}
      <div style={{
        display: 'flex',
        borderBottom: '1px solid var(--color-neutral-200)',
        background: 'var(--color-neutral-50)'
      }}>
        {tabs.map((tab) => {
          const IconComponent = tab.icon
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                flex: 1,
                padding: '20px 16px',
                border: 'none',
                background: activeTab === tab.id ? 'white' : 'transparent',
                fontSize: '14px',
                fontWeight: activeTab === tab.id ? '600' : '500',
                color: activeTab === tab.id ? 'var(--color-brand)' : 'var(--color-neutral-600)',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                borderBottom: activeTab === tab.id ? '2px solid var(--color-brand)' : '2px solid transparent',
                fontFamily: 'var(--font-primary)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
            >
              <IconComponent size={16} />
              {tab.label}
            </button>
          )
        })}
      </div>

      {/* Tab Content */}
      <div style={{ padding: '32px' }}>
        {activeTab === 'overview' && (
          <div>
            {/* Description */}
            <div style={{ marginBottom: '40px' }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                color: 'var(--color-primary)',
                marginBottom: '16px'
              }}>
                About This Experience
              </h2>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.7',
                color: 'var(--color-neutral-700)',
                fontFamily: 'var(--font-primary)'
              }}>
                {tour.description}
              </p>
            </div>

            {/* Quick Facts */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '24px',
              marginBottom: '40px'
            }}>
              <div style={{
                padding: '20px',
                background: 'var(--color-neutral-50)',
                borderRadius: '12px',
                border: '1px solid var(--color-neutral-200)'
              }}>
                <Clock size={20} style={{ color: 'var(--color-brand)', marginBottom: '8px' }} />
                <div style={{
                  fontSize: '14px',
                  color: 'var(--color-neutral-600)',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-primary)'
                }}>
                  Duration
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  {tour.duration} days
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'var(--color-neutral-50)',
                borderRadius: '12px',
                border: '1px solid var(--color-neutral-200)'
              }}>
                <Users size={20} style={{ color: 'var(--color-brand)', marginBottom: '8px' }} />
                <div style={{
                  fontSize: '14px',
                  color: 'var(--color-neutral-600)',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-primary)'
                }}>
                  Group Size
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  Max {tour.groupSize} guests
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'var(--color-neutral-50)',
                borderRadius: '12px',
                border: '1px solid var(--color-neutral-200)'
              }}>
                <Award size={20} style={{ color: 'var(--color-brand)', marginBottom: '8px' }} />
                <div style={{
                  fontSize: '14px',
                  color: 'var(--color-neutral-600)',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-primary)'
                }}>
                  Difficulty
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  {tour.difficulty}
                </div>
              </div>

              <div style={{
                padding: '20px',
                background: 'var(--color-neutral-50)',
                borderRadius: '12px',
                border: '1px solid var(--color-neutral-200)'
              }}>
                <Users size={20} style={{ color: 'var(--color-brand)', marginBottom: '8px' }} />
                <div style={{
                  fontSize: '14px',
                  color: 'var(--color-neutral-600)',
                  marginBottom: '4px',
                  fontFamily: 'var(--font-primary)'
                }}>
                  Minimum Age
                </div>
                <div style={{
                  fontSize: '16px',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  {tour.minAge} years
                </div>
              </div>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div style={{ marginBottom: '40px' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-primary)',
                  marginBottom: '20px'
                }}>
                  Experience Highlights
                </h3>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                  gap: '16px'
                }}>
                  {highlights.map((highlight: string, index: number) => (
                    <div key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '12px',
                      padding: '16px',
                      background: 'linear-gradient(135deg, var(--color-brand) 0%, var(--color-brand-light) 100%)',
                      borderRadius: '12px',
                      color: 'white'
                    }}>
                      <CheckCircle size={20} style={{ flexShrink: 0, marginTop: '2px' }} />
                      <span style={{
                        fontSize: '14px',
                        lineHeight: '1.5',
                        fontFamily: 'var(--font-primary)',
                        fontWeight: '500'
                      }}>
                        {highlight}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Inclusions & Exclusions */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '32px'
            }}>
              {/* Inclusions */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-primary)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <CheckCircle size={20} style={{ color: 'var(--color-brand)' }} />
                  What's Included
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {inclusions.map((inclusion: string, index: number) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: 'var(--color-neutral-700)',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      <CheckCircle size={16} style={{ color: 'var(--color-brand)', flexShrink: 0, marginTop: '2px' }} />
                      {inclusion}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Exclusions */}
              <div>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-display)',
                  color: 'var(--color-primary)',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}>
                  <XCircle size={20} style={{ color: 'var(--color-neutral-500)' }} />
                  Not Included
                </h3>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                  {exclusions.map((exclusion: string, index: number) => (
                    <li key={index} style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '8px',
                      marginBottom: '8px',
                      fontSize: '14px',
                      color: 'var(--color-neutral-700)',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      <XCircle size={16} style={{ color: 'var(--color-neutral-500)', flexShrink: 0, marginTop: '2px' }} />
                      {exclusion}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'itinerary' && (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-primary)',
              marginBottom: '24px'
            }}>
              Day-by-Day Itinerary
            </h2>

            {itinerary.map((day: any, index: number) => (
              <div key={index} style={{
                border: '1px solid var(--color-neutral-200)',
                borderRadius: '16px',
                marginBottom: '16px',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setExpandedDay(expandedDay === day.day ? null : day.day)}
                  style={{
                    width: '100%',
                    padding: '24px',
                    border: 'none',
                    background: expandedDay === day.day ? 'var(--color-brand-gradient)' : 'var(--color-neutral-50)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    transition: 'all 0.3s ease'
                  }}
                >
                  <div style={{ textAlign: 'left' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: '600',
                      color: expandedDay === day.day ? 'white' : 'var(--color-primary)',
                      marginBottom: '4px',
                      fontFamily: 'var(--font-display)'
                    }}>
                      Day {day.day}: {day.title}
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: expandedDay === day.day ? 'rgba(255, 255, 255, 0.9)' : 'var(--color-neutral-600)',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      {day.location}
                    </div>
                  </div>
                  {expandedDay === day.day ? (
                    <ChevronUp size={24} style={{ color: 'white' }} />
                  ) : (
                    <ChevronDown size={24} style={{ color: 'var(--color-neutral-600)' }} />
                  )}
                </button>

                {expandedDay === day.day && (
                  <div style={{
                    padding: '24px',
                    background: 'white',
                    borderTop: '1px solid var(--color-neutral-200)'
                  }}>
                    {/* Activities */}
                    <div style={{ marginBottom: '24px' }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '600',
                        color: 'var(--color-primary)',
                        marginBottom: '12px',
                        fontFamily: 'var(--font-primary)'
                      }}>
                        Activities
                      </h4>
                      <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
                        {day.activities?.map((activity: string, actIndex: number) => (
                          <li key={actIndex} style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '8px',
                            marginBottom: '8px',
                            fontSize: '14px',
                            color: 'var(--color-neutral-700)',
                            fontFamily: 'var(--font-primary)',
                            lineHeight: '1.5'
                          }}>
                            <div style={{
                              width: '6px',
                              height: '6px',
                              borderRadius: '50%',
                              background: 'var(--color-brand)',
                              marginTop: '8px',
                              flexShrink: 0
                            }} />
                            {activity}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Meals & Accommodation */}
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                      gap: '20px'
                    }}>
                      {day.meals && (
                        <div style={{
                          padding: '16px',
                          background: 'var(--color-neutral-50)',
                          borderRadius: '8px'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px'
                          }}>
                            <Utensils size={16} style={{ color: 'var(--color-brand)' }} />
                            <span style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: 'var(--color-primary)',
                              fontFamily: 'var(--font-primary)'
                            }}>
                              Meals
                            </span>
                          </div>
                          <div style={{
                            fontSize: '13px',
                            color: 'var(--color-neutral-700)',
                            fontFamily: 'var(--font-primary)'
                          }}>
                            {Array.isArray(day.meals) ? day.meals.join(', ') : day.meals}
                          </div>
                        </div>
                      )}

                      {day.accommodation && day.accommodation !== 'N/A' && (
                        <div style={{
                          padding: '16px',
                          background: 'var(--color-neutral-50)',
                          borderRadius: '8px'
                        }}>
                          <div style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            marginBottom: '8px'
                          }}>
                            <Bed size={16} style={{ color: 'var(--color-brand)' }} />
                            <span style={{
                              fontSize: '14px',
                              fontWeight: '600',
                              color: 'var(--color-primary)',
                              fontFamily: 'var(--font-primary)'
                            }}>
                              Accommodation
                            </span>
                          </div>
                          <div style={{
                            fontSize: '13px',
                            color: 'var(--color-neutral-700)',
                            fontFamily: 'var(--font-primary)'
                          }}>
                            {day.accommodation}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {activeTab === 'reviews' && (
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '32px'
            }}>
              <h2 style={{
                fontSize: '24px',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                color: 'var(--color-primary)',
                margin: 0
              }}>
                Guest Reviews
              </h2>
              {tour.reviews.length > 0 && (
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  background: 'var(--color-brand-gradient)',
                  borderRadius: '50px',
                  color: 'white'
                }}>
                  <Star size={20} style={{ fill: 'currentColor' }} />
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {averageRating.toFixed(1)}
                  </span>
                  <span style={{
                    fontSize: '14px',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    ({tour.reviews.length} reviews)
                  </span>
                </div>
              )}
            </div>

            {tour.reviews.length === 0 ? (
              <div style={{
                textAlign: 'center',
                padding: '48px 24px',
                background: 'var(--color-neutral-50)',
                borderRadius: '16px'
              }}>
                <Star size={48} style={{ color: 'var(--color-neutral-400)', marginBottom: '16px' }} />
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--color-neutral-600)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-display)'
                }}>
                  No reviews yet
                </h3>
                <p style={{
                  fontSize: '14px',
                  color: 'var(--color-neutral-500)',
                  fontFamily: 'var(--font-primary)'
                }}>
                  Be the first to share your experience!
                </p>
              </div>
            ) : (
              <div style={{
                display: 'grid',
                gap: '24px'
              }}>
                {tour.reviews.slice(0, 5).map((review: any, index: number) => (
                  <div key={index} style={{
                    padding: '24px',
                    border: '1px solid var(--color-neutral-200)',
                    borderRadius: '16px',
                    background: 'white'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginBottom: '12px'
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        background: 'var(--color-brand-gradient)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '18px',
                        fontWeight: '600',
                        fontFamily: 'var(--font-display)'
                      }}>
                        {review.traveler?.profile?.displayName?.charAt(0) || 'A'}
                      </div>
                      <div>
                        <div style={{
                          fontSize: '16px',
                          fontWeight: '600',
                          color: 'var(--color-primary)',
                          fontFamily: 'var(--font-primary)'
                        }}>
                          {review.traveler?.profile?.displayName || 'Anonymous'}
                        </div>
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              style={{
                                color: i < review.rating ? 'var(--color-brand)' : 'var(--color-neutral-300)',
                                fill: i < review.rating ? 'var(--color-brand)' : 'var(--color-neutral-300)'
                              }}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: 'var(--color-neutral-700)',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      {review.comment || 'Amazing experience! Highly recommended.'}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'host' && (
          <div>
            <h2 style={{
              fontSize: '24px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-primary)',
              marginBottom: '24px'
            }}>
              Meet Your Host
            </h2>

            <div style={{
              display: 'flex',
              gap: '24px',
              alignItems: 'flex-start'
            }}>
              <div style={{
                width: '120px',
                height: '120px',
                borderRadius: '50%',
                background: 'var(--color-brand-gradient)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '36px',
                fontWeight: '700',
                fontFamily: 'var(--font-display)',
                flexShrink: 0
              }}>
                {tour.leader.profile?.displayName?.charAt(0) || 'H'}
              </div>

              <div style={{ flex: 1 }}>
                <h3 style={{
                  fontSize: '24px',
                  fontWeight: '700',
                  color: 'var(--color-primary)',
                  marginBottom: '8px',
                  fontFamily: 'var(--font-display)'
                }}>
                  {tour.leader.profile?.displayName || 'Expert Local Guide'}
                </h3>

                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <Award size={16} style={{ color: 'var(--color-brand)' }} />
                  <span style={{
                    fontSize: '14px',
                    fontWeight: '600',
                    color: 'var(--color-brand)',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    Verified Expert Guide
                  </span>
                </div>

                {tour.leader.profile?.bio && (
                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.6',
                    color: 'var(--color-neutral-700)',
                    marginBottom: '16px',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    {tour.leader.profile.bio}
                  </p>
                )}

                {tour.leader.profile?.culinaryBackground && (
                  <div style={{
                    padding: '20px',
                    background: 'var(--color-neutral-50)',
                    borderRadius: '12px',
                    border: '1px solid var(--color-neutral-200)'
                  }}>
                    <h4 style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--color-primary)',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      Expertise & Background
                    </h4>
                    <p style={{
                      fontSize: '14px',
                      lineHeight: '1.6',
                      color: 'var(--color-neutral-700)',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      {tour.leader.profile.culinaryBackground}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}