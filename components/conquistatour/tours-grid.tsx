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
      <div className="text-center py-16">
        <div className="bg-gray-50 rounded-2xl p-12">
          <h3 className="heading-lg text-gray-600 mb-4">No experiences found</h3>
          <p className="body-base text-gray-600 mb-6">
            Try adjusting your filters or search terms to find more experiences.
          </p>
          <Link href="/conquistatour" className="btn btn-primary btn-md">
            View all experiences
          </Link>
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Experiences Grid */}
      <div className="grid-auto mb-16">
        {tours.map((tour, index) => (
          <ConquistaTourCard key={tour.id} tour={tour} index={index} />
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          {currentPage > 1 && (
            <Button
              asChild
              variant="outline"
              size="sm"
            >
              <Link href={`${baseUrl}?page=${currentPage - 1}`}>
                <ChevronLeft className="w-4 h-4 mr-1" />
                Previous
              </Link>
            </Button>
          )}

          <div className="flex items-center space-x-1">
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

              return (
                <Button
                  key={pageNum}
                  asChild
                  variant={currentPage === pageNum ? "default" : "outline"}
                  size="sm"
                  className="min-w-[40px]"
                >
                  <Link href={`${baseUrl}?page=${pageNum}`}>
                    {pageNum}
                  </Link>
                </Button>
              )
            })}
          </div>

          {currentPage < totalPages && (
            <Button
              asChild
              variant="outline"
              size="sm"
            >
              <Link href={`${baseUrl}?page=${currentPage + 1}`}>
                Next
                <ChevronRight className="w-4 h-4 ml-1" />
              </Link>
            </Button>
          )}
        </div>
      )}
    </>
  )
}