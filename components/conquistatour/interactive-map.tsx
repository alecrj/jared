'use client'

import { useState } from 'react'
import { MapPin, Navigation, Camera, Utensils, Clock, ChevronLeft, ChevronRight } from 'lucide-react'

interface InteractiveMapProps {
  tour: {
    id: string
    title: string
    slug: string
    location: string
    duration: number
  }
}

interface MapLocation {
  id: string
  name: string
  type: 'landmark' | 'restaurant' | 'activity' | 'accommodation'
  coordinates: { lat: number; lng: number }
  description: string
  day: number
  time?: string
  photos: string[]
  highlights: string[]
}

export function InteractiveMap({ tour }: InteractiveMapProps) {
  const [selectedLocation, setSelectedLocation] = useState<MapLocation | null>(null)
  const [activeDay, setActiveDay] = useState(1)

  // Tour route data (would come from database in production)
  const getTourRoute = (slug: string): MapLocation[] => {
    const routes: Record<string, MapLocation[]> = {
      'hidden-rome-walking-tour': [
        {
          id: '1',
          name: 'Colosseum',
          type: 'landmark',
          coordinates: { lat: 41.8902, lng: 12.4922 },
          description: 'Begin your Roman adventure at the iconic Colosseum, exploring its underground chambers and upper tiers.',
          day: 1,
          time: '09:00',
          photos: ['https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Skip-the-line access', 'Underground chambers', 'Arena floor reconstruction']
        },
        {
          id: '2',
          name: 'Roman Forum',
          type: 'landmark',
          coordinates: { lat: 41.8925, lng: 12.4853 },
          description: 'Walk through the heart of ancient Rome where senators once debated.',
          day: 1,
          time: '11:30',
          photos: ['https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Temple of Caesar', 'Via Sacra', 'House of the Vestals']
        },
        {
          id: '3',
          name: 'Traditional Trattoria',
          type: 'restaurant',
          coordinates: { lat: 41.8955, lng: 12.4823 },
          description: 'Enjoy authentic Roman cuisine at a family-run trattoria.',
          day: 1,
          time: '13:00',
          photos: ['https://images.unsplash.com/photo-1534612899740-55c821a90129?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Handmade pasta', 'Traditional carbonara', 'Local wine pairing']
        },
        {
          id: '4',
          name: 'Trevi Fountain',
          type: 'landmark',
          coordinates: { lat: 41.9009, lng: 12.4833 },
          description: 'Experience the magic of Rome\'s most famous fountain.',
          day: 2,
          time: '10:00',
          photos: ['https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Coin tossing tradition', 'Baroque architecture', 'Best photo spots']
        },
        {
          id: '5',
          name: 'Cooking Class',
          type: 'activity',
          coordinates: { lat: 41.9028, lng: 12.4964 },
          description: 'Learn to cook authentic Roman dishes with a local chef.',
          day: 2,
          time: '15:00',
          photos: ['https://images.unsplash.com/photo-1544973999-e4227c09b48b?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Fresh pasta making', 'Traditional sauces', 'Market ingredient selection']
        },
        {
          id: '6',
          name: 'Vatican City',
          type: 'landmark',
          coordinates: { lat: 41.9029, lng: 12.4534 },
          description: 'Explore the artistic treasures of the Vatican Museums and Sistine Chapel.',
          day: 3,
          time: '09:00',
          photos: ['https://images.unsplash.com/photo-1539650116574-75c0c6d73862?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Sistine Chapel', 'St. Peter\'s Basilica', 'Vatican Gardens']
        }
      ],
      'tokyo-street-photography-experience': [
        {
          id: '7',
          name: 'Shibuya Crossing',
          type: 'landmark',
          coordinates: { lat: 35.6598, lng: 139.7006 },
          description: 'Capture the energy of the world\'s busiest pedestrian crossing.',
          day: 1,
          time: '08:00',
          photos: ['https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Rush hour photography', 'Overhead shots', 'Long exposure techniques']
        },
        {
          id: '8',
          name: 'Senso-ji Temple',
          type: 'landmark',
          coordinates: { lat: 35.7148, lng: 139.7967 },
          description: 'Traditional temple photography in Tokyo\'s oldest Buddhist temple.',
          day: 1,
          time: '11:00',
          photos: ['https://images.unsplash.com/photo-1513407030348-c983a97b98d8?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Traditional architecture', 'Incense photography', 'Prayer rituals']
        },
        {
          id: '9',
          name: 'Tea House Experience',
          type: 'activity',
          coordinates: { lat: 35.7167, lng: 139.7964 },
          description: 'Participate in an authentic tea ceremony.',
          day: 2,
          time: '14:00',
          photos: ['https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Traditional ceremony', 'Matcha preparation', 'Zen meditation']
        },
        {
          id: '10',
          name: 'Golden Gai',
          type: 'landmark',
          coordinates: { lat: 35.6938, lng: 139.7034 },
          description: 'Night photography in Tokyo\'s famous bar district.',
          day: 3,
          time: '20:00',
          photos: ['https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Neon photography', 'Street portraits', 'Low light techniques']
        }
      ],
      'barcelona-architecture-tour': [
        {
          id: '11',
          name: 'Sagrada Familia',
          type: 'landmark',
          coordinates: { lat: 41.4036, lng: 2.1744 },
          description: 'Marvel at Gaudí\'s masterpiece, still under construction after 140 years.',
          day: 1,
          time: '09:00',
          photos: ['https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Nativity Facade', 'Interior light show', 'Construction history']
        },
        {
          id: '12',
          name: 'Park Güell',
          type: 'landmark',
          coordinates: { lat: 41.4145, lng: 2.1527 },
          description: 'Explore Gaudí\'s colorful mosaic wonderland with panoramic city views.',
          day: 1,
          time: '14:00',
          photos: ['https://images.unsplash.com/photo-1558642891-54be180ea339?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Mosaic lizard', 'Serpentine bench', 'City panorama']
        },
        {
          id: '13',
          name: 'Gothic Quarter',
          type: 'landmark',
          coordinates: { lat: 41.3851, lng: 2.1734 },
          description: 'Wander through medieval streets and discover hidden plazas.',
          day: 2,
          time: '10:00',
          photos: ['https://images.unsplash.com/photo-1509439581779-6298f75bf6e5?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Cathedral of Barcelona', 'Plaça del Rei', 'Roman ruins']
        },
        {
          id: '14',
          name: 'Tapas Tour',
          type: 'restaurant',
          coordinates: { lat: 41.3874, lng: 2.1686 },
          description: 'Taste authentic Catalan tapas in traditional bodegas.',
          day: 2,
          time: '19:00',
          photos: ['https://images.unsplash.com/photo-1556909114-2e2a9644e664?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Jamón ibérico', 'Local vermouth', 'Pintxos varieties']
        }
      ],
      'croatia-culinary-conquest-taste-of-the-adriatic': [
        {
          id: '15',
          name: 'Dubrovnik Old Town',
          type: 'landmark',
          coordinates: { lat: 42.6407, lng: 18.1077 },
          description: 'Walk the ancient walls of the "Pearl of the Adriatic".',
          day: 1,
          time: '09:00',
          photos: ['https://images.unsplash.com/photo-1514282401047-d79a71a590e8?q=80&w=400&auto=format&fit=crop'],
          highlights: ['City walls walk', 'Rector\'s Palace', 'Stradun street']
        },
        {
          id: '16',
          name: 'Island Cooking Class',
          type: 'activity',
          coordinates: { lat: 42.7369, lng: 17.9986 },
          description: 'Learn traditional Dalmatian cuisine on a private island.',
          day: 3,
          time: '11:00',
          photos: ['https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Fresh seafood prep', 'Olive oil tasting', 'Traditional recipes']
        },
        {
          id: '17',
          name: 'Plitvice Lakes',
          type: 'landmark',
          coordinates: { lat: 44.8654, lng: 15.5820 },
          description: 'Explore Croatia\'s most stunning natural wonder.',
          day: 6,
          time: '08:00',
          photos: ['https://images.unsplash.com/photo-1578071421344-96b87d8c01a4?q=80&w=400&auto=format&fit=crop'],
          highlights: ['Waterfall photography', 'Wooden walkways', 'Pristine lakes']
        }
      ]
    }

    return routes[slug] || []
  }

  const locations = getTourRoute(tour.slug)
  const filteredLocations = locations.filter(loc => loc.day === activeDay)
  const totalDays = Math.max(...locations.map(loc => loc.day), 1)

  const getLocationIcon = (type: string) => {
    switch (type) {
      case 'landmark':
        return <MapPin size={16} />
      case 'restaurant':
        return <Utensils size={16} />
      case 'activity':
        return <Camera size={16} />
      default:
        return <Navigation size={16} />
    }
  }

  const getLocationColor = (type: string) => {
    switch (type) {
      case 'landmark':
        return '#e74c3c'
      case 'restaurant':
        return '#f39c12'
      case 'activity':
        return '#3498db'
      default:
        return '#9b59b6'
    }
  }

  if (locations.length === 0) {
    return null
  }

  return (
    <div style={{
      padding: '64px 0',
      background: 'linear-gradient(135deg, var(--color-neutral-50) 0%, #ffffff 100%)'
    }}>
      <div className="container">
        <div style={{
          textAlign: 'center',
          marginBottom: '48px'
        }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            color: 'var(--color-primary)',
            lineHeight: '1.2',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Interactive Route Map
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--color-neutral-600)',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto',
            fontFamily: 'var(--font-primary)'
          }}>
            Explore every stop on your {tour.duration}-day journey through {tour.location}
          </p>
        </div>

        {/* Day Navigation */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
          marginBottom: '32px'
        }}>
          <button
            onClick={() => setActiveDay(Math.max(1, activeDay - 1))}
            disabled={activeDay <= 1}
            style={{
              padding: '12px',
              border: '1px solid var(--color-neutral-300)',
              borderRadius: '8px',
              background: 'white',
              cursor: activeDay > 1 ? 'pointer' : 'not-allowed',
              opacity: activeDay > 1 ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'var(--font-primary)'
            }}
          >
            <ChevronLeft size={16} />
          </button>

          <div style={{
            display: 'flex',
            gap: '8px'
          }}>
            {Array.from({ length: totalDays }, (_, i) => i + 1).map(day => (
              <button
                key={day}
                onClick={() => setActiveDay(day)}
                style={{
                  padding: '12px 16px',
                  border: `2px solid ${activeDay === day ? 'var(--color-brand)' : 'var(--color-neutral-300)'}`,
                  borderRadius: '8px',
                  background: activeDay === day ? 'var(--color-brand)' : 'white',
                  color: activeDay === day ? 'white' : 'var(--color-primary)',
                  cursor: 'pointer',
                  fontSize: '14px',
                  fontWeight: '600',
                  fontFamily: 'var(--font-primary)',
                  transition: 'all 0.3s ease'
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
              padding: '12px',
              border: '1px solid var(--color-neutral-300)',
              borderRadius: '8px',
              background: 'white',
              cursor: activeDay < totalDays ? 'pointer' : 'not-allowed',
              opacity: activeDay < totalDays ? 1 : 0.5,
              display: 'flex',
              alignItems: 'center',
              fontFamily: 'var(--font-primary)'
            }}
          >
            <ChevronRight size={16} />
          </button>
        </div>

        {/* Map Container */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 400px',
          gap: '32px',
          background: 'white',
          borderRadius: '20px',
          overflow: 'hidden',
          boxShadow: 'var(--shadow-lg)',
          border: '1px solid var(--color-neutral-200)'
        }}>
          {/* Map Area */}
          <div style={{
            position: 'relative',
            minHeight: '500px',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: '18px',
            fontFamily: 'var(--font-primary)'
          }}>
            <div style={{ textAlign: 'center' }}>
              <MapPin size={48} style={{ marginBottom: '16px', opacity: 0.8 }} />
              <div style={{ fontSize: '20px', fontWeight: '600', marginBottom: '8px' }}>
                Interactive Map Placeholder
              </div>
              <div style={{ fontSize: '14px', opacity: 0.8, maxWidth: '300px', lineHeight: '1.5' }}>
                In production, this would display an interactive map showing the route through {tour.location} with real-time navigation and location details.
              </div>
              <div style={{
                marginTop: '24px',
                padding: '12px 24px',
                background: 'rgba(255, 255, 255, 0.2)',
                borderRadius: '8px',
                fontSize: '14px'
              }}>
                Day {activeDay} Route: {filteredLocations.length} stops
              </div>
            </div>

            {/* Location Markers Overlay */}
            <div style={{
              position: 'absolute',
              top: '20px',
              left: '20px',
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px'
            }}>
              {filteredLocations.map((location, index) => (
                <div
                  key={location.id}
                  style={{
                    background: getLocationColor(location.type),
                    color: 'white',
                    padding: '6px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  onClick={() => setSelectedLocation(location)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)'
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)'
                  }}
                >
                  {getLocationIcon(location.type)}
                  {index + 1}
                </div>
              ))}
            </div>
          </div>

          {/* Location Details Sidebar */}
          <div style={{ padding: '32px' }}>
            <h3 style={{
              fontSize: '20px',
              fontWeight: '600',
              color: 'var(--color-primary)',
              marginBottom: '20px',
              fontFamily: 'var(--font-display)'
            }}>
              Day {activeDay} Itinerary
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {filteredLocations.map((location, index) => (
                <div
                  key={location.id}
                  style={{
                    padding: '16px',
                    border: `2px solid ${selectedLocation?.id === location.id ? 'var(--color-brand)' : 'var(--color-neutral-200)'}`,
                    borderRadius: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    background: selectedLocation?.id === location.id ? 'var(--color-brand-light)' : 'white'
                  }}
                  onClick={() => setSelectedLocation(location)}
                  onMouseEnter={(e) => {
                    if (selectedLocation?.id !== location.id) {
                      e.currentTarget.style.borderColor = 'var(--color-brand-light)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (selectedLocation?.id !== location.id) {
                      e.currentTarget.style.borderColor = 'var(--color-neutral-200)'
                    }
                  }}
                >
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginBottom: '8px'
                  }}>
                    <div style={{
                      background: getLocationColor(location.type),
                      color: 'white',
                      borderRadius: '50%',
                      width: '24px',
                      height: '24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '12px',
                      fontWeight: '600'
                    }}>
                      {index + 1}
                    </div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: 'var(--color-primary)',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      {location.name}
                    </div>
                    {location.time && (
                      <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                        marginLeft: 'auto',
                        fontSize: '12px',
                        color: 'var(--color-neutral-600)',
                        fontFamily: 'var(--font-primary)'
                      }}>
                        <Clock size={12} />
                        {location.time}
                      </div>
                    )}
                  </div>
                  <p style={{
                    fontSize: '14px',
                    color: 'var(--color-neutral-600)',
                    lineHeight: '1.4',
                    margin: 0,
                    fontFamily: 'var(--font-primary)'
                  }}>
                    {location.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Selected Location Details */}
            {selectedLocation && (
              <div style={{
                marginTop: '24px',
                padding: '20px',
                background: 'var(--color-neutral-50)',
                borderRadius: '12px',
                border: '1px solid var(--color-neutral-200)'
              }}>
                <h4 style={{
                  fontSize: '18px',
                  fontWeight: '600',
                  color: 'var(--color-primary)',
                  marginBottom: '12px',
                  fontFamily: 'var(--font-display)'
                }}>
                  {selectedLocation.name}
                </h4>

                {selectedLocation.highlights.length > 0 && (
                  <div style={{ marginBottom: '16px' }}>
                    <div style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--color-primary)',
                      marginBottom: '8px',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      Highlights:
                    </div>
                    <ul style={{
                      margin: 0,
                      paddingLeft: '16px',
                      fontSize: '14px',
                      color: 'var(--color-neutral-600)',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      {selectedLocation.highlights.map((highlight, index) => (
                        <li key={index} style={{ marginBottom: '4px' }}>
                          {highlight}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {selectedLocation.photos.length > 0 && (
                  <div style={{
                    width: '100%',
                    height: '120px',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    backgroundImage: `url(${selectedLocation.photos[0]})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                  }} />
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}