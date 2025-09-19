'use client'

import { useState } from 'react'
import Link from 'next/link'
import { AdvancedSearch } from './advanced-search'
import { ToursGrid } from './tours-grid'
import { Sparkles, Grid3X3, List, ChevronDown, Sliders } from 'lucide-react'

interface ExperiencesClientProps {
  tours: any[]
  total: number
  page: number
  totalPages: number
}

export function ExperiencesClient({ tours, total, page, totalPages }: ExperiencesClientProps) {
  const [activeFilter, setActiveFilter] = useState('All')
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter tours based on active filter
  const filteredTours = tours.filter(tour => {
    switch (activeFilter) {
      case 'Cultural Immersion':
        return tour.title.toLowerCase().includes('cultural') ||
               tour.title.toLowerCase().includes('culinary') ||
               tour.location.includes('Croatia')
      case 'Photography':
        return tour.title.toLowerCase().includes('photography') ||
               tour.title.toLowerCase().includes('photo')
      case 'Architecture':
        return tour.title.toLowerCase().includes('architecture') ||
               tour.title.toLowerCase().includes('architectural')
      case 'Multi-day Adventures':
        return tour.duration > 1
      case 'Weekend Escapes':
        return tour.duration >= 2 && tour.duration <= 4
      case 'Epic Expeditions':
        return tour.duration >= 7
      default:
        return true
    }
  })

  const filterCategories = [
    { label: 'All', count: total },
    { label: 'Cultural Immersion', count: tours.filter(t => t.title.toLowerCase().includes('cultural') || t.title.toLowerCase().includes('culinary') || t.location.includes('Croatia')).length },
    { label: 'Photography', count: tours.filter(t => t.title.toLowerCase().includes('photography')).length },
    { label: 'Architecture', count: tours.filter(t => t.title.toLowerCase().includes('architecture')).length },
    { label: 'Multi-day Adventures', count: tours.filter(t => t.duration > 1).length },
    { label: 'Weekend Escapes', count: tours.filter(t => t.duration >= 2 && t.duration <= 4).length },
    { label: 'Epic Expeditions', count: tours.filter(t => t.duration >= 7).length }
  ]
  return (
    <>
      {/* Premium Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        background: 'rgba(250, 251, 250, 0.95)',
        backdropFilter: 'blur(24px)',
        borderBottom: '1px solid var(--color-neutral-200)',
        padding: '16px 0'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <Link href="/" style={{
              fontSize: '24px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-primary)',
              textDecoration: 'none',
              letterSpacing: '-0.02em'
            }}>
              Conquistador
            </Link>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '32px'
            }}>
              <Link href="/conquistatour" style={{
                fontSize: '15px',
                fontWeight: '500',
                color: 'var(--color-brand)',
                textDecoration: 'none',
                fontFamily: 'var(--font-primary)'
              }}>Experiences</Link>
              <Link href="/leader/apply" style={{
                fontSize: '15px',
                fontWeight: '500',
                color: 'var(--color-neutral-700)',
                textDecoration: 'none',
                fontFamily: 'var(--font-primary)'
              }}>Host</Link>
              <Link href="/auth/login" style={{
                padding: '10px 20px',
                borderRadius: '12px',
                background: 'var(--color-brand-gradient)',
                color: 'white',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                fontFamily: 'var(--font-primary)',
                transition: 'all 0.2s ease'
              }}>Login</Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{
        background: 'linear-gradient(135deg, var(--color-neutral-50) 0%, #ffffff 100%)',
        paddingTop: '100px',
        paddingBottom: '40px'
      }}>
        <div className="container">
          <div style={{
            textAlign: 'center',
            marginBottom: '40px'
          }}>
            <div style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              padding: '8px 16px',
              background: 'var(--color-brand-gradient)',
              borderRadius: '50px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '24px',
              fontFamily: 'var(--font-primary)'
            }}>
              <Sparkles size={16} />
              Curated Experiences
            </div>
            <h1 style={{
              fontSize: 'clamp(40px, 5vw, 64px)',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-primary)',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              marginBottom: '16px'
            }}>
              Discover Extraordinary
            </h1>
            <p style={{
              fontSize: '20px',
              color: 'var(--color-neutral-600)',
              maxWidth: '600px',
              margin: '0 auto',
              lineHeight: '1.6',
              fontFamily: 'var(--font-primary)'
            }}>
              Unique adventures crafted by passionate local experts around the world
            </p>
          </div>

          {/* Advanced Search */}
          <AdvancedSearch tours={tours} />
        </div>
      </div>

      {/* Filters & Results */}
      <div style={{
        background: 'var(--color-neutral-50)',
        borderBottom: '1px solid var(--color-neutral-200)',
        padding: '20px 0'
      }}>
        <div className="container">
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: '16px'
          }}>
            <h2 style={{
              fontSize: '28px',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              color: 'var(--color-primary)',
              margin: 0
            }}>
              {filteredTours.length > 0 ? `${filteredTours.length} Experience${filteredTours.length !== 1 ? 's' : ''}` : 'No experiences found'}
              {activeFilter !== 'All' && (
                <span style={{
                  fontSize: '16px',
                  fontWeight: '500',
                  color: 'var(--color-neutral-600)',
                  marginLeft: '8px',
                  fontFamily: 'var(--font-primary)'
                }}>
                  · {activeFilter}
                </span>
              )}
            </h2>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px'
            }}>
              <InteractiveButton
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 16px',
                  border: '1px solid var(--color-neutral-300)',
                  borderRadius: '12px',
                  background: 'white',
                  fontSize: '14px',
                  fontWeight: '500',
                  cursor: 'pointer',
                  fontFamily: 'var(--font-primary)',
                  transition: 'all 0.2s ease'
                }}
                hoverStyle={{
                  borderColor: 'var(--color-brand)',
                  background: 'var(--color-neutral-50)'
                }}
              >
                Sort by: Featured
                <ChevronDown size={16} />
              </InteractiveButton>
              <div style={{
                display: 'flex',
                background: 'white',
                borderRadius: '12px',
                border: '1px solid var(--color-neutral-300)',
                overflow: 'hidden'
              }}>
                <button
                  onClick={() => setViewMode('grid')}
                  style={{
                    padding: '12px',
                    border: 'none',
                    background: viewMode === 'grid' ? 'var(--color-brand)' : 'white',
                    color: viewMode === 'grid' ? 'white' : 'var(--color-neutral-500)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <Grid3X3 size={16} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  style={{
                    padding: '12px',
                    border: 'none',
                    background: viewMode === 'list' ? 'var(--color-brand)' : 'white',
                    color: viewMode === 'list' ? 'white' : 'var(--color-neutral-500)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <List size={16} />
                </button>
              </div>
            </div>
          </div>

          {/* Enhanced Quick Filters */}
          <div style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            paddingBottom: '8px',
            paddingRight: '8px'
          }}>
            <InteractiveButton
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 20px',
                border: '1px solid var(--color-neutral-300)',
                borderRadius: '50px',
                background: 'white',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                whiteSpace: 'nowrap',
                fontFamily: 'var(--font-primary)',
                transition: 'all 0.2s ease',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)'
              }}
              hoverStyle={{
                borderColor: 'var(--color-brand)',
                background: 'var(--color-neutral-50)'
              }}
            >
              <Sliders size={16} style={{ color: 'var(--color-brand)' }} />
              All Filters
            </InteractiveButton>
            {filterCategories.map((filter) => (
              <button
                key={filter.label}
                onClick={() => setActiveFilter(filter.label)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 20px',
                  border: activeFilter === filter.label ? 'none' : '1px solid var(--color-neutral-300)',
                  borderRadius: '50px',
                  background: activeFilter === filter.label ? 'var(--color-brand-gradient)' : 'white',
                  color: activeFilter === filter.label ? 'white' : 'var(--color-neutral-700)',
                  fontSize: '14px',
                  fontWeight: activeFilter === filter.label ? '600' : '500',
                  cursor: 'pointer',
                  whiteSpace: 'nowrap',
                  fontFamily: 'var(--font-primary)',
                  transition: 'all 0.2s ease',
                  boxShadow: activeFilter === filter.label ? '0 4px 16px rgba(5, 150, 105, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.04)'
                }}
                onMouseEnter={(e) => {
                  if (activeFilter !== filter.label) {
                    e.currentTarget.style.borderColor = 'var(--color-brand)'
                    e.currentTarget.style.background = 'var(--color-neutral-50)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (activeFilter !== filter.label) {
                    e.currentTarget.style.borderColor = 'var(--color-neutral-300)'
                    e.currentTarget.style.background = 'white'
                  }
                }}
              >
                <span>{filter.label}</span>
                {filter.count > 0 && (
                  <span style={{
                    background: activeFilter === filter.label ? 'rgba(255, 255, 255, 0.2)' : 'var(--color-brand-gradient)',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '700',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    {filter.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div style={{
        background: 'white',
        minHeight: '60vh',
        padding: '40px 0'
      }}>
        <div className="container">
          <ToursGrid
            tours={filteredTours}
            currentPage={page}
            totalPages={totalPages}
            baseUrl="/conquistatour"
            viewMode={viewMode}
          />
        </div>
      </div>
    </>
  )
}

function InteractiveButton({
  children,
  style,
  hoverStyle = {},
  ...props
}: {
  children: React.ReactNode
  style: React.CSSProperties
  hoverStyle?: React.CSSProperties
  [key: string]: any
}) {
  return (
    <button
      style={style}
      onMouseEnter={(e) => {
        Object.assign(e.currentTarget.style, hoverStyle)
      }}
      onMouseLeave={(e) => {
        Object.assign(e.currentTarget.style, style)
      }}
      {...props}
    >
      {children}
    </button>
  )
}