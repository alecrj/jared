'use client'

import { useState } from 'react'
import { 
  Calendar, 
  Users, 
  CreditCard, 
  Shield, 
  Clock,
  MapPin,
  CheckCircle
} from 'lucide-react'
import { formatPrice } from '@/lib/utils'
import Link from 'next/link'

interface BookingCardProps {
  tour: {
    id: string
    slug: string
    title: string
    pricePerPerson: number
    depositPercentage: number
    duration: number
    location: string
    groupSize: number
    cancellationPolicy: string
  }
  departures: Array<{
    id: string
    startDate: Date
    endDate: Date
    availableSpots: number
    status: string
  }>
}

export function BookingCard({ tour, departures }: BookingCardProps) {
  const [selectedDeparture, setSelectedDeparture] = useState<string>('')
  const [participants, setParticipants] = useState(1)
  
  const selectedDepartureData = departures.find(d => d.id === selectedDeparture)
  const totalPrice = tour.pricePerPerson * participants
  const depositAmount = Math.round(totalPrice * tour.depositPercentage)
  const balanceAmount = totalPrice - depositAmount

  const formatDate = (date: Date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    })
  }

  const formatDateRange = (startDate: Date, endDate: Date) => {
    const start = new Date(startDate)
    const end = new Date(endDate)
    
    if (start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear()) {
      return `${start.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${end.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })}`
    } else {
      return `${formatDate(start)} - ${formatDate(end)}`
    }
  }

  const getCancellationText = (policy: string) => {
    switch (policy) {
      case 'FLEXIBLE':
        return 'Free cancellation up to 7 days before'
      case 'MODERATE':
        return 'Free cancellation up to 14 days before'
      case 'STRICT':
        return 'Free cancellation up to 30 days before'
      default:
        return 'Standard cancellation policy'
    }
  }

  return (
    <div id="booking" className="card-premium p-6 sticky top-24">
      <div className="text-right mb-6">
        <div className="text-heading-xl text-gray-900 mb-1">
          {formatPrice(tour.pricePerPerson)}
        </div>
        <div className="text-body-base text-gray-600">per person</div>
      </div>
      
      <div className="space-y-6">
        {/* Quick info */}
        <div className="flex items-center justify-between text-body-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="w-4 h-4 mr-2 text-gray-900" />
            <span>{tour.location}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2 text-gray-900" />
            <span>{tour.duration} days</span>
          </div>
        </div>

        {/* Date selection */}
        <div>
          <label className="block text-body-base font-semibold text-gray-900 mb-3">
            Choose dates
          </label>
          <div className="space-y-2">
            {departures.length > 0 ? (
              departures.map((departure) => (
                <label
                  key={departure.id}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition-all hover:shadow-sm ${
                    selectedDeparture === departure.id
                      ? 'border-gray-900 bg-gray-50'
                      : 'border-gray-300 hover:border-gray-400'
                  }`}
                >
                  <input
                    type="radio"
                    name="departure"
                    value={departure.id}
                    checked={selectedDeparture === departure.id}
                    onChange={(e) => setSelectedDeparture(e.target.value)}
                    className="sr-only"
                  />
                  <div className="flex-1">
                    <div className="font-medium text-gray-900">
                      {formatDateRange(departure.startDate, departure.endDate)}
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {departure.availableSpots} spots available
                    </div>
                  </div>
                  {departure.availableSpots <= 3 && (
                    <div className="px-2 py-1 bg-red-100 text-red-800 rounded-md text-xs font-medium">
                      Only {departure.availableSpots} left!
                    </div>
                  )}
                </label>
              ))
            ) : (
              <div className="text-center py-8 text-gray-500">
                <Calendar className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p className="font-medium">No dates available</p>
                <p className="text-sm">Check back soon for new departures</p>
              </div>
            )}
          </div>
        </div>

        {/* Participants */}
        {selectedDeparture && (
          <div>
            <label className="block text-body-base font-semibold text-gray-900 mb-3">
              Number of travelers
            </label>
            <div className="flex items-center justify-between p-4 border border-gray-300 rounded-xl">
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2 text-gray-900" />
                <span className="font-medium">Travelers</span>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setParticipants(Math.max(1, participants - 1))}
                  disabled={participants <= 1}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 text-gray-900"
                >
                  -
                </button>
                <span className="font-semibold w-8 text-center">{participants}</span>
                <button
                  onClick={() => setParticipants(Math.min(selectedDepartureData?.availableSpots || 1, participants + 1))}
                  disabled={participants >= (selectedDepartureData?.availableSpots || 1)}
                  className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-100 disabled:opacity-50 text-gray-900"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Price breakdown */}
        {selectedDeparture && (
          <div className="bg-gray-50 p-4 rounded-xl space-y-3">
            <h4 className="text-body-base font-semibold text-gray-900">Price breakdown</h4>
            
            <div className="space-y-2 text-body-sm">
              <div className="flex justify-between">
                <span>{formatPrice(tour.pricePerPerson)} × {participants} travelers</span>
                <span className="font-medium text-gray-900">{formatPrice(totalPrice)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="space-y-2 text-body-sm">
              <div className="flex justify-between">
                <div className="flex items-center">
                  <CreditCard className="w-4 h-4 mr-2 text-gray-900" />
                  <span className="text-gray-900">Deposit (25%)</span>
                </div>
                <span className="font-medium text-gray-900">{formatPrice(depositAmount)}</span>
              </div>
              <div className="flex justify-between text-gray-600">
                <span>Balance due 21 days before</span>
                <span>{formatPrice(balanceAmount)}</span>
              </div>
            </div>

            <div className="border-t border-gray-200 my-3"></div>

            <div className="flex justify-between font-semibold text-body-base text-gray-900">
              <span>Total</span>
              <span>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        )}

        {/* Book button */}
        {selectedDeparture ? (
          <Link 
            href={`/booking/${tour.slug}?departure=${selectedDeparture}&participants=${participants}`}
            className="btn btn-primary btn-lg w-full"
          >
            Reserve your spot
          </Link>
        ) : (
          <button disabled className="btn btn-primary btn-lg w-full opacity-50">
            Select dates to continue
          </button>
        )}

        {/* Policies */}
        <div className="space-y-3 text-body-sm text-gray-600">
          <div className="flex items-start">
            <Shield className="w-4 h-4 mr-2 text-gray-900 flex-shrink-0 mt-0.5" />
            <span>{getCancellationText(tour.cancellationPolicy)}</span>
          </div>
          <div className="flex items-start">
            <CheckCircle className="w-4 h-4 mr-2 text-gray-900 flex-shrink-0 mt-0.5" />
            <span>Secure payment and booking confirmation</span>
          </div>
        </div>
      </div>
    </div>
  )
}