'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { 
  MapPin, 
  Calendar, 
  Users, 
  Clock, 
  ChefHat, 
  Utensils,
  CheckCircle,
  XCircle,
  Star,
  MessageCircle
} from 'lucide-react'
import Image from 'next/image'

interface TourDetailsProps {
  tour: {
    title: string
    description: string
    location: string
    duration: number
    difficulty: string
    groupSize: number
    minAge: number
    maxAge?: number
    cuisineTypes: string
    highlights: string
    inclusions: string
    exclusions: string
    itinerary: string
    galleryImages: string
    reviews: Array<{
      id: string
      rating: number
      title?: string
      content?: string
      foodRating?: number
      guideRating?: number
      valueRating?: number
      images: string
      createdAt: Date
      traveler: {
        profile?: {
          displayName: string
          avatarUrl?: string
        }
      }
    }>
    leader: {
      profile?: {
        displayName: string
        bio?: string
        culinaryBackground?: string
        avatarUrl?: string
      }
    }
  }
}

const tabs = [
  { id: 'overview', label: 'Overview', icon: MapPin },
  { id: 'itinerary', label: 'Itinerary', icon: Calendar },
  { id: 'includes', label: 'What\'s Included', icon: CheckCircle },
  { id: 'leader', label: 'Your Guide', icon: ChefHat },
  { id: 'reviews', label: 'Reviews', icon: Star },
]

export function TourDetails({ tour }: TourDetailsProps) {
  const [activeTab, setActiveTab] = useState('overview')
  const cuisines = tour.cuisineTypes.split(',').filter(Boolean)
  const highlights = JSON.parse(tour.highlights || '[]')
  const inclusions = JSON.parse(tour.inclusions || '[]')
  const exclusions = JSON.parse(tour.exclusions || '[]')
  const itinerary = JSON.parse(tour.itinerary || '[]')
  const galleryImages = JSON.parse(tour.galleryImages || '[]')

  const averageRating = tour.reviews.length > 0 
    ? tour.reviews.reduce((acc, review) => acc + review.rating, 0) / tour.reviews.length
    : 0

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-8">
            {/* Description */}
            <div>
              <h3 className="text-heading-2 text-[#222222] mb-4">About this experience</h3>
              <p className="text-body text-[#717171] leading-relaxed">{tour.description}</p>
            </div>

            {/* Key details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Clock className="w-5 h-5 text-[#FF5A5F] mr-3" />
                        <span className="text-body font-medium text-[#222222]">Duration</span>
                      </div>
                      <span className="text-body text-[#717171]">{tour.duration} days</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-[#FF5A5F] mr-3" />
                        <span className="text-body font-medium text-[#222222]">Group size</span>
                      </div>
                      <span className="text-body text-[#717171]">Up to {tour.groupSize}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Calendar className="w-5 h-5 text-[#FF5A5F] mr-3" />
                        <span className="text-body font-medium text-[#222222]">Difficulty</span>
                      </div>
                      <span className="text-body text-[#717171]">{tour.difficulty}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <Users className="w-5 h-5 text-[#FF5A5F] mr-3" />
                        <span className="text-body font-medium text-[#222222]">Min age</span>
                      </div>
                      <span className="text-body text-[#717171]">{tour.minAge}+</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <h4 className="text-body font-semibold text-[#222222] mb-3">Cuisine types</h4>
                  <div className="flex flex-wrap gap-2">
                    {cuisines.map((cuisine) => (
                      <Badge
                        key={cuisine}
                        className="bg-[#F7F7F7] text-[#222222] border-0 hover:bg-[#EBEBEB]"
                      >
                        {cuisine.trim()}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Highlights */}
            {highlights.length > 0 && (
              <div>
                <h3 className="text-heading-2 text-[#222222] mb-4">Experience highlights</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {highlights.map((highlight: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-start space-x-3 p-4 bg-[#F7F7F7] rounded-lg"
                    >
                      <ChefHat className="w-5 h-5 text-[#FF5A5F] mt-0.5 flex-shrink-0" />
                      <span className="text-body text-[#222222]">{highlight}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Gallery */}
            {galleryImages.length > 0 && (
              <div>
                <h3 className="text-heading-2 text-[#222222] mb-4">Photos</h3>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {galleryImages.slice(0, 6).map((image: string, index: number) => (
                    <div key={index} className="aspect-square relative rounded-xl overflow-hidden">
                      <Image
                        src={image}
                        alt={`Gallery image ${index + 1}`}
                        fill
                        className="object-cover hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )

      case 'itinerary':
        return (
          <div>
            <h3 className="text-2xl font-bold mb-6 text-gray-900">Daily Itinerary</h3>
            <div className="space-y-6">
              {itinerary.map((day: any, index: number) => (
                <div
                  key={index}
                  style={{
                    opacity: 0,
                    animation: 'modernFadeIn 0.8s var(--ease-out-expo) forwards',
                    animationDelay: `${index * 0.1}s`
                  }}
                >
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center">
                        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                          {day.day}
                        </div>
                        {day.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {day.activities?.map((activity: string, actIndex: number) => (
                          <li key={actIndex} className="flex items-start">
                            <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{activity}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>
              ))}
            </div>
          </div>
        )

      case 'includes':
        return (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                <CheckCircle className="w-6 h-6 text-green-500 mr-2" />
                What's Included
              </h3>
              <ul className="space-y-3">
                {inclusions.map((inclusion: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <CheckCircle className="w-4 h-4 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{inclusion}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="text-2xl font-bold mb-4 text-gray-900 flex items-center">
                <XCircle className="w-6 h-6 text-red-500 mr-2" />
                What's Not Included
              </h3>
              <ul className="space-y-3">
                {exclusions.map((exclusion: string, index: number) => (
                  <li key={index} className="flex items-start">
                    <XCircle className="w-4 h-4 text-red-500 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-600">{exclusion}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )

      case 'leader':
        return (
          <div>
            {tour.leader.profile && (
              <Card>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-6">
                    <div className="w-24 h-24 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                      {tour.leader.profile.avatarUrl ? (
                        <Image 
                          src={tour.leader.profile.avatarUrl} 
                          alt={tour.leader.profile.displayName}
                          width={96}
                          height={96}
                          className="rounded-full"
                        />
                      ) : (
                        <span className="text-white text-2xl font-bold">
                          {tour.leader.profile.displayName.charAt(0).toUpperCase()}
                        </span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold mb-2">{tour.leader.profile.displayName}</h3>
                      {tour.leader.profile.bio && (
                        <p className="text-gray-600 mb-4 leading-relaxed">{tour.leader.profile.bio}</p>
                      )}
                      {tour.leader.profile.culinaryBackground && (
                        <div className="bg-orange-50 p-4 rounded-lg">
                          <h4 className="font-semibold mb-2 text-orange-800">Culinary Background</h4>
                          <p className="text-orange-700">{tour.leader.profile.culinaryBackground}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        )

      case 'reviews':
        return (
          <div>
            {tour.reviews.length > 0 ? (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-2xl font-bold text-gray-900">Reviews</h3>
                  <div className="flex items-center">
                    <Star className="w-6 h-6 text-yellow-400 fill-current mr-2" />
                    <span className="text-xl font-bold">{averageRating.toFixed(1)}</span>
                    <span className="text-gray-600 ml-2">({tour.reviews.length} reviews)</span>
                  </div>
                </div>
                
                <div className="space-y-6">
                  {tour.reviews.map((review) => (
                    <Card key={review.id}>
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center">
                            <div className="w-10 h-10 bg-gradient-to-r from-orange-400 to-red-500 rounded-full flex items-center justify-center mr-3">
                              {review.traveler.profile?.avatarUrl ? (
                                <Image 
                                  src={review.traveler.profile.avatarUrl} 
                                  alt={review.traveler.profile.displayName}
                                  width={40}
                                  height={40}
                                  className="rounded-full"
                                />
                              ) : (
                                <span className="text-white text-sm font-semibold">
                                  {review.traveler.profile?.displayName.charAt(0).toUpperCase() || 'A'}
                                </span>
                              )}
                            </div>
                            <div>
                              <h4 className="font-semibold">{review.traveler.profile?.displayName || 'Anonymous'}</h4>
                              <div className="flex items-center">
                                {Array.from({ length: 5 }).map((_, i) => (
                                  <Star 
                                    key={i} 
                                    className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} 
                                  />
                                ))}
                              </div>
                            </div>
                          </div>
                          <span className="text-sm text-gray-500">
                            {new Date(review.createdAt).toLocaleDateString()}
                          </span>
                        </div>
                        
                        {review.title && (
                          <h5 className="font-semibold mb-2">{review.title}</h5>
                        )}
                        
                        {review.content && (
                          <p className="text-gray-600 mb-4">{review.content}</p>
                        )}
                        
                        {(review.foodRating || review.guideRating || review.valueRating) && (
                          <div className="flex flex-wrap gap-4 text-sm">
                            {review.foodRating && (
                              <div className="flex items-center">
                                <Utensils className="w-4 h-4 text-orange-500 mr-1" />
                                <span>Food: {review.foodRating}/5</span>
                              </div>
                            )}
                            {review.guideRating && (
                              <div className="flex items-center">
                                <Users className="w-4 h-4 text-orange-500 mr-1" />
                                <span>Guide: {review.guideRating}/5</span>
                              </div>
                            )}
                            {review.valueRating && (
                              <div className="flex items-center">
                                <Star className="w-4 h-4 text-orange-500 mr-1" />
                                <span>Value: {review.valueRating}/5</span>
                              </div>
                            )}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2 text-gray-600">No reviews yet</h3>
                <p className="text-gray-500">Be the first to share your experience!</p>
              </div>
            )}
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div>
      {/* Tab navigation - Airbnb Style */}
      <div className="border-b border-[#EBEBEB] mb-8">
        <nav className="flex space-x-8 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center space-x-2 py-4 px-1 border-b-2 font-medium text-body whitespace-nowrap transition-colors ${
                  activeTab === tab.id
                    ? 'border-[#FF5A5F] text-[#FF5A5F]'
                    : 'border-transparent text-[#717171] hover:text-[#222222] hover:border-[#B0B0B0]'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            )
          })}
        </nav>
      </div>

      {/* Tab content */}
      <div>
        {renderTabContent()}
      </div>
    </div>
  )
}