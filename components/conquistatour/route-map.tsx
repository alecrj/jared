'use client'

import { useState, useEffect } from 'react'
import { MapPin, Navigation, Camera, Utensils, Clock, ChevronLeft, ChevronRight, Calendar, Users, Info, ArrowRight } from 'lucide-react'

interface RouteMapProps {
  tour: {
    id: string
    title: string
    slug: string
    location: string
    duration: number
  }
}

interface RouteStop {
  id: string
  name: string
  type: 'start' | 'destination' | 'activity' | 'meal' | 'accommodation'
  coordinates: { lat: number; lng: number }
  description: string
  day: number
  time?: string
  duration?: string
  photos: string[]
  highlights: string[]
  city: string
  country: string
}

export function RouteMap({ tour }: RouteMapProps) {
  const [selectedStop, setSelectedStop] = useState<RouteStop | null>(null)
  const [activeDay, setActiveDay] = useState(1)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => setMapLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  // Enhanced route data with proper sequencing
  const getTourRoute = (slug: string): RouteStop[] => {
    const routes: Record<string, RouteStop[]> = {
      'hidden-rome-walking-tour': [
        {
          id: '1',
          name: 'Rome Arrival',
          type: 'start',
          coordinates: { lat: 41.9028, lng: 12.4964 },
          description: 'Meet your group and guide at the historic center of Rome',
          day: 1,
          time: '09:00',
          duration: '30 min',
          city: 'Rome',
          country: 'Italy',
          photos: ['/assets/images/tours/croatia/vecteezy_dubrovnik-landscape-view_11938207.jpg'],
          highlights: ['Welcome orientation', 'Group introductions', 'Walking route overview']
        },
        {
          id: '2',
          name: 'Colosseum Underground',
          type: 'destination',
          coordinates: { lat: 41.8902, lng: 12.4922 },
          description: 'Exclusive access to underground chambers and arena floor',
          day: 1,
          time: '10:00',
          duration: '2 hours',
          city: 'Rome',
          country: 'Italy',
          photos: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400'],
          highlights: ['Underground chambers', 'Arena floor access', 'Gladiator history']
        },
        {
          id: '3',
          name: 'Roman Forum',
          type: 'destination',
          coordinates: { lat: 41.8925, lng: 12.4853 },
          description: 'Walk the ancient streets where emperors once ruled',
          day: 1,
          time: '14:00',
          duration: '1.5 hours',
          city: 'Rome',
          country: 'Italy',
          photos: ['https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=400'],
          highlights: ['Senate House', 'Temple of Caesar', 'Via Sacra']
        },
        {
          id: '4',
          name: 'Traditional Trattoria',
          type: 'meal',
          coordinates: { lat: 41.8955, lng: 12.4823 },
          description: 'Authentic Roman cuisine in a family-run restaurant',
          day: 1,
          time: '19:00',
          duration: '2 hours',
          city: 'Rome',
          country: 'Italy',
          photos: ['https://images.unsplash.com/photo-1534612899740-55c821a90129?q=80&w=400'],
          highlights: ['Handmade pasta', 'Local wine pairing', 'Traditional recipes']
        },
        {
          id: '5',
          name: 'Vatican Museums',
          type: 'destination',
          coordinates: { lat: 41.9029, lng: 12.4534 },
          description: 'Private early access to Sistine Chapel and museums',
          day: 2,
          time: '08:00',
          duration: '3 hours',
          city: 'Vatican City',
          country: 'Vatican',
          photos: ['https://images.unsplash.com/photo-1539650116574-75c0c6d73862?q=80&w=400'],
          highlights: ['Sistine Chapel', 'Raphael Rooms', 'St. Peter\'s Basilica']
        },
        {
          id: '6',
          name: 'Cooking Masterclass',
          type: 'activity',
          coordinates: { lat: 41.9041, lng: 12.4696 },
          description: 'Learn traditional Roman cooking with local chefs',
          day: 2,
          time: '15:00',
          duration: '3 hours',
          city: 'Rome',
          country: 'Italy',
          photos: ['https://images.unsplash.com/photo-1544973999-e4227c09b48b?q=80&w=400'],
          highlights: ['Fresh pasta making', 'Market shopping', 'Wine tasting']
        },
        {
          id: '7',
          name: 'Trastevere Evening',
          type: 'destination',
          coordinates: { lat: 41.8896, lng: 12.4696 },
          description: 'Explore Rome\'s bohemian neighborhood after dark',
          day: 3,
          time: '20:00',
          duration: '2 hours',
          city: 'Rome',
          country: 'Italy',
          photos: ['https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=400'],
          highlights: ['Local bars', 'Street art', 'Night photography']
        }
      ],
      'croatia-culinary-conquest-taste-of-the-adriatic': [
        {
          id: '8',
          name: 'Dubrovnik Arrival',
          type: 'start',
          coordinates: { lat: 42.6407, lng: 18.1077 },
          description: 'Welcome to the Pearl of the Adriatic',
          day: 1,
          time: '10:00',
          duration: '1 hour',
          city: 'Dubrovnik',
          country: 'Croatia',
          photos: ['/assets/images/tours/croatia/vecteezy_dubrovnik-landscape-view_11938207.jpg'],
          highlights: ['City walls orientation', 'Old Town overview', 'Welcome lunch']
        },
        {
          id: '9',
          name: 'Old Town Walking Tour',
          type: 'destination',
          coordinates: { lat: 42.6407, lng: 18.1077 },
          description: 'Explore medieval streets and ancient fortifications',
          day: 1,
          time: '14:00',
          duration: '2.5 hours',
          city: 'Dubrovnik',
          country: 'Croatia',
          photos: ['/assets/images/tours/croatia/vecteezy_dubrovnik-landscape-view_11938207.jpg'],
          highlights: ['City walls walk', 'Rector\'s Palace', 'Stradun street']
        },
        {
          id: '10',
          name: 'Split Journey',
          type: 'destination',
          coordinates: { lat: 43.5081, lng: 16.4402 },
          description: 'Travel to Diocletian\'s ancient palace city',
          day: 3,
          time: '09:00',
          duration: '4 hours',
          city: 'Split',
          country: 'Croatia',
          photos: ['/assets/images/tours/croatia/vecteezy_aerial-view-of-saint-domnius-bell-tower-near-diocletian-s_69870230.jpg'],
          highlights: ['Diocletian\'s Palace', 'Cathedral of St. Domnius', 'Riva waterfront']
        },
        {
          id: '11',
          name: 'Island Cooking Class',
          type: 'activity',
          coordinates: { lat: 43.2969, lng: 16.3486 },
          description: 'Traditional Dalmatian cuisine on a private island',
          day: 5,
          time: '11:00',
          duration: '4 hours',
          city: 'Brač Island',
          country: 'Croatia',
          photos: ['https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=400'],
          highlights: ['Fresh seafood preparation', 'Olive oil tasting', 'Traditional peka cooking']
        },
        {
          id: '12',
          name: 'Plitvice Lakes',
          type: 'destination',
          coordinates: { lat: 44.8654, lng: 15.5820 },
          description: 'UNESCO World Heritage natural wonder',
          day: 7,
          time: '08:00',
          duration: '6 hours',
          city: 'Plitvice',
          country: 'Croatia',
          photos: ['https://images.unsplash.com/photo-1578071421344-96b87d8c01a4?q=80&w=400'],
          highlights: ['16 cascading lakes', 'Wooden walkways', 'Boat ride']
        }
      ]
    }

    return routes[slug] || []
  }

  const routeStops = getTourRoute(tour.slug)
  const filteredStops = routeStops.filter(stop => stop.day === activeDay)
  const totalDays = Math.max(...routeStops.map(stop => stop.day), 1)

  const getStopIcon = (type: string) => {
    switch (type) {
      case 'start':
        return <Navigation size={18} />
      case 'destination':
        return <MapPin size={18} />
      case 'activity':
        return <Camera size={18} />
      case 'meal':
        return <Utensils size={18} />
      default:
        return <MapPin size={18} />
    }
  }

  const getStopColor = (type: string) => {
    switch (type) {
      case 'start':
        return '#10b981'
      case 'destination':
        return '#3b82f6'
      case 'activity':
        return '#f59e0b'
      case 'meal':
        return '#ef4444'
      case 'accommodation':
        return '#8b5cf6'
      default:
        return '#6b7280'
    }
  }

  if (routeStops.length === 0) {
    return null
  }

  return (
    <div style={{
      padding: '80px 0',
      background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)'
    }}>
      <div className="container">
        {/* Section Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '60px'
        }}>
          <h2 style={{
            fontSize: 'clamp(36px, 5vw, 56px)',
            fontWeight: '800',
            fontFamily: 'var(--font-display)',
            background: 'linear-gradient(135deg, #1e293b 0%, #334155 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            lineHeight: '1.1',
            marginBottom: '20px',
            letterSpacing: '-0.02em'
          }}>
            Your Journey Route
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#64748b',
            lineHeight: '1.6',
            maxWidth: '700px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)'
          }}>
            Follow your {tour.duration}-day adventure through {tour.location} with detailed stops, activities, and experiences
          </p>
        </div>

        {/* Day Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '20px',
          marginBottom: '40px',
          flexWrap: 'wrap'
        }}>
          <button
            onClick={() => setActiveDay(Math.max(1, activeDay - 1))}
            disabled={activeDay <= 1}
            style={{
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              background: 'white',
              cursor: activeDay > 1 ? 'pointer' : 'not-allowed',
              opacity: activeDay > 1 ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-primary)',
              fontWeight: '600',
              color: '#475569',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
          >
            <ChevronLeft size={16} />
            Previous
          </button>

          <div style={{
            display: 'flex',
            gap: '12px',
            flexWrap: 'wrap'
          }}>
            {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                style={{
                  padding: '14px 20px',
                  border: `2px solid ${activeDay === day ? '#3b82f6' : '#e2e8f0'}`,
                  borderRadius: '12px',
                  background: activeDay === day ? 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)' : 'white',
                  color: activeDay === day ? 'white' : '#475569',
                  cursor: 'pointer',
                  fontSize: '16px',
                  fontWeight: '700',
                  fontFamily: 'var(--font-primary)',
                  transition: 'all 0.3s ease',
                  boxShadow: activeDay === day ? '0 8px 25px rgba(59, 130, 246, 0.3)' : '0 4px 6px rgba(0, 0, 0, 0.05)',
                  transform: activeDay === day ? 'translateY(-2px)' : 'translateY(0)'
                }}
              >
                Day {day}
              </button>
            ))}
          </div>

          <button
            onClick={() => setActiveDay(Math.min(totalDays, activeDay + 1))}
            disabled={activeDay >= totalDays}
            style={{
              padding: '12px 16px',
              border: '2px solid #e2e8f0',
              borderRadius: '12px',
              background: 'white',
              cursor: activeDay < totalDays ? 'pointer' : 'not-allowed',
              opacity: activeDay < totalDays ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontFamily: 'var(--font-primary)',
              fontWeight: '600',
              color: '#475569',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
            }}
          >
            Next
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Main Map and Timeline Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 450px',
          gap: '40px',
          background: 'white',
          borderRadius: '32px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}>
          {/* Interactive Map */}
          <div style={{
            position: 'relative',
            minHeight: '600px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white'
          }}>
            {/* Map Loading State */}
            {!mapLoaded ? (
              <div style={{
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '20px'
              }}>
                <div style={{
                  width: '60px',
                  height: '60px',
                  border: '4px solid rgba(255, 255, 255, 0.3)',
                  borderTop: '4px solid white',
                  borderRadius: '50%',
                  animation: 'spin 1s linear infinite'
                }} />
                <div style={{ fontSize: '18px', fontWeight: '600' }}>Loading Interactive Map...</div>
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '40px' }}>
                <MapPin size={60} style={{ marginBottom: '20px', opacity: 0.9 }} />
                <div style={{ fontSize: '24px', fontWeight: '700', marginBottom: '12px' }}>
                  Interactive Route Map
                </div>
                <div style={{ fontSize: '16px', opacity: 0.9, marginBottom: '24px', lineHeight: '1.6' }}>
                  In production, this would display a real interactive map (Google Maps, Mapbox, etc.) showing your exact route through {tour.location} with:
                </div>
                <div style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  borderRadius: '16px',
                  padding: '20px',
                  textAlign: 'left',
                  fontSize: '14px',
                  backdropFilter: 'blur(10px)'
                }}>
                  <div>• Real-time GPS tracking</div>
                  <div>• Zoom and pan functionality</div>
                  <div>• Route lines connecting stops</div>
                  <div>• Distance and travel time</div>
                  <div>• Street view integration</div>
                  <div>• Offline map capability</div>
                </div>
              </div>
            )}

            {/* Day Stops Overlay */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px',
              maxWidth: '200px'
            }}>
              <div style={{
                background: 'rgba(0, 0, 0, 0.8)',
                color: 'white',
                padding: '12px 16px',
                borderRadius: '12px',
                fontSize: '14px',
                fontWeight: '600',
                backdropFilter: 'blur(10px)'
              }}>
                Day {activeDay} Route: {filteredStops.length} stops
              </div>
              {filteredStops.map((stop, index) => (
                <div
                  key={stop.id}
                  style={{
                    background: getStopColor(stop.type),
                    color: 'white',
                    padding: '8px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    transform: selectedStop?.id === stop.id ? 'scale(1.05)' : 'scale(1)',
                    boxShadow: selectedStop?.id === stop.id ? '0 4px 15px rgba(0, 0, 0, 0.3)' : 'none'
                  }}
                  onClick={() => setSelectedStop(stop)}
                >
                  {getStopIcon(stop.type)}
                  {index + 1}. {stop.name}
                </div>
              ))}
            </div>
          </div>

          {/* Timeline and Details Sidebar */}
          <div style={{ padding: '40px' }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              marginBottom: '30px'
            }}>
              <Calendar size={24} style={{ color: '#3b82f6' }} />
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#1e293b',
                fontFamily: 'var(--font-display)',
                margin: 0
              }}>
                Day {activeDay} Timeline
              </h3>
            </div>

            {/* Timeline */}
            <div style={{ position: 'relative' }}>
              {/* Timeline line */}
              <div style={{
                position: 'absolute',
                left: '20px',
                top: '20px',
                bottom: '20px',
                width: '3px',
                background: 'linear-gradient(to bottom, #3b82f6, #1d4ed8)',
                borderRadius: '2px'
              }} />

              {filteredStops.map((stop, index) => (
                <div
                  key={stop.id}
                  style={{
                    position: 'relative',
                    marginBottom: '24px',
                    paddingLeft: '60px',
                    cursor: 'pointer'
                  }}
                  onClick={() => setSelectedStop(stop)}
                >
                  {/* Timeline dot */}
                  <div style={{
                    position: 'absolute',
                    left: '8px',
                    top: '8px',
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: getStopColor(stop.type),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '12px',
                    fontWeight: '700',
                    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
                    border: '3px solid white'
                  }}>
                    {index + 1}
                  </div>

                  {/* Stop details */}
                  <div style={{
                    background: selectedStop?.id === stop.id ? '#f1f5f9' : 'white',
                    padding: '20px',
                    borderRadius: '16px',
                    border: `2px solid ${selectedStop?.id === stop.id ? '#3b82f6' : '#e2e8f0'}`,
                    transition: 'all 0.3s ease',
                    boxShadow: selectedStop?.id === stop.id ? '0 8px 25px rgba(59, 130, 246, 0.15)' : '0 2px 8px rgba(0, 0, 0, 0.05)'
                  }}>
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px'
                    }}>
                      <h4 style={{
                        fontSize: '16px',
                        fontWeight: '700',
                        color: '#1e293b',
                        fontFamily: 'var(--font-primary)',
                        margin: 0
                      }}>
                        {stop.name}
                      </h4>
                      {stop.time && (
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px',
                          fontSize: '12px',
                          color: '#64748b',
                          fontWeight: '600'
                        }}>
                          <Clock size={12} />
                          {stop.time}
                        </div>
                      )}
                    </div>

                    <div style={{
                      fontSize: '13px',
                      color: '#64748b',
                      marginBottom: '8px',
                      fontWeight: '500'
                    }}>
                      {stop.city}, {stop.country}
                    </div>

                    <p style={{
                      fontSize: '14px',
                      color: '#475569',
                      lineHeight: '1.5',
                      margin: '0 0 12px 0',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      {stop.description}
                    </p>

                    {stop.duration && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '12px',
                        color: '#64748b',
                        fontWeight: '600'
                      }}>
                        <Users size={12} />
                        Duration: {stop.duration}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Stop Details */}
            {selectedStop && (
              <div style={{
                marginTop: '30px',
                padding: '24px',
                background: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
                borderRadius: '20px',
                border: '2px solid #cbd5e1'
              }}>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  marginBottom: '16px'
                }}>
                  <Info size={20} style={{ color: '#3b82f6' }} />
                  <h4 style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    color: '#1e293b',
                    fontFamily: 'var(--font-display)',
                    margin: 0
                  }}>
                    {selectedStop.name}
                  </h4>
                </div>

                {selectedStop.highlights.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '700',
                      color: '#374151',
                      marginBottom: '10px',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      Highlights:
                    </div>
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '6px'
                    }}>
                      {selectedStop.highlights.map((highlight, index) => (
                        <div
                          key={index}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px',
                            fontSize: '13px',
                            color: '#475569',
                            fontFamily: 'var(--font-primary)'
                          }}
                        >
                          <ArrowRight size={12} style={{ color: '#10b981' }} />
                          {highlight}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {selectedStop.photos.length > 0 && (
                  <div style={{
                    width: '100%',
                    height: '140px',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    backgroundImage: `url(${selectedStop.photos[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '2px solid white',
                    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)'
                  }} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}