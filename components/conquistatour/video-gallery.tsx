'use client'

import { useState, useRef } from 'react'
import { Play, Pause, Volume2, VolumeX, X, SkipBack, SkipForward } from 'lucide-react'

interface VideoGalleryProps {
  tour: {
    id: string
    title: string
    slug: string
  }
}

interface VideoItem {
  id: string
  title: string
  thumbnail: string
  videoUrl: string
  duration: string
  description: string
}

export function VideoGallery({ tour }: VideoGalleryProps) {
  const [selectedVideo, setSelectedVideo] = useState<VideoItem | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [showFullScreen, setShowFullScreen] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)

  // Video content for each tour (would come from database in production)
  const getVideosForTour = (slug: string): VideoItem[] => {
    const videoLibrary: Record<string, VideoItem[]> = {
      'hidden-rome-walking-tour': [
        {
          id: '1',
          title: 'Ancient Rome Experience Preview',
          thumbnail: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789123', // Sample Vimeo URL
          duration: '2:34',
          description: 'Explore the hidden corners of ancient Rome with our expert guides'
        },
        {
          id: '2',
          title: 'Cooking with Roman Chefs',
          thumbnail: 'https://images.unsplash.com/photo-1534612899740-55c821a90129?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789124',
          duration: '3:12',
          description: 'Learn traditional Roman cooking techniques from local masters'
        },
        {
          id: '3',
          title: 'Rome After Dark',
          thumbnail: 'https://images.unsplash.com/photo-1531572753322-ad063cecc140?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789125',
          duration: '1:58',
          description: 'Experience the magic of Rome illuminated at night'
        }
      ],
      'tokyo-street-photography-experience': [
        {
          id: '4',
          title: 'Tokyo Photography Masterclass',
          thumbnail: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789126',
          duration: '4:22',
          description: 'Master the art of street photography in Tokyo\'s vibrant districts'
        },
        {
          id: '5',
          title: 'Traditional Tea Ceremony',
          thumbnail: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789127',
          duration: '2:45',
          description: 'Participate in an authentic Japanese tea ceremony'
        },
        {
          id: '6',
          title: 'Neon Nights Photography',
          thumbnail: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789128',
          duration: '3:15',
          description: 'Capture Tokyo\'s incredible neon-lit streetscapes'
        }
      ],
      'barcelona-architecture-tour': [
        {
          id: '7',
          title: 'Gaudí\'s Architectural Genius',
          thumbnail: 'https://images.unsplash.com/photo-1539037116277-4db20889f2d4?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789129',
          duration: '3:45',
          description: 'Discover the secrets behind Gaudí\'s revolutionary designs'
        },
        {
          id: '8',
          title: 'Catalan Culinary Traditions',
          thumbnail: 'https://images.unsplash.com/photo-1556909114-2e2a9644e664?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789130',
          duration: '2:28',
          description: 'Taste authentic Catalan dishes with local food artisans'
        }
      ],
      'croatia-culinary-conquest-taste-of-the-adriatic': [
        {
          id: '9',
          title: 'Croatian Coastal Adventure',
          thumbnail: 'https://images.unsplash.com/photo-1555990538-d837cc704d80?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789131',
          duration: '5:12',
          description: 'Sail along Croatia\'s stunning Adriatic coastline'
        },
        {
          id: '10',
          title: 'Traditional Croatian Cooking',
          thumbnail: 'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=800&auto=format&fit=crop',
          videoUrl: 'https://player.vimeo.com/video/456789132',
          duration: '4:03',
          description: 'Learn time-honored Croatian culinary techniques'
        }
      ]
    }

    return videoLibrary[slug] || []
  }

  const videos = getVideosForTour(tour.slug)

  const handleVideoPlay = (video: VideoItem) => {
    setSelectedVideo(video)
    setShowFullScreen(true)
    setIsPlaying(true)
  }

  const togglePlay = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      setIsPlaying(!isPlaying)
    }
  }

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  const closeVideo = () => {
    setShowFullScreen(false)
    setSelectedVideo(null)
    setIsPlaying(false)
  }

  if (videos.length === 0) {
    return null
  }

  return (
    <>
      {/* Video Gallery Section */}
      <div style={{
        padding: '64px 0',
        background: 'linear-gradient(135deg, #000000 0%, #1a1a1a 100%)'
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
              color: 'white',
              lineHeight: '1.2',
              marginBottom: '16px',
              letterSpacing: '-0.02em'
            }}>
              Experience Preview
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.8)',
              lineHeight: '1.6',
              maxWidth: '600px',
              margin: '0 auto',
              fontFamily: 'var(--font-primary)'
            }}>
              Get a glimpse of the incredible experiences waiting for you on this journey
            </p>
          </div>

          {/* Video Grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: '32px'
          }}>
            {videos.map((video, index) => (
              <div
                key={video.id}
                style={{
                  position: 'relative',
                  borderRadius: '20px',
                  overflow: 'hidden',
                  cursor: 'pointer',
                  transition: 'all 0.4s ease',
                  background: 'rgba(255, 255, 255, 0.05)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(255, 255, 255, 0.1)'
                }}
                onClick={() => handleVideoPlay(video)}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-8px)'
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.3)'
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)'
                  e.currentTarget.style.boxShadow = 'none'
                }}
              >
                {/* Video Thumbnail */}
                <div style={{
                  position: 'relative',
                  aspectRatio: '16/9',
                  backgroundImage: `url(${video.thumbnail})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center'
                }}>
                  {/* Play Button Overlay */}
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'rgba(0, 0, 0, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.3s ease'
                  }}>
                    <div style={{
                      background: 'rgba(255, 255, 255, 0.9)',
                      borderRadius: '50%',
                      width: '64px',
                      height: '64px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s ease'
                    }}>
                      <Play size={24} style={{ color: '#000', marginLeft: '2px' }} />
                    </div>
                  </div>

                  {/* Duration Badge */}
                  <div style={{
                    position: 'absolute',
                    bottom: '12px',
                    right: '12px',
                    background: 'rgba(0, 0, 0, 0.8)',
                    color: 'white',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: '600',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    {video.duration}
                  </div>
                </div>

                {/* Video Info */}
                <div style={{ padding: '20px' }}>
                  <h3 style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    color: 'white',
                    marginBottom: '8px',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    {video.title}
                  </h3>
                  <p style={{
                    fontSize: '14px',
                    color: 'rgba(255, 255, 255, 0.7)',
                    lineHeight: '1.5',
                    fontFamily: 'var(--font-primary)'
                  }}>
                    {video.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Full Screen Video Modal */}
      {showFullScreen && selectedVideo && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.95)',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Video Header */}
          <div style={{
            padding: '20px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between'
          }}>
            <div style={{
              color: 'white',
              fontSize: '18px',
              fontWeight: '600',
              fontFamily: 'var(--font-primary)'
            }}>
              {selectedVideo.title}
            </div>
            <button
              onClick={closeVideo}
              style={{
                background: 'none',
                border: 'none',
                color: 'white',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '8px'
              }}
            >
              <X size={24} />
            </button>
          </div>

          {/* Video Player */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}>
            <div style={{
              position: 'relative',
              maxWidth: '90vw',
              maxHeight: '80vh',
              aspectRatio: '16/9',
              background: '#000',
              borderRadius: '12px',
              overflow: 'hidden'
            }}>
              {/* Placeholder for video - in production, this would be an actual video player */}
              <div style={{
                width: '100%',
                height: '100%',
                background: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${selectedVideo.thumbnail})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '18px',
                color: 'white',
                fontFamily: 'var(--font-primary)'
              }}>
                Video Player Placeholder
                <br />
                <span style={{ fontSize: '14px', opacity: 0.7 }}>
                  In production, this would embed the actual video from {selectedVideo.videoUrl}
                </span>
              </div>

              {/* Video Controls */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.8))',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '16px'
              }}>
                <button
                  onClick={togglePlay}
                  style={{
                    background: 'rgba(255, 255, 255, 0.2)',
                    border: 'none',
                    borderRadius: '50%',
                    width: '48px',
                    height: '48px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: 'white'
                  }}
                >
                  {isPlaying ? <Pause size={20} /> : <Play size={20} />}
                </button>

                <button
                  onClick={toggleMute}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'white',
                    cursor: 'pointer',
                    padding: '8px'
                  }}
                >
                  {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                </button>

                <div style={{
                  flex: 1,
                  height: '4px',
                  background: 'rgba(255, 255, 255, 0.3)',
                  borderRadius: '2px',
                  position: 'relative'
                }}>
                  <div style={{
                    position: 'absolute',
                    left: 0,
                    top: 0,
                    height: '100%',
                    width: '30%',
                    background: 'white',
                    borderRadius: '2px'
                  }} />
                </div>

                <span style={{
                  color: 'white',
                  fontSize: '14px',
                  fontFamily: 'var(--font-primary)'
                }}>
                  {selectedVideo.duration}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}