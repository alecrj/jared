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
        <div style={{ position: 'relative' }}>
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          <input
            type="text"
            placeholder="Search experiences..."
            value={filters.search}
            onChange={(e) => updateFilter('search', e.target.value)}
            style={{
              width: '100%',
              padding: '12px 16px 12px 40px',
              borderRadius: '50px',
              border: '1px solid rgba(15, 20, 25, 0.1)',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.875rem',
              color: 'var(--color-primary)',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(15, 20, 25, 0.1)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>
      </div>

      <Separator />

      {/* Location */}
      <div className="space-y-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <MapPin className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
          <h3 style={{ 
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--color-primary)',
            margin: 0
          }}>
            Location
          </h3>
        </div>
        <input
          type="text"
          placeholder="Any destination..."
          value={filters.location}
          onChange={(e) => updateFilter('location', e.target.value)}
          style={{
            width: '100%',
            padding: '12px 16px',
            borderRadius: '12px',
            border: '1px solid rgba(15, 20, 25, 0.1)',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            fontSize: '0.875rem',
            color: 'var(--color-primary)',
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.currentTarget.style.borderColor = 'var(--color-accent)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
            e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)'
          }}
          onBlur={(e) => {
            e.currentTarget.style.borderColor = 'rgba(15, 20, 25, 0.1)'
            e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
            e.currentTarget.style.boxShadow = 'none'
          }}
        />
      </div>

      <Separator />

      {/* Experience Type - simplified */}
      <div className="space-y-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <Calendar className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--color-primary)',
            margin: 0
          }}>
            Experience Type
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => updateFilter('cuisine', '')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: '12px',
              border: !filters.cuisine ? '2px solid var(--color-accent)' : '1px solid rgba(15, 20, 25, 0.1)',
              background: !filters.cuisine ? 'rgba(79, 70, 229, 0.1)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.875rem',
              fontWeight: !filters.cuisine ? '600' : '400',
              color: 'var(--color-primary)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            All Experiences
          </button>
          {availableCuisines.slice(0, 4).map((cuisine) => (
            <button
              key={cuisine}
              onClick={() => updateFilter('cuisine', cuisine)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: '12px',
                border: filters.cuisine === cuisine ? '2px solid var(--color-accent)' : '1px solid rgba(15, 20, 25, 0.1)',
                background: filters.cuisine === cuisine ? 'rgba(79, 70, 229, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.875rem',
                fontWeight: filters.cuisine === cuisine ? '600' : '400',
                color: 'var(--color-primary)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (filters.cuisine !== cuisine) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                  e.currentTarget.style.borderColor = 'var(--color-accent)'
                }
              }}
              onMouseLeave={(e) => {
                if (filters.cuisine !== cuisine) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
                  e.currentTarget.style.borderColor = 'rgba(15, 20, 25, 0.1)'
                }
              }}
            >
              {cuisine} Experiences
            </button>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div className="space-y-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <DollarSign className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--color-primary)',
            margin: 0
          }}>
            Price Range
          </h3>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
          <input
            type="number"
            placeholder="Min"
            value={filters.minPrice}
            onChange={(e) => updateFilter('minPrice', e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(15, 20, 25, 0.1)',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.875rem',
              color: 'var(--color-primary)',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(15, 20, 25, 0.1)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
          <input
            type="number"
            placeholder="Max"
            value={filters.maxPrice}
            onChange={(e) => updateFilter('maxPrice', e.target.value)}
            style={{
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(15, 20, 25, 0.1)',
              background: 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.875rem',
              color: 'var(--color-primary)',
              transition: 'all 0.3s ease'
            }}
            onFocus={(e) => {
              e.currentTarget.style.borderColor = 'var(--color-accent)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
              e.currentTarget.style.boxShadow = '0 0 0 3px rgba(79, 70, 229, 0.1)'
            }}
            onBlur={(e) => {
              e.currentTarget.style.borderColor = 'rgba(15, 20, 25, 0.1)'
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
              e.currentTarget.style.boxShadow = 'none'
            }}
          />
        </div>
      </div>

      <Separator />

      {/* Duration */}
      <div className="space-y-4">
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '1rem' }}>
          <Calendar className="w-4 h-4" style={{ color: 'var(--color-accent)' }} />
          <h3 style={{
            fontSize: '1rem',
            fontWeight: '600',
            color: 'var(--color-primary)',
            margin: 0
          }}>
            Duration
          </h3>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <button
            onClick={() => updateFilter('duration', '')}
            style={{
              width: '100%',
              textAlign: 'left',
              padding: '12px 16px',
              borderRadius: '12px',
              border: !filters.duration ? '2px solid var(--color-accent)' : '1px solid rgba(15, 20, 25, 0.1)',
              background: !filters.duration ? 'rgba(79, 70, 229, 0.1)' : 'rgba(255, 255, 255, 0.8)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.875rem',
              fontWeight: !filters.duration ? '600' : '400',
              color: 'var(--color-primary)',
              transition: 'all 0.3s ease',
              cursor: 'pointer'
            }}
          >
            Any duration
          </button>
          {durations.slice(0, 6).map((duration) => (
            <button
              key={duration.value}
              onClick={() => updateFilter('duration', duration.value)}
              style={{
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                borderRadius: '12px',
                border: filters.duration === duration.value ? '2px solid var(--color-accent)' : '1px solid rgba(15, 20, 25, 0.1)',
                background: filters.duration === duration.value ? 'rgba(79, 70, 229, 0.1)' : 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                fontSize: '0.875rem',
                fontWeight: filters.duration === duration.value ? '600' : '400',
                color: 'var(--color-primary)',
                transition: 'all 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                if (filters.duration !== duration.value) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                  e.currentTarget.style.borderColor = 'var(--color-accent)'
                }
              }}
              onMouseLeave={(e) => {
                if (filters.duration !== duration.value) {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
                  e.currentTarget.style.borderColor = 'rgba(15, 20, 25, 0.1)'
                }
              }}
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
          <button
            onClick={clearFilters}
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '12px',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              background: 'rgba(239, 68, 68, 0.1)',
              backdropFilter: 'blur(10px)',
              fontSize: '0.875rem',
              fontWeight: '600',
              color: 'rgb(239, 68, 68)',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.2)'
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.5)'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(239, 68, 68, 0.1)'
              e.currentTarget.style.borderColor = 'rgba(239, 68, 68, 0.3)'
            }}
          >
            <X className="w-4 h-4" />
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
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px) saturate(150%)',
          borderRadius: '20px',
          border: '1px solid rgba(15, 20, 25, 0.1)',
          boxShadow: 'var(--shadow-lg)',
          position: 'sticky',
          top: '120px'
        }}>
          <div style={{
            padding: '1.5rem',
            borderBottom: '1px solid rgba(15, 20, 25, 0.1)'
          }}>
            <h3 style={{
              fontSize: '1.5rem',
              fontWeight: '700',
              color: 'var(--color-primary)',
              margin: 0
            }}>
              Filters
            </h3>
          </div>
          <div style={{
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}>
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