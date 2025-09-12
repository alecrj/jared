'use client'

import { useState } from 'react'
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

export default function LeaderApplyPage() {
  const [showForm, setShowForm] = useState(false)

  return (
    <div className="min-h-screen bg-white">
      <div className="container-airbnb">
        {!showForm ? (
          <>
            {/* Hero Section - Airbnb Style */}
            <div className="space-section text-center">
              <div className="max-w-4xl mx-auto">
                <h1 className="text-display-large text-[#222222] mb-6">
                  Create unique experiences
                </h1>
                <p className="text-body-large text-[#717171] max-w-2xl mx-auto mb-8">
                  Share your passion and local knowledge. Earn 5% commission plus a complimentary 
                  spot on every experience you create.
                </p>
                <div className="bg-[#F7F7F7] rounded-2xl p-8 text-left max-w-lg mx-auto">
                  <h3 className="text-heading-3 text-[#222222] mb-4">What you'll earn</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <DollarSign className="w-5 h-5 text-[#FF5A5F] mr-3" />
                      <span className="text-body text-[#222222]">5% commission on every booking</span>
                    </div>
                    <div className="flex items-center">
                      <Heart className="w-5 h-5 text-[#FF5A5F] mr-3" />
                      <span className="text-body text-[#222222]">Free participation in experiences you create</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits Section - Airbnb Style */}
            <section className="space-section bg-[#F7F7F7]">
              <div className="text-center mb-12">
                <h2 className="text-display-medium text-[#222222] mb-4">
                  Why host with Conquistador?
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FF5A5F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Globe className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-heading-3 text-[#222222] mb-2">Global reach</h3>
                  <p className="text-body text-[#717171]">
                    Connect with food enthusiasts from around the world through our platform
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FF5A5F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-heading-3 text-[#222222] mb-2">Full support</h3>
                  <p className="text-body text-[#717171]">
                    Marketing assistance, booking management, and 24/7 platform support
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FF5A5F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-heading-3 text-[#222222] mb-2">Easy to start</h3>
                  <p className="text-body text-[#717171]">
                    Simple application process and intuitive experience creation tools
                  </p>
                </div>
              </div>
            </section>

            {/* Requirements Section - Clean */}
            <section className="space-section bg-white">
              <div className="text-center mb-12">
                <h2 className="text-display-medium text-[#222222] mb-4">
                  Who can host?
                </h2>
                <p className="text-body-large text-[#717171] max-w-2xl mx-auto">
                  We're looking for passionate food enthusiasts who love sharing their culture
                </p>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
                <div>
                  <h3 className="text-heading-2 text-[#222222] mb-6">Perfect hosts</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#FF5A5F] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-body text-[#222222]">Food enthusiasts with local knowledge</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#FF5A5F] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-body text-[#222222]">Professional chefs or culinary students</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#FF5A5F] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-body text-[#222222]">Food bloggers and content creators</span>
                    </div>
                    <div className="flex items-start">
                      <CheckCircle className="w-5 h-5 text-[#FF5A5F] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-body text-[#222222]">Local food tour guides</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-heading-2 text-[#222222] mb-6">What we look for</h3>
                  <div className="space-y-4">
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#FF5A5F] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-body text-[#222222]">Passion for food and cultural sharing</span>
                    </div>
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#FF5A5F] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-body text-[#222222]">Strong communication skills</span>
                    </div>
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#FF5A5F] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-body text-[#222222]">Local connections and knowledge</span>
                    </div>
                    <div className="flex items-start">
                      <Star className="w-5 h-5 text-[#FF5A5F] mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-body text-[#222222]">Commitment to great experiences</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Process Section */}
            <section className="space-section bg-[#F7F7F7]">
              <div className="text-center mb-12">
                <h2 className="text-display-medium text-[#222222] mb-4">
                  How it works
                </h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FF5A5F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold">1</span>
                  </div>
                  <h3 className="text-heading-3 text-[#222222] mb-2">Apply</h3>
                  <p className="text-body text-[#717171]">
                    Tell us about your culinary background and passion for food
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FF5A5F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold">2</span>
                  </div>
                  <h3 className="text-heading-3 text-[#222222] mb-2">Review</h3>
                  <p className="text-body text-[#717171]">
                    We'll review your application within 3-5 business days
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-12 h-12 bg-[#FF5A5F] rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-white font-semibold">3</span>
                  </div>
                  <h3 className="text-heading-3 text-[#222222] mb-2">Start hosting</h3>
                  <p className="text-body text-[#717171]">
                    Create your first experience and start earning with every booking
                  </p>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="space-section bg-white text-center">
              <div className="max-w-2xl mx-auto">
                <h2 className="text-display-medium text-[#222222] mb-4">
                  Ready to get started?
                </h2>
                <p className="text-body-large text-[#717171] mb-8">
                  Join our community of food enthusiasts sharing authentic culinary experiences
                </p>
                <Button
                  onClick={() => setShowForm(true)}
                  size="lg"
                  className="min-w-[200px]"
                >
                  Apply to host
                </Button>
                <p className="text-caption text-[#717171] mt-4">
                  Application takes about 10 minutes
                </p>
              </div>
            </section>
          </>
        ) : (
          <div className="space-section">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-display-large text-[#222222] mb-4">Host application</h1>
                <p className="text-body-large text-[#717171]">
                  Tell us about your culinary passion and experience
                </p>
              </div>
              <LeaderApplicationForm />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}