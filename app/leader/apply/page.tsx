'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { 
  Globe, 
  Users, 
  Star, 
  CheckCircle,
  DollarSign,
  Heart,
  Award,
  MapPin,
  Camera,
  MessageCircle
} from 'lucide-react'
import { LeaderApplicationForm } from '@/components/leader/leader-application-form'
import NavScrollHandler from '../../components/NavScrollHandler'

export default function LeaderApplyPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <>
      <NavScrollHandler />
      
      {/* Modern Navigation */}
      <nav className="nav">
        <div className="container">
          <div className="nav-content">
            <Link href="/" className="logo">
              Conquistador
            </Link>
            <div className="nav-links">
              <Link href="/conquistatour">Experiences</Link>
              <Link href="/leader/apply">Host</Link>
              <Link href="/auth/login">Login</Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="min-h-screen" style={{ background: 'linear-gradient(135deg, #f8fafc 0%, #ffffff 100%)' }}>
        <div className="container" style={{ paddingTop: '120px' }}>
          {!showForm ? (
            <>
              {/* Hero Section - Modern Style */}
              <div className="section text-center">
                <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                  <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    marginBottom: '1.5rem',
                    letterSpacing: '-0.02em',
                    lineHeight: '1.2'
                  }}>
                    Create unique experiences
                  </h1>
                  <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-neutral-600)',
                    maxWidth: '700px',
                    margin: '0 auto 3rem',
                    lineHeight: '1.7'
                  }}>
                    Share your passion and local knowledge. Earn 5% commission plus a complimentary 
                    spot on every experience you create.
                  </p>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px) saturate(150%)',
                    borderRadius: '20px',
                    padding: '2rem',
                    textAlign: 'left',
                    maxWidth: '500px',
                    margin: '0 auto',
                    border: '1px solid rgba(15, 20, 25, 0.1)',
                    boxShadow: 'var(--shadow-lg)'
                  }}>
                    <h3 style={{
                      fontSize: '1.3rem',
                      fontWeight: '600',
                      color: 'var(--color-primary)',
                      marginBottom: '1.5rem'
                    }}>
                      What you'll earn
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <DollarSign className="w-5 h-5 mr-3" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          5% commission on every booking
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center' }}>
                        <Heart className="w-5 h-5 mr-3" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          Free participation in experiences you create
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Benefits Section - Modern Style */}
              <section className="section">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                  }}>
                    Why host with Conquistador?
                  </h2>
                </div>
                
                <div className="features">
                  <div className="feature">
                    <div className="feature-icon">
                      <Globe className="w-6 h-6 text-white" />
                    </div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: 'var(--color-primary)'
                    }}>
                      Global reach
                    </h3>
                    <p style={{
                      color: 'var(--color-neutral-600)',
                      textAlign: 'center',
                      lineHeight: '1.7'
                    }}>
                      Connect with travel enthusiasts from around the world through our platform
                    </p>
                  </div>
                  
                  <div className="feature">
                    <div className="feature-icon">
                      <Award className="w-6 h-6 text-white" />
                    </div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: 'var(--color-primary)'
                    }}>
                      Full support
                    </h3>
                    <p style={{
                      color: 'var(--color-neutral-600)',
                      textAlign: 'center',
                      lineHeight: '1.7'
                    }}>
                      Marketing assistance, booking management, and 24/7 platform support
                    </p>
                  </div>
                  
                  <div className="feature">
                    <div className="feature-icon">
                      <CheckCircle className="w-6 h-6 text-white" />
                    </div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: 'var(--color-primary)'
                    }}>
                      Easy to start
                    </h3>
                    <p style={{
                      color: 'var(--color-neutral-600)',
                      textAlign: 'center',
                      lineHeight: '1.7'
                    }}>
                      Simple application process and intuitive experience creation tools
                    </p>
                  </div>
                </div>
              </section>

              {/* Requirements Section - Modern */}
              <section className="section section-features">
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                  }}>
                    Who can host?
                  </h2>
                  <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-neutral-600)',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: '1.7'
                  }}>
                    We're looking for passionate locals who love sharing their culture and experiences
                  </p>
                </div>
                
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: '4rem',
                  maxWidth: '900px',
                  margin: '0 auto'
                }}>
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(15, 20, 25, 0.1)',
                    boxShadow: 'var(--shadow-md)'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: 'var(--color-primary)',
                      marginBottom: '1.5rem'
                    }}>
                      Perfect hosts
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          Travel enthusiasts with local knowledge
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          Cultural enthusiasts and local experts
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          Travel bloggers and content creators
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <CheckCircle className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          Local tour guides and experience leaders
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{
                    background: 'rgba(255, 255, 255, 0.8)',
                    backdropFilter: 'blur(20px)',
                    borderRadius: '20px',
                    padding: '2rem',
                    border: '1px solid rgba(15, 20, 25, 0.1)',
                    boxShadow: 'var(--shadow-md)'
                  }}>
                    <h3 style={{
                      fontSize: '1.5rem',
                      fontWeight: '600',
                      color: 'var(--color-primary)',
                      marginBottom: '1.5rem'
                    }}>
                      What we look for
                    </h3>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Star className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          Passion for travel and cultural sharing
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Star className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          Strong communication skills
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Star className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          Local connections and knowledge
                        </span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                        <Star className="w-5 h-5 mr-3 mt-0.5 flex-shrink-0" style={{ color: 'var(--color-accent)' }} />
                        <span style={{ fontSize: '1rem', color: 'var(--color-primary)' }}>
                          Commitment to great experiences
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>

              {/* Process Section */}
              <section className="section">
                <div style={{ 
                  textAlign: 'center', 
                  marginBottom: '3rem',
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '20px',
                  padding: '2rem',
                  maxWidth: '600px',
                  margin: '0 auto 4rem',
                  border: '1px solid rgba(15, 20, 25, 0.1)',
                  boxShadow: 'var(--shadow-md)'
                }}>
                  <h2 style={{
                    fontSize: 'clamp(2rem, 4vw, 2.5rem)',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    marginBottom: '0.5rem',
                    letterSpacing: '-0.02em'
                  }}>
                    How it works
                  </h2>
                </div>
                
                <div className="features">
                  <div className="feature">
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem',
                      boxShadow: 'var(--shadow-lg)',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: 'white'
                    }}>
                      1
                    </div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: 'var(--color-primary)'
                    }}>
                      Apply
                    </h3>
                    <p style={{
                      color: 'var(--color-neutral-600)',
                      textAlign: 'center',
                      lineHeight: '1.7'
                    }}>
                      Tell us about your travel background and passion for sharing experiences
                    </p>
                  </div>
                  
                  <div className="feature">
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem',
                      boxShadow: 'var(--shadow-lg)',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: 'white'
                    }}>
                      2
                    </div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: 'var(--color-primary)'
                    }}>
                      Review
                    </h3>
                    <p style={{
                      color: 'var(--color-neutral-600)',
                      textAlign: 'center',
                      lineHeight: '1.7'
                    }}>
                      We'll review your application within 3-5 business days
                    </p>
                  </div>
                  
                  <div className="feature">
                    <div style={{
                      width: '80px',
                      height: '80px',
                      background: 'linear-gradient(135deg, var(--color-accent) 0%, var(--color-accent-light) 100%)',
                      borderRadius: '20px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 2rem',
                      boxShadow: 'var(--shadow-lg)',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                      color: 'white'
                    }}>
                      3
                    </div>
                    <h3 style={{
                      fontSize: '1.4rem',
                      fontWeight: '600',
                      marginBottom: '1rem',
                      color: 'var(--color-primary)'
                    }}>
                      Start hosting
                    </h3>
                    <p style={{
                      color: 'var(--color-neutral-600)',
                      textAlign: 'center',
                      lineHeight: '1.7'
                    }}>
                      Create your first experience and start earning with every booking
                    </p>
                  </div>
                </div>
              </section>

              {/* CTA Section */}
              <section className="section section-cta">
                <div style={{ maxWidth: '600px', margin: '0 auto', textAlign: 'center' }}>
                  <h2 style={{ color: 'white', marginBottom: '1rem' }}>
                    Ready to get started?
                  </h2>
                  <p style={{ 
                    color: 'rgba(255, 255, 255, 0.8)', 
                    marginBottom: '2rem',
                    fontSize: '1.1rem',
                    lineHeight: '1.6'
                  }}>
                    Join our community of passionate locals sharing authentic travel experiences
                  </p>
                  <button
                    onClick={() => setShowForm(true)}
                    className="btn btn-accent"
                    style={{ marginBottom: '1rem' }}
                  >
                    Apply to host
                  </button>
                  <p style={{ 
                    fontSize: '0.875rem',
                    color: 'rgba(255, 255, 255, 0.7)'
                  }}>
                    Application takes about 10 minutes
                  </p>
                </div>
              </section>
          </>
          ) : (
            <div className="section">
              <div style={{ maxWidth: '900px', margin: '0 auto' }}>
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <h1 style={{
                    fontSize: 'clamp(2.5rem, 5vw, 3.5rem)',
                    fontWeight: '700',
                    color: 'var(--color-primary)',
                    marginBottom: '1rem',
                    letterSpacing: '-0.02em'
                  }}>
                    Host application
                  </h1>
                  <p style={{
                    fontSize: '1.2rem',
                    color: 'var(--color-neutral-600)',
                    lineHeight: '1.7'
                  }}>
                    Tell us about your passion for travel and local experiences
                  </p>
                </div>
                <LeaderApplicationForm />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}