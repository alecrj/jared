'use client'

import { useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { 
  Search,
  MapPin,
  DollarSign,
  Calendar,
  ChefHat,
  X,
  Filter
} from 'lucide-react'
import { getCuisineColor } from '@/lib/utils'

interface TourFiltersProps {
  availableCuisines: string[]
  currentFilters: {
    search?: string
    cuisine?: string
    location?: string
    minPrice?: string
    maxPrice?: string
    duration?: string
  }
}

export function TourFilters({ availableCuisines, currentFilters }: TourFiltersProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  
  const [filters, setFilters] = useState({
    search: currentFilters.search || '',
    cuisine: currentFilters.cuisine || '',
    location: currentFilters.location || '',
    minPrice: currentFilters.minPrice || '',
    maxPrice: currentFilters.maxPrice || '',
    duration: currentFilters.duration || ''
  })

  const [showMobileFilters, setShowMobileFilters] = useState(false)

  const durations = [
    { value: '1', label: '1 day' },
    { value: '2', label: '2 days' },
    { value: '3', label: '3 days' },
    { value: '4', label: '4 days' },
    { value: '5', label: '5 days' },
    { value: '7', label: '1 week' },
    { value: '14', label: '2 weeks' }
  ]

  const updateFilter = (key: string, value: string) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    
    // Update URL
    const params = new URLSearchParams(searchParams)
    if (value) {
      params.set(key, value)
    } else {
      params.delete(key)
    }
    params.delete('page') // Reset to first page when filtering
    
    router.push(`/conquistatour?${params.toString()}`)
  }

  const clearFilters = () => {
    setFilters({
      search: '',
      cuisine: '',
      location: '',
      minPrice: '',
      maxPrice: '',
      duration: ''
    })
    router.push('/conquistatour')
  }

  const hasActiveFilters = Object.values(filters).some(value => value !== '')

  const filterContent = (
    <>
      {/* Search */}
      <div className="space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search tours..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            className="input w-full pl-10"
          />
        </div>
      </div>

      <Separator />

      {/* Location */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-4 h-4 text-primary" />
          <h3 className="heading-sm text-gray-800">Location</h3>
        </div>
        <input
          type="text"
          placeholder="Any destination..."
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
          className="input"
        />
      </div>

      <Separator />

      {/* Cuisine Type */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <ChefHat className="w-4 h-4 text-primary" />
          <h3 className="heading-sm text-gray-800">Cuisine</h3>
        </div>
        <div className="space-y-2 max-h-64 overflow-y-auto">
          <button
            onClick={() => updateFilter('cuisine', '')}
            className={`w-full text-left px-3 py-2 body-sm rounded-lg transition-colors ${
              !filters.cuisine 
                ? 'bg-gray-100 text-gray-800 font-medium' 
                : 'hover:bg-gray-50'
            }`}
          >
            All Cuisines
          </button>
          {availableCuisines.map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => updateFilter('cuisine', cuisine)}
              className={`w-full text-left px-3 py-2 body-sm rounded-lg transition-colors ${
                filters.cuisine === cuisine
                  ? 'bg-gray-100 text-gray-800 font-medium'
                  : 'hover:bg-gray-50'
              }`}
            >
              {cuisine}
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <DollarSign className="w-4 h-4 text-primary" />
          <h3 className="heading-sm text-gray-800">Price Range</h3>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            className="input"
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            className="input"
          />
        </div>
      </div>

      <Separator />

      {/* Duration */}
      <div className="space-y-4">
        <div className="flex items-center gap-2">
          <Calendar className="w-4 h-4 text-primary" />
          <h3 className="heading-sm text-gray-800">Duration</h3>
        </div>
        <div className="space-y-2">
          <button
            onClick={() => updateFilter('duration', '')}
            className={`w-full text-left px-3 py-2 body-sm rounded-lg transition-colors ${
              !filters.duration 
                ? 'bg-gray-100 text-gray-800 font-medium' 
                : 'hover:bg-gray-50'
            }`}
          >
            Any duration
          </button>
          {durations.map((duration) => (
            <button
              key={duration.value}
              onClick={() => updateFilter('duration', duration.value)}
              className={`w-full text-left px-3 py-2 body-sm rounded-lg transition-colors ${
                filters.duration === duration.value
                  ? 'bg-gray-100 text-gray-800 font-medium'
                  : 'hover:bg-gray-50'
              }`}
            >
              {duration.label}
            </button>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <>
          <Separator />
          <button onClick={clearFilters} className="btn btn-secondary btn-md w-full">
            <X className="w-4 h-4 mr-2" />
            Clear All Filters
          </button>
        </>
      )}
    </>
  )

  return (
    <>
      {/* Mobile Filter Button */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setShowMobileFilters(true)}
          className="btn btn-secondary btn-md w-full"
        >
          <Filter className="w-4 h-4 mr-2" />
          Filters {hasActiveFilters && '(Active)'}
        </button>
      </div>

      {/* Desktop Filters */}
      <div className="hidden lg:block">
        <div className="card">
          <div className="p-6 border-b border-gray-200">
            <h3 className="heading-lg text-gray-800">Filters</h3>
          </div>
          <div className="p-6 space-y-6">
            {filterContent}
          </div>
        </div>
      </div>

      {/* Mobile Filters Modal */}
      {showMobileFilters && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 lg:hidden">
          <div className="absolute right-0 top-0 h-full w-80 bg-white shadow-xl">
            <div className="p-4 border-b">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-lg">Filters</h3>
                <button
                  onClick={() => setShowMobileFilters(false)}
                  className="btn btn-ghost btn-sm"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>
            <div className="p-4 overflow-y-auto h-full pb-20 space-y-6">
              {filterContent}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Display */}
      {hasActiveFilters && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2 items-center">
            <span className="caption font-medium text-gray-600">Active filters:</span>
            {filters.search && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                "{filters.search}"
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-gray-900" 
                  onClick={() => updateFilter('search', '')}
                />
              </div>
            )}
            {filters.cuisine && (
              <div className="flex items-center gap-1 px-2 py-1 bg-primary text-white rounded-md text-sm">
                {filters.cuisine}
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-gray-200" 
                  onClick={() => updateFilter('cuisine', '')}
                />
              </div>
            )}
            {filters.location && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                <MapPin className="w-3 h-3" />
                {filters.location}
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-gray-900" 
                  onClick={() => updateFilter('location', '')}
                />
              </div>
            )}
            {(filters.minPrice || filters.maxPrice) && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                ${filters.minPrice || '0'} - ${filters.maxPrice || '∞'}
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-gray-900" 
                  onClick={() => {
                    updateFilter('minPrice', '')
                    updateFilter('maxPrice', '')
                  }}
                />
              </div>
            )}
            {filters.duration && (
              <div className="flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm">
                {durations.find(d => d.value === filters.duration)?.label}
                <X 
                  className="w-3 h-3 cursor-pointer hover:text-gray-900" 
                  onClick={() => updateFilter('duration', '')}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  )
}