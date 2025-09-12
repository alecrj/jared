'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { 
  CheckCircle,
  User,
  ChefHat,
  FileText,
  Award
} from 'lucide-react'

const applicationSchema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  email: z.string().email('Valid email is required'),
  phone: z.string().min(1, 'Phone number is required'),
  displayName: z.string().min(1, 'Display name is required'),
  bio: z.string().min(50, 'Bio must be at least 50 characters'),
  culinaryBackground: z.string().min(100, 'Please provide detailed culinary background (minimum 100 characters)'),
  culinaryExperience: z.string().min(100, 'Please describe your culinary experience in detail (minimum 100 characters)'),
  previousTours: z.string().optional(),
  languages: z.string().min(1, 'Languages spoken are required'),
  location: z.string().min(1, 'Location is required'),
  availability: z.string().min(1, 'Availability information is required'),
  motivation: z.string().min(100, 'Please explain your motivation in detail (minimum 100 characters)'),
  specialties: z.array(z.string()).min(1, 'Please select at least one specialty'),
  hasBusinessLicense: z.boolean().optional(),
  hasInsurance: z.boolean().optional(),
  socialLinks: z.object({
    instagram: z.string().optional(),
    facebook: z.string().optional(),
    website: z.string().optional(),
    blog: z.string().optional()
  }).optional()
})

type ApplicationForm = z.infer<typeof applicationSchema>

const culinarySpecialties = [
  'Italian Cuisine', 'French Cuisine', 'Japanese Cuisine', 'Mexican Cuisine',
  'Thai Cuisine', 'Indian Cuisine', 'Chinese Cuisine', 'Mediterranean',
  'American BBQ', 'Spanish Cuisine', 'Korean Cuisine', 'Vietnamese Cuisine',
  'Middle Eastern', 'Greek Cuisine', 'German Cuisine', 'Brazilian Cuisine',
  'Wine & Spirits', 'Pastry & Desserts', 'Street Food', 'Farm to Table',
  'Vegetarian/Vegan', 'Seafood Specialist', 'Spice Expert', 'Craft Beer'
]

export function LeaderApplicationForm() {
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch
  } = useForm<ApplicationForm>({
    resolver: zodResolver(applicationSchema)
  })

  const toggleSpecialty = (specialty: string) => {
    const updated = selectedSpecialties.includes(specialty)
      ? selectedSpecialties.filter(s => s !== specialty)
      : [...selectedSpecialties, specialty]
    
    setSelectedSpecialties(updated)
    setValue('specialties', updated)
  }

  const onSubmit = async (data: ApplicationForm) => {
    setIsSubmitting(true)
    
    // Simulate API submission
    await new Promise(resolve => setTimeout(resolve, 2000))
    
    console.log('Application submitted:', data)
    setSubmitted(true)
    setIsSubmitting(false)
  }

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Culinary Background', icon: ChefHat },
    { id: 3, title: 'Experience & Specialties', icon: Award },
    { id: 4, title: 'Additional Details', icon: FileText }
  ]

  if (submitted) {
    return (
      <div className="text-center py-16">
        <Card className="max-w-2xl mx-auto border-0 shadow-lg">
          <CardContent className="p-12">
            <div className="w-20 h-20 bg-[#FF5A5F] rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-display-medium text-[#222222] mb-4">Application submitted!</h2>
            <p className="text-body-large text-[#717171] mb-6">
              Thank you for your interest in hosting experiences with Conquistador. 
              We'll review your application and get back to you within 3-5 business days.
            </p>
            <p className="text-body text-[#717171] mb-8">
              You'll receive a confirmation email shortly with next steps.
            </p>
            <Button size="lg" onClick={() => window.location.href = '/'}>
              Return to homepage
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Steps - Airbnb Style */}
      <div className="mb-12">
        <div className="flex items-center justify-between mb-6">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center justify-center w-10 h-10 rounded-full ${
                  currentStep >= step.id 
                    ? 'bg-[#FF5A5F] text-white' 
                    : 'bg-[#F7F7F7] text-[#717171]'
                }`}>
                  <Icon className="w-5 h-5" />
                </div>
                <div className={`ml-3 ${currentStep >= step.id ? 'text-[#222222]' : 'text-[#717171]'}`}>
                  <p className="text-caption font-medium">{step.title}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-0.5 mx-4 ${
                    currentStep > step.id ? 'bg-[#FF5A5F]' : 'bg-[#EBEBEB]'
                  }`} />
                )}
              </div>
            )
          })}
        </div>
        <div className="w-full bg-[#EBEBEB] rounded-full h-1">
          <div 
            className="bg-[#FF5A5F] h-1 rounded-full transition-all duration-300"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <Card className="border-0 shadow-sm">
          <CardContent className="p-8">
            {currentStep === 1 && (
              <div className="space-y-6">
                <h3 className="text-heading-2 text-[#222222] mb-6">Personal information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-body font-medium text-[#222222] mb-2">First name *</label>
                    <input
                      {...register('firstName')}
                      className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                      placeholder="Your first name"
                    />
                    {errors.firstName && (
                      <p className="text-[#FF5A5F] text-caption mt-1">{errors.firstName.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-body font-medium text-[#222222] mb-2">Last name *</label>
                    <input
                      {...register('lastName')}
                      className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                      placeholder="Your last name"
                    />
                    {errors.lastName && (
                      <p className="text-[#FF5A5F] text-caption mt-1">{errors.lastName.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-2">Display name *</label>
                  <input
                    {...register('displayName')}
                    className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                    placeholder="How you'd like to be known to travelers (e.g., 'Chef Maria', 'Giovanni the Foodie')"
                  />
                  {errors.displayName && (
                    <p className="text-[#FF5A5F] text-caption mt-1">{errors.displayName.message}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-body font-medium text-[#222222] mb-2">Email *</label>
                    <input
                      {...register('email')}
                      type="email"
                      className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                      placeholder="your@email.com"
                    />
                    {errors.email && (
                      <p className="text-[#FF5A5F] text-caption mt-1">{errors.email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="block text-body font-medium text-[#222222] mb-2">Phone *</label>
                    <input
                      {...register('phone')}
                      className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                      placeholder="+1 (555) 123-4567"
                    />
                    {errors.phone && (
                      <p className="text-[#FF5A5F] text-caption mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-2">Location *</label>
                  <input
                    {...register('location')}
                    className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                    placeholder="City, Country where you'll host experiences"
                  />
                  {errors.location && (
                    <p className="text-[#FF5A5F] text-caption mt-1">{errors.location.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-2">Personal bio *</label>
                  <textarea
                    {...register('bio')}
                    rows={4}
                    className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171] resize-none"
                    placeholder="Tell travelers about yourself, your passion for food, and what makes you unique..."
                  />
                  {errors.bio && (
                    <p className="text-[#FF5A5F] text-caption mt-1">{errors.bio.message}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-6">
                <h3 className="text-heading-2 text-[#222222] mb-6">Culinary background</h3>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-2">Culinary background *</label>
                  <textarea
                    {...register('culinaryBackground')}
                    rows={5}
                    className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171] resize-none"
                    placeholder="Describe your culinary training, education, family traditions, or professional background..."
                  />
                  {errors.culinaryBackground && (
                    <p className="text-[#FF5A5F] text-caption mt-1">{errors.culinaryBackground.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-2">Culinary experience *</label>
                  <textarea
                    {...register('culinaryExperience')}
                    rows={5}
                    className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171] resize-none"
                    placeholder="Detail your hands-on experience: restaurants worked, dishes mastered, teaching experience, food blogging, etc."
                  />
                  {errors.culinaryExperience && (
                    <p className="text-[#FF5A5F] text-caption mt-1">{errors.culinaryExperience.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-2">Previous tour/teaching experience</label>
                  <textarea
                    {...register('previousTours')}
                    rows={4}
                    className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171] resize-none"
                    placeholder="Any experience leading food tours, cooking classes, workshops, or guiding groups? (Optional but helpful)"
                  />
                </div>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-2">Languages spoken *</label>
                  <input
                    {...register('languages')}
                    className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                    placeholder="e.g., English (native), Spanish (fluent), Italian (conversational)"
                  />
                  {errors.languages && (
                    <p className="text-[#FF5A5F] text-caption mt-1">{errors.languages.message}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-6">
                <h3 className="text-heading-2 text-[#222222] mb-6">Specialties & motivation</h3>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-4">Culinary specialties * (Select at least one)</label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {culinarySpecialties.map((specialty) => (
                      <Badge
                        key={specialty}
                        variant={selectedSpecialties.includes(specialty) ? "default" : "outline"}
                        className={`cursor-pointer text-center p-3 transition-colors ${
                          selectedSpecialties.includes(specialty)
                            ? 'bg-[#FF5A5F] text-white hover:bg-[#E34850] border-[#FF5A5F]'
                            : 'hover:bg-[#F7F7F7] border-[#B0B0B0] text-[#222222]'
                        }`}
                        onClick={() => toggleSpecialty(specialty)}
                      >
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                  {errors.specialties && (
                    <p className="text-[#FF5A5F] text-caption mt-1">{errors.specialties.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-2">Why do you want to host culinary experiences? *</label>
                  <textarea
                    {...register('motivation')}
                    rows={5}
                    className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171] resize-none"
                    placeholder="Share your passion for food, culture, and helping others explore. What unique experiences can you offer?"
                  />
                  {errors.motivation && (
                    <p className="text-[#FF5A5F] text-caption mt-1">{errors.motivation.message}</p>
                  )}
                </div>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-2">Availability *</label>
                  <textarea
                    {...register('availability')}
                    rows={3}
                    className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171] resize-none"
                    placeholder="When are you typically available to host experiences? (e.g., weekends, specific months, flexible schedule)"
                  />
                  {errors.availability && (
                    <p className="text-[#FF5A5F] text-caption mt-1">{errors.availability.message}</p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-6">
                <h3 className="text-heading-2 text-[#222222] mb-6">Additional information</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex items-center space-x-3">
                    <input
                      {...register('hasBusinessLicense')}
                      type="checkbox"
                      id="businessLicense"
                      className="w-4 h-4 text-[#FF5A5F] border-[#B0B0B0] rounded focus:ring-[#FF5A5F]"
                    />
                    <label htmlFor="businessLicense" className="text-body font-medium text-[#222222]">
                      I have a business license or permit for food/tourism activities
                    </label>
                  </div>

                  <div className="flex items-center space-x-3">
                    <input
                      {...register('hasInsurance')}
                      type="checkbox"
                      id="insurance"
                      className="w-4 h-4 text-[#FF5A5F] border-[#B0B0B0] rounded focus:ring-[#FF5A5F]"
                    />
                    <label htmlFor="insurance" className="text-body font-medium text-[#222222]">
                      I have liability insurance for hosting activities
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-body font-medium text-[#222222] mb-4">Social media & online presence (Optional)</label>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <input
                        {...register('socialLinks.instagram')}
                        className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                        placeholder="Instagram handle or URL"
                      />
                    </div>
                    <div>
                      <input
                        {...register('socialLinks.facebook')}
                        className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                        placeholder="Facebook page URL"
                      />
                    </div>
                    <div>
                      <input
                        {...register('socialLinks.website')}
                        className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                        placeholder="Personal website URL"
                      />
                    </div>
                    <div>
                      <input
                        {...register('socialLinks.blog')}
                        className="w-full p-3 border border-[#B0B0B0] rounded-lg focus:ring-2 focus:ring-[#FF5A5F] focus:border-[#FF5A5F] text-[#222222] placeholder-[#717171]"
                        placeholder="Food blog URL"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-[#F7F7F7] p-6 rounded-lg">
                  <h4 className="text-heading-3 text-[#222222] mb-3">Application review process</h4>
                  <ul className="text-body text-[#717171] space-y-2">
                    <li>• We review all applications within 3-5 business days</li>
                    <li>• You'll receive an email confirmation with your application status</li>
                    <li>• Approved hosts can immediately start creating experiences</li>
                    <li>• We provide full onboarding support and platform training</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8 pt-6 border-t border-[#EBEBEB]">
              <Button
                type="button"
                variant="outline"
                onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
                disabled={currentStep === 1}
              >
                Previous
              </Button>

              {currentStep < 4 ? (
                <Button
                  type="button"
                  onClick={() => setCurrentStep(Math.min(4, currentStep + 1))}
                >
                  Next step
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="min-w-[150px]"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit application'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  )
}