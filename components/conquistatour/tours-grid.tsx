'use client'

import Link from 'next/link'
import { ConquistaTourCard } from './conquistatour-card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface ToursGridProps {
  tours: any[]
  currentPage: number
  totalPages: number
  baseUrl: string
}

export function ToursGrid({ tours, currentPage, totalPages, baseUrl }: ToursGridProps) {
  if (tours.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '4rem 0' }}>
        <div style={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderRadius: '20px',
          padding: '3rem',
          border: '1px solid rgba(15, 20, 25, 0.1)',
          boxShadow: 'var(--shadow-lg)'
        }}>
          <h3 style={{
            fontSize: '1.5rem',
            fontWeight: '600',
            color: 'var(--color-neutral-600)',
            marginBottom: '1rem'
          }}>
            No experiences found
          </h3>
          <p style={{
            fontSize: '1rem',
            color: 'var(--color-neutral-600)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            Try adjusting your filters or search terms to find more experiences.
          </p>
          <Link href="/conquistatour" className="btn btn-primary">
            View all experiences
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Experiences Grid */}
      <div className="cards" style={{ marginBottom: '4rem' }}>
        {tours.map((tour, index) => (
          <ConquistaTourCard key={tour.id} tour={tour} index={index} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          gap: '0.5rem',
          padding: '2rem 0'
        }}>
          {currentPage > 1 && (
            <Link 
              href={`${baseUrl}?page=${currentPage - 1}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 20px',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '500',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(15, 20, 25, 0.1)',
                color: 'var(--color-neutral-600)',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              <ChevronLeft className="w-4 h-4 mr-1" />
              Previous
            </Link>
          )}

          <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
            {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
              let pageNum
              if (totalPages <= 5) {
                pageNum = i + 1
              } else if (currentPage <= 3) {
                pageNum = i + 1
              } else if (currentPage >= totalPages - 2) {
                pageNum = totalPages - 4 + i
              } else {
                pageNum = currentPage - 2 + i
              }

              const isActive = currentPage === pageNum

              return (
                <Link
                  key={pageNum}
                  href={`${baseUrl}?page=${pageNum}`}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '44px',
                    height: '44px',
                    borderRadius: '50%',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    background: isActive 
                      ? 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)' 
                      : 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(10px)',
                    border: `1px solid ${isActive ? 'transparent' : 'rgba(15, 20, 25, 0.1)'}`,
                    color: isActive ? 'white' : 'var(--color-neutral-600)',
                    textDecoration: 'none',
                    transition: 'all 0.3s ease',
                    boxShadow: isActive ? 'var(--shadow-md)' : 'none'
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                      e.currentTarget.style.transform = 'translateY(-2px)'
                      e.currentTarget.style.boxShadow = 'var(--shadow-sm)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
                      e.currentTarget.style.transform = 'translateY(0)'
                      e.currentTarget.style.boxShadow = 'none'
                    }
                  }}
                >
                  {pageNum}
                </Link>
              )
            })}
          </div>

          {currentPage < totalPages && (
            <Link 
              href={`${baseUrl}?page=${currentPage + 1}`}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                padding: '12px 20px',
                borderRadius: '50px',
                fontSize: '0.875rem',
                fontWeight: '500',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(10px)',
                border: '1px solid rgba(15, 20, 25, 0.1)',
                color: 'var(--color-neutral-600)',
                textDecoration: 'none',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 1)'
                e.currentTarget.style.transform = 'translateY(-2px)'
                e.currentTarget.style.boxShadow = 'var(--shadow-md)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.8)'
                e.currentTarget.style.transform = 'translateY(0)'
                e.currentTarget.style.boxShadow = 'none'
              }}
            >
              Next
              <ChevronRight className="w-4 h-4 ml-1" />
            </Link>
          )}
        </div>
      )}
    </>
  )
}