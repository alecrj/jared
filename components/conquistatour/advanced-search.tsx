'use client'

import { useState, useRef, useEffect } from 'react'
import { Search, MapPin, Calendar, DollarSign, ChevronDown, X, ChevronRight } from 'lucide-react'
import { getCountriesByRegion, getAllCities, type Destination } from '@/lib/travel-destinations'

interface AdvancedSearchProps {
  tours: any[]
}

export function AdvancedSearch({ tours }: AdvancedSearchProps) {
  const [isDestinationOpen, setIsDestinationOpen] = useState(false)
  const [isDateOpen, setIsDateOpen] = useState(false)
  const [isPriceOpen, setIsPriceOpen] = useState(false)
  const [selectedDestination, setSelectedDestination] = useState('')
  const [selectedDateRange, setSelectedDateRange] = useState('')
  const [selectedPrice, setSelectedPrice] = useState('Any')
  const [destinationSearch, setDestinationSearch] = useState('')
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null)
  const [showCities, setShowCities] = useState(false)

  const destinationRef = useRef<HTMLDivElement>(null)
  const dateRef = useRef<HTMLDivElement>(null)
  const priceRef = useRef<HTMLDivElement>(null)

  // Get destination data
  const destinationsByRegion = getCountriesByRegion()
  const allCities = getAllCities()

  // Get city counts from actual tours
  const cityStats = tours.reduce((acc, tour) => {
    const city = tour.location.split(',')[0].trim()
    acc[city] = (acc[city] || 0) + 1
    return acc
  }, {} as Record<string, number>)

  // Filter destinations based on search
  const filteredDestinations = selectedCountry && showCities
    ? allCities.filter(dest =>
        dest.country === selectedCountry &&
        dest.city.toLowerCase().includes(destinationSearch.toLowerCase())
      )
    : Object.entries(destinationsByRegion).flatMap(([region, countries]) =>
        countries.filter(country =>
          country.country.toLowerCase().includes(destinationSearch.toLowerCase())
        ).map(country => ({ ...country, region }))
      )

  // Luxury group tour pricing tiers
  const priceRanges = [
    { label: 'Any', value: 'Any', description: 'All price ranges' },
    { label: '$', value: 'budget', description: 'Short experiences' },
    { label: '$$', value: 'moderate', description: 'Weekend getaways' },
    { label: '$$$', value: 'luxury', description: 'Week-long adventures' },
    { label: '$$$$', value: 'ultra-luxury', description: 'Ultimate expeditions' }
  ]

  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  // Generate next 18 months for booking
  const availableMonths = []
  for (let i = 0; i < 18; i++) {
    const monthIndex = (currentMonth + i) % 12
    const year = currentYear + Math.floor((currentMonth + i) / 12)
    availableMonths.push({ month: months[monthIndex], year, monthIndex })
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (destinationRef.current && !destinationRef.current.contains(event.target as Node)) {
        setIsDestinationOpen(false)
      }
      if (dateRef.current && !dateRef.current.contains(event.target as Node)) {
        setIsDateOpen(false)
      }
      if (priceRef.current && !priceRef.current.contains(event.target as Node)) {
        setIsPriceOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div style={{
      maxWidth: '900px',
      margin: '0 auto',
      background: 'white',
      borderRadius: '20px',
      border: '2px solid var(--color-neutral-200)',
      boxShadow: '0 16px 64px rgba(0, 0, 0, 0.08)',
      padding: '8px',
      display: 'flex',
      alignItems: 'stretch',
      gap: '2px',
      position: 'relative'
    }}>
      {/* Destination Dropdown */}
      <div ref={destinationRef} style={{ flex: 1, position: 'relative' }}>
        <button
          onClick={() => {
            setIsDestinationOpen(!isDestinationOpen)
            setIsDateOpen(false)
            setIsPriceOpen(false)
          }}
          style={{
            width: '100%',
            padding: '20px 24px',
            border: 'none',
            background: isDestinationOpen ? 'var(--color-neutral-50)' : 'transparent',
            borderRadius: '16px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
            position: 'relative'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <MapPin size={20} style={{ color: 'var(--color-brand)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--color-brand)',
                marginBottom: '4px',
                fontFamily: 'var(--font-primary)'
              }}>
                Where
              </div>
              <div style={{
                fontSize: '16px',
                color: selectedDestination ? 'var(--color-primary)' : 'var(--color-neutral-500)',
                fontFamily: 'var(--font-primary)',
                fontWeight: selectedDestination ? '600' : '400'
              }}>
                {selectedDestination || 'Search destinations'}
              </div>
            </div>
            <ChevronDown
              size={16}
              style={{
                color: 'var(--color-neutral-400)',
                transform: isDestinationOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s ease'
              }}
            />
          </div>
        </button>

        {isDestinationOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            borderRadius: '16px',
            border: '1px solid var(--color-neutral-200)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            zIndex: 1000,
            marginTop: '8px',
            overflow: 'hidden'
          }}>
            <div style={{ padding: '16px' }}>
              <input
                type="text"
                placeholder="Search cities..."
                value={destinationSearch}
                onChange={(e) => setDestinationSearch(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 16px',
                  border: '1px solid var(--color-neutral-300)',
                  borderRadius: '12px',
                  fontSize: '14px',
                  fontFamily: 'var(--font-primary)',
                  outline: 'none'
                }}
              />
            </div>
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {!showCities ? (
                // Country/Region View
                <>
                  {Object.entries(destinationsByRegion).map(([region, countries]) => (
                    <div key={region}>
                      <div style={{
                        padding: '12px 16px',
                        fontSize: '12px',
                        fontWeight: '700',
                        color: 'var(--color-neutral-500)',
                        textTransform: 'uppercase',
                        letterSpacing: '0.5px',
                        fontFamily: 'var(--font-primary)'
                      }}>
                        {region}
                      </div>
                      {countries
                        .filter(country =>
                          country.country.toLowerCase().includes(destinationSearch.toLowerCase())
                        )
                        .slice(0, 8)
                        .map((country) => (
                        <button
                          key={country.country}
                          onClick={() => {
                            setSelectedCountry(country.country)
                            setShowCities(true)
                            setDestinationSearch('')
                          }}
                          style={{
                            width: '100%',
                            padding: '12px 16px',
                            border: 'none',
                            background: 'transparent',
                            textAlign: 'left',
                            cursor: 'pointer',
                            transition: 'background 0.2s ease',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'var(--color-neutral-50)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = 'transparent'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <span style={{
                              fontSize: '15px',
                              color: 'var(--color-primary)',
                              fontFamily: 'var(--font-primary)',
                              fontWeight: country.popular ? '600' : '500'
                            }}>
                              {country.country}
                            </span>
                            {country.popular && (
                              <span style={{
                                background: 'var(--color-brand)',
                                color: 'white',
                                padding: '2px 6px',
                                borderRadius: '8px',
                                fontSize: '10px',
                                fontWeight: '700',
                                fontFamily: 'var(--font-primary)'
                              }}>
                                HOT
                              </span>
                            )}
                          </div>
                          <ChevronRight size={14} style={{ color: 'var(--color-neutral-400)' }} />
                        </button>
                      ))}
                    </div>
                  ))}
                </>
              ) : (
                // City View
                <>
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--color-neutral-200)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px'
                  }}>
                    <button
                      onClick={() => {
                        setShowCities(false)
                        setSelectedCountry(null)
                        setDestinationSearch('')
                      }}
                      style={{
                        border: 'none',
                        background: 'transparent',
                        color: 'var(--color-brand)',
                        fontSize: '14px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        fontFamily: 'var(--font-primary)'
                      }}
                    >
                      ← Back
                    </button>
                    <span style={{
                      fontSize: '14px',
                      fontWeight: '600',
                      color: 'var(--color-primary)',
                      fontFamily: 'var(--font-primary)'
                    }}>
                      {selectedCountry}
                    </span>
                  </div>
                  {filteredDestinations.map((dest: any) => (
                    <button
                      key={dest.city}
                      onClick={() => {
                        setSelectedDestination(`${dest.city}, ${dest.country}`)
                        setIsDestinationOpen(false)
                        setShowCities(false)
                        setSelectedCountry(null)
                        setDestinationSearch('')
                      }}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        border: 'none',
                        background: 'transparent',
                        textAlign: 'left',
                        cursor: 'pointer',
                        transition: 'background 0.2s ease',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'var(--color-neutral-50)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'transparent'
                      }}
                    >
                      <span style={{
                        fontSize: '15px',
                        color: 'var(--color-primary)',
                        fontFamily: 'var(--font-primary)',
                        fontWeight: '500'
                      }}>
                        {dest.city}
                      </span>
                      {cityStats[dest.city] && (
                        <span style={{
                          background: 'var(--color-brand-gradient)',
                          color: 'white',
                          padding: '4px 8px',
                          borderRadius: '12px',
                          fontSize: '12px',
                          fontWeight: '600',
                          fontFamily: 'var(--font-primary)'
                        }}>
                          {cityStats[dest.city]}
                        </span>
                      )}
                    </button>
                  ))}
                </>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Date Dropdown */}
      <div ref={dateRef} style={{ flex: 1, position: 'relative' }}>
        <button
          onClick={() => {
            setIsDateOpen(!isDateOpen)
            setIsDestinationOpen(false)
            setIsPriceOpen(false)
          }}
          style={{
            width: '100%',
            padding: '20px 24px',
            border: 'none',
            background: isDateOpen ? 'var(--color-neutral-50)' : 'transparent',
            borderRadius: '16px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <Calendar size={20} style={{ color: 'var(--color-brand)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--color-brand)',
                marginBottom: '4px',
                fontFamily: 'var(--font-primary)'
              }}>
                When
              </div>
              <div style={{
                fontSize: '16px',
                color: selectedDateRange ? 'var(--color-primary)' : 'var(--color-neutral-500)',
                fontFamily: 'var(--font-primary)',
                fontWeight: selectedDateRange ? '600' : '400'
              }}>
                {selectedDateRange || 'Select dates'}
              </div>
            </div>
            <ChevronDown
              size={16}
              style={{
                color: 'var(--color-neutral-400)',
                transform: isDateOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s ease'
              }}
            />
          </div>
        </button>

        {isDateOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            borderRadius: '16px',
            border: '1px solid var(--color-neutral-200)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            zIndex: 1000,
            marginTop: '8px',
            padding: '20px'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '8px',
              maxHeight: '300px',
              overflowY: 'auto'
            }}>
              {availableMonths.map(({ month, year, monthIndex }) => {
                const isPastMonth = year === currentYear && monthIndex < currentMonth
                const isCurrentMonth = year === currentYear && monthIndex === currentMonth

                return (
                  <button
                    key={`${year}-${month}`}
                    onClick={() => {
                      setSelectedDateRange(`${month} ${year}`)
                      setIsDateOpen(false)
                    }}
                    disabled={isPastMonth}
                    style={{
                      padding: '12px 8px',
                      border: '1px solid var(--color-neutral-300)',
                      borderRadius: '12px',
                      background: isCurrentMonth ? 'var(--color-brand-gradient)' : 'white',
                      color: isCurrentMonth ? 'white' : isPastMonth ? 'var(--color-neutral-400)' : 'var(--color-primary)',
                      fontSize: '12px',
                      fontWeight: isCurrentMonth ? '700' : '500',
                      cursor: isPastMonth ? 'not-allowed' : 'pointer',
                      transition: 'all 0.2s ease',
                      fontFamily: 'var(--font-primary)',
                      opacity: isPastMonth ? 0.5 : 1,
                      textAlign: 'center',
                      lineHeight: '1.2'
                    }}
                    onMouseEnter={(e) => {
                      if (!isPastMonth && !isCurrentMonth) {
                        e.currentTarget.style.background = 'var(--color-brand)'
                        e.currentTarget.style.color = 'white'
                        e.currentTarget.style.borderColor = 'var(--color-brand)'
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!isPastMonth && !isCurrentMonth) {
                        e.currentTarget.style.background = 'white'
                        e.currentTarget.style.color = 'var(--color-primary)'
                        e.currentTarget.style.borderColor = 'var(--color-neutral-300)'
                      }
                    }}
                  >
                    <div>{month.slice(0, 3)}</div>
                    <div style={{ fontSize: '11px', opacity: 0.8 }}>{year}</div>
                  </button>
                )
              })}
            </div>
          </div>
        )}
      </div>

      {/* Price Dropdown */}
      <div ref={priceRef} style={{ flex: 1, position: 'relative' }}>
        <button
          onClick={() => {
            setIsPriceOpen(!isPriceOpen)
            setIsDestinationOpen(false)
            setIsDateOpen(false)
          }}
          style={{
            width: '100%',
            padding: '20px 24px',
            border: 'none',
            background: isPriceOpen ? 'var(--color-neutral-50)' : 'transparent',
            borderRadius: '16px',
            textAlign: 'left',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
        >
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <DollarSign size={20} style={{ color: 'var(--color-brand)', flexShrink: 0 }} />
            <div style={{ flex: 1 }}>
              <div style={{
                fontSize: '12px',
                fontWeight: '600',
                color: 'var(--color-brand)',
                marginBottom: '4px',
                fontFamily: 'var(--font-primary)'
              }}>
                Price
              </div>
              <div style={{
                fontSize: '16px',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-primary)',
                fontWeight: '600'
              }}>
                {selectedPrice}
              </div>
            </div>
            <ChevronDown
              size={16}
              style={{
                color: 'var(--color-neutral-400)',
                transform: isPriceOpen ? 'rotate(180deg)' : 'rotate(0)',
                transition: 'transform 0.2s ease'
              }}
            />
          </div>
        </button>

        {isPriceOpen && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            borderRadius: '16px',
            border: '1px solid var(--color-neutral-200)',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.12)',
            zIndex: 1000,
            marginTop: '8px',
            overflow: 'hidden'
          }}>
            {priceRanges.map((range) => (
              <button
                key={range.value}
                onClick={() => {
                  setSelectedPrice(range.label)
                  setIsPriceOpen(false)
                }}
                style={{
                  width: '100%',
                  padding: '16px 20px',
                  border: 'none',
                  background: selectedPrice === range.label ? 'var(--color-brand-gradient)' : 'transparent',
                  textAlign: 'left',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  color: selectedPrice === range.label ? 'white' : 'var(--color-primary)'
                }}
                onMouseEnter={(e) => {
                  if (selectedPrice !== range.label) {
                    e.currentTarget.style.background = 'var(--color-neutral-50)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedPrice !== range.label) {
                    e.currentTarget.style.background = 'transparent'
                  }
                }}
              >
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}>
                  <span style={{
                    fontSize: '18px',
                    fontWeight: '700',
                    fontFamily: 'var(--font-display)'
                  }}>
                    {range.label}
                  </span>
                </div>
                <div style={{
                  fontSize: '12px',
                  opacity: 0.9,
                  marginTop: '2px',
                  fontFamily: 'var(--font-primary)',
                  lineHeight: '1.3'
                }}>
                  {range.description}
                </div>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Search Button */}
      <button style={{
        background: 'var(--color-brand-gradient)',
        border: 'none',
        borderRadius: '16px',
        padding: '20px 24px',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'scale(1.05)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'scale(1)'
      }}
      >
        <Search size={24} color="white" />
      </button>
    </div>
  )
}