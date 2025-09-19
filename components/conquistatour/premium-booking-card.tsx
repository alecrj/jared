'use client'

import { useState } from 'react'
import { Calendar, Users, CreditCard, Shield, Clock, CheckCircle, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react'

interface PremiumBookingCardProps {
  tour: {
    id: string
    title: string
    pricePerPerson: number
    duration: number
    groupSize: number
    depositPercentage: number
  }
  departures: Array<{
    id: string
    startDate: Date
    endDate: Date
    availableSpots: number
    status: string
  }>
}

export function PremiumBookingCard({ tour, departures }: PremiumBookingCardProps) {
  const [selectedDeparture, setSelectedDeparture] = useState<string | null>(null)
  const [guestCount, setGuestCount] = useState(1)
  const [showCalendar, setShowCalendar] = useState(false)
  const [currentMonth, setCurrentMonth] = useState(new Date())

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(price / 100)
  }

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    }).format(new Date(date))
  }

  const totalPrice = tour.pricePerPerson * guestCount
  const depositAmount = totalPrice * tour.depositPercentage
  const remainingAmount = totalPrice - depositAmount

  const selectedDepartureDetails = departures.find(d => d.id === selectedDeparture)

  // Get available departures for calendar
  const availableDepartures = departures.filter(d =>
    d.status === 'LIVE' &&
    new Date(d.startDate) > new Date() &&
    d.availableSpots >= guestCount
  )

  // Calendar logic
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const daysInMonth = lastDay.getDate()
    const startingDayOfWeek = firstDay.getDay()

    const days = []

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null)
    }

    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day))
    }

    return days
  }

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newDate = new Date(prev)
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1)
      } else {
        newDate.setMonth(prev.getMonth() + 1)
      }
      return newDate
    })
  }

  const isDepartureDate = (date: Date | null) => {
    if (!date) return false
    return availableDepartures.some(departure => {
      const depDate = new Date(departure.startDate)
      return depDate.toDateString() === date.toDateString()
    })
  }

  const getDepartureForDate = (date: Date) => {
    return availableDepartures.find(departure => {
      const depDate = new Date(departure.startDate)
      return depDate.toDateString() === date.toDateString()
    })
  }

  return (
    <div style={{
      background: 'white',
      borderRadius: '20px',
      padding: '32px',
      boxShadow: '0 12px 48px rgba(0, 0, 0, 0.1)',
      border: '1px solid var(--color-neutral-200)',
      position: 'sticky',
      top: '100px'
    }}>
      {/* Price Header */}
      <div style={{
        textAlign: 'center',
        marginBottom: '32px',
        padding: '24px',
        background: 'var(--color-brand-gradient)',
        borderRadius: '16px',
        color: 'white'
      }}>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          marginBottom: '8px',
          opacity: 0.9,
          fontFamily: 'var(--font-primary)'
        }}>
          Starting from
        </div>
        <div style={{
          fontSize: '36px',
          fontWeight: '700',
          fontFamily: 'var(--font-display)',
          lineHeight: '1'
        }}>
          {formatPrice(tour.pricePerPerson)}
        </div>
        <div style={{
          fontSize: '14px',
          fontWeight: '500',
          opacity: 0.9,
          fontFamily: 'var(--font-primary)'
        }}>
          per person · {tour.duration} days
        </div>
      </div>

      {/* Date Selection */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--color-primary)',
          marginBottom: '8px',
          fontFamily: 'var(--font-primary)'
        }}>
          Select Departure Date
        </label>

        <button
          onClick={() => setShowCalendar(!showCalendar)}
          style={{
            width: '100%',
            padding: '16px',
            border: '1px solid var(--color-neutral-300)',
            borderRadius: '12px',
            background: 'white',
            textAlign: 'left',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: '15px',
            fontFamily: 'var(--font-primary)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-brand)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-neutral-300)'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Calendar size={16} style={{ color: 'var(--color-brand)' }} />
            {selectedDepartureDetails ? (
              <span style={{ color: 'var(--color-primary)', fontWeight: '500' }}>
                {formatDate(selectedDepartureDetails.startDate)} - {formatDate(selectedDepartureDetails.endDate)}
              </span>
            ) : (
              <span style={{ color: 'var(--color-neutral-500)' }}>
                Choose your dates
              </span>
            )}
          </div>
          <ChevronDown size={16} style={{
            color: 'var(--color-neutral-400)',
            transform: showCalendar ? 'rotate(180deg)' : 'rotate(0)',
            transition: 'transform 0.2s ease'
          }} />
        </button>

        {showCalendar && (
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: 'white',
            border: '1px solid var(--color-neutral-200)',
            borderRadius: '16px',
            marginTop: '8px',
            padding: '20px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.15)',
            zIndex: 1000
          }}>
            {/* Calendar Header */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '20px'
            }}>
              <button
                onClick={() => navigateMonth('prev')}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronLeft size={20} style={{ color: 'var(--color-neutral-600)' }} />
              </button>
              <h3 style={{
                fontSize: '16px',
                fontWeight: '600',
                color: 'var(--color-primary)',
                fontFamily: 'var(--font-display)',
                margin: 0
              }}>
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </h3>
              <button
                onClick={() => navigateMonth('next')}
                style={{
                  border: 'none',
                  background: 'none',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <ChevronRight size={20} style={{ color: 'var(--color-neutral-600)' }} />
              </button>
            </div>

            {/* Calendar Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px',
              marginBottom: '16px'
            }}>
              {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                <div key={day} style={{
                  padding: '8px',
                  fontSize: '12px',
                  fontWeight: '600',
                  color: 'var(--color-neutral-500)',
                  textAlign: 'center',
                  fontFamily: 'var(--font-primary)'
                }}>
                  {day}
                </div>
              ))}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(7, 1fr)',
              gap: '4px'
            }}>
              {getDaysInMonth(currentMonth).map((date, index) => {
                const isAvailable = date && isDepartureDate(date)
                const departure = date ? getDepartureForDate(date) : null
                const isSelected = departure && departure.id === selectedDeparture

                return (
                  <button
                    key={index}
                    onClick={() => {
                      if (departure) {
                        setSelectedDeparture(departure.id)
                        setShowCalendar(false)
                      }
                    }}
                    disabled={!isAvailable}
                    style={{
                      padding: '8px',
                      border: 'none',
                      borderRadius: '8px',
                      fontSize: '14px',
                      fontFamily: 'var(--font-primary)',
                      cursor: isAvailable ? 'pointer' : 'default',
                      background: isSelected
                        ? 'var(--color-brand)'
                        : isAvailable
                          ? 'var(--color-brand-light)'
                          : 'transparent',
                      color: isSelected || isAvailable ? 'white' : 'var(--color-neutral-400)',
                      fontWeight: isAvailable ? '600' : '400',
                      opacity: date ? 1 : 0,
                      transition: 'all 0.2s ease'
                    }}
                  >
                    {date?.getDate()}
                  </button>
                )
              })}
            </div>

            {availableDepartures.length === 0 && (
              <div style={{
                textAlign: 'center',
                padding: '20px',
                color: 'var(--color-neutral-500)',
                fontSize: '14px',
                fontFamily: 'var(--font-primary)'
              }}>
                No available departures for this month
              </div>
            )}
          </div>
        )}
      </div>

      {/* Guest Count */}
      <div style={{ marginBottom: '24px' }}>
        <label style={{
          display: 'block',
          fontSize: '14px',
          fontWeight: '600',
          color: 'var(--color-primary)',
          marginBottom: '8px',
          fontFamily: 'var(--font-primary)'
        }}>
          Number of Guests
        </label>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          border: '1px solid var(--color-neutral-300)',
          borderRadius: '12px',
          padding: '4px'
        }}>
          <button
            onClick={() => setGuestCount(Math.max(1, guestCount - 1))}
            disabled={guestCount <= 1}
            style={{
              border: 'none',
              background: 'none',
              cursor: guestCount > 1 ? 'pointer' : 'not-allowed',
              padding: '12px 16px',
              fontSize: '18px',
              fontWeight: '600',
              color: guestCount > 1 ? 'var(--color-primary)' : 'var(--color-neutral-400)',
              borderRadius: '8px'
            }}
          >
            −
          </button>

          <div style={{
            flex: 1,
            textAlign: 'center',
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-primary)'
          }}>
            {guestCount} {guestCount === 1 ? 'guest' : 'guests'}
          </div>

          <button
            onClick={() => setGuestCount(Math.min(tour.groupSize, guestCount + 1))}
            disabled={guestCount >= tour.groupSize}
            style={{
              border: 'none',
              background: 'none',
              cursor: guestCount < tour.groupSize ? 'pointer' : 'not-allowed',
              padding: '12px 16px',
              fontSize: '18px',
              fontWeight: '600',
              color: guestCount < tour.groupSize ? 'var(--color-primary)' : 'var(--color-neutral-400)',
              borderRadius: '8px'
            }}
          >
            +
          </button>
        </div>

        <div style={{
          fontSize: '12px',
          color: 'var(--color-neutral-500)',
          marginTop: '4px',
          fontFamily: 'var(--font-primary)'
        }}>
          Maximum {tour.groupSize} guests per departure
        </div>
      </div>

      {/* Price Breakdown */}
      {selectedDeparture && (
        <div style={{
          marginBottom: '24px',
          padding: '20px',
          background: 'var(--color-neutral-50)',
          borderRadius: '12px',
          border: '1px solid var(--color-neutral-200)'
        }}>
          <h4 style={{
            fontSize: '16px',
            fontWeight: '600',
            color: 'var(--color-primary)',
            marginBottom: '12px',
            fontFamily: 'var(--font-primary)'
          }}>
            Price Breakdown
          </h4>

          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '8px',
            fontSize: '14px',
            fontFamily: 'var(--font-primary)'
          }}>
            <span style={{ color: 'var(--color-neutral-600)' }}>
              {formatPrice(tour.pricePerPerson)} × {guestCount} guest{guestCount !== 1 ? 's' : ''}
            </span>
            <span style={{ color: 'var(--color-primary)', fontWeight: '500' }}>
              {formatPrice(totalPrice)}
            </span>
          </div>

          <div style={{
            borderTop: '1px solid var(--color-neutral-300)',
            paddingTop: '12px',
            marginTop: '12px'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '8px',
              fontSize: '14px',
              fontFamily: 'var(--font-primary)'
            }}>
              <span style={{ color: 'var(--color-neutral-600)' }}>
                Deposit ({Math.round(tour.depositPercentage * 100)}%)
              </span>
              <span style={{ color: 'var(--color-brand)', fontWeight: '600' }}>
                {formatPrice(depositAmount)}
              </span>
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              fontSize: '12px',
              fontFamily: 'var(--font-primary)'
            }}>
              <span style={{ color: 'var(--color-neutral-500)' }}>
                Remaining balance
              </span>
              <span style={{ color: 'var(--color-neutral-600)' }}>
                {formatPrice(remainingAmount)}
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Security Features */}
      <div style={{
        marginBottom: '24px',
        padding: '16px',
        background: 'linear-gradient(135deg, var(--color-neutral-50) 0%, rgba(255, 255, 255, 0.8) 100%)',
        borderRadius: '12px',
        border: '1px solid var(--color-neutral-200)'
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginBottom: '8px'
        }}>
          <Shield size={16} style={{ color: 'var(--color-brand)' }} />
          <span style={{
            fontSize: '14px',
            fontWeight: '600',
            color: 'var(--color-primary)',
            fontFamily: 'var(--font-primary)'
          }}>
            Secure Booking
          </span>
        </div>
        <ul style={{
          margin: 0,
          padding: 0,
          listStyle: 'none',
          fontSize: '12px',
          color: 'var(--color-neutral-600)',
          fontFamily: 'var(--font-primary)'
        }}>
          <li style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <CheckCircle size={12} style={{ color: 'var(--color-brand)' }} />
            Secure payment processing
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
            <CheckCircle size={12} style={{ color: 'var(--color-brand)' }} />
            Flexible cancellation policy
          </li>
          <li style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <CheckCircle size={12} style={{ color: 'var(--color-brand)' }} />
            24/7 customer support
          </li>
        </ul>
      </div>

      {/* Book Now Button */}
      <button
        disabled={!selectedDeparture}
        style={{
          width: '100%',
          padding: '16px',
          border: 'none',
          borderRadius: '12px',
          background: selectedDeparture
            ? 'var(--color-brand-gradient)'
            : 'var(--color-neutral-300)',
          color: 'white',
          fontSize: '16px',
          fontWeight: '600',
          cursor: selectedDeparture ? 'pointer' : 'not-allowed',
          fontFamily: 'var(--font-primary)',
          transition: 'all 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '8px'
        }}
        onMouseEnter={(e) => {
          if (selectedDeparture) {
            e.currentTarget.style.transform = 'translateY(-2px)'
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(5, 150, 105, 0.3)'
          }
        }}
        onMouseLeave={(e) => {
          if (selectedDeparture) {
            e.currentTarget.style.transform = 'translateY(0)'
            e.currentTarget.style.boxShadow = 'none'
          }
        }}
      >
        <CreditCard size={18} />
        {selectedDeparture ? `Reserve for ${formatPrice(depositAmount)}` : 'Select Date to Book'}
      </button>

      {selectedDeparture && (
        <div style={{
          textAlign: 'center',
          fontSize: '12px',
          color: 'var(--color-neutral-500)',
          marginTop: '8px',
          fontFamily: 'var(--font-primary)'
        }}>
          Pay only {formatPrice(depositAmount)} today • Remaining {formatPrice(remainingAmount)} due 30 days before departure
        </div>
      )}

      {/* Availability Notice */}
      {selectedDepartureDetails && (
        <div style={{
          marginTop: '16px',
          padding: '12px',
          background: selectedDepartureDetails.availableSpots <= 3
            ? 'linear-gradient(135deg, #FEF3C7 0%, #FDE68A 100%)'
            : 'linear-gradient(135deg, #D1FAE5 0%, #A7F3D0 100%)',
          borderRadius: '8px',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <Clock size={14} style={{
            color: selectedDepartureDetails.availableSpots <= 3 ? '#D97706' : 'var(--color-brand)'
          }} />
          <span style={{
            fontSize: '12px',
            fontWeight: '500',
            color: selectedDepartureDetails.availableSpots <= 3 ? '#D97706' : 'var(--color-brand)',
            fontFamily: 'var(--font-primary)'
          }}>
            {selectedDepartureDetails.availableSpots <= 3
              ? `Only ${selectedDepartureDetails.availableSpots} spots left!`
              : `${selectedDepartureDetails.availableSpots} spots available`
            }
          </span>
        </div>
      )}
    </div>
  )
}