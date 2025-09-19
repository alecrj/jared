const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateMinimumPricing() {
  try {
    console.log('🔄 Updating all tours to $800+ minimum pricing...')

    // Update Rome Tour - 3 days minimum
    await prisma.conquistaTour.update({
      where: { slug: 'hidden-rome-walking-tour' },
      data: {
        title: 'Roman Heritage & Culinary Discovery',
        duration: 3,
        pricePerPerson: 129500, // $1,295 for 3 days
        description: 'Immerse yourself in Rome\'s ancient heritage and vibrant culinary scene over three unforgettable days. Explore hidden archaeological sites, learn traditional cooking techniques from local chefs, and discover the authentic flavors that have shaped Roman cuisine for millennia.',
        tagline: 'Three days exploring Rome\'s culinary soul and ancient mysteries'
      }
    })

    // Update Tokyo Tour - 4 days minimum
    await prisma.conquistaTour.update({
      where: { slug: 'tokyo-street-photography-experience' },
      data: {
        title: 'Tokyo Cultural Immersion & Photography',
        duration: 4,
        pricePerPerson: 168500, // $1,685 for 4 days
        description: 'Capture the essence of modern Japan through the lens while experiencing authentic Tokyo culture. This four-day journey combines professional photography instruction with deep cultural immersion, including tea ceremonies, traditional markets, and exclusive access to hidden neighborhoods.',
        tagline: 'Four days capturing Tokyo\'s soul through photography and culture'
      }
    })

    // Update Barcelona Tour - 3 days minimum
    await prisma.conquistaTour.update({
      where: { slug: 'barcelona-architecture-tour' },
      data: {
        title: 'Barcelona Architecture & Catalan Culture',
        duration: 3,
        pricePerPerson: 119500, // $1,195 for 3 days
        description: 'Discover Barcelona\'s architectural masterpieces and vibrant Catalan culture through expert-guided exploration. From Gaudí\'s iconic works to hidden Modernisme gems, experience the city\'s artistic heritage while savoring authentic Catalan cuisine and traditions.',
        tagline: 'Three days of architectural wonder and Catalan cultural immersion'
      }
    })

    // Croatia stays the same - already perfect pricing
    console.log('✅ Croatia tour pricing remains perfect at $3,450 for 10 days')

    console.log('✅ Successfully updated all tours to minimum $800+ pricing!')
    console.log('')
    console.log('📊 New premium pricing structure:')
    console.log('- Roman Heritage & Culinary: $1,295 (3 days)')
    console.log('- Tokyo Cultural & Photography: $1,685 (4 days)')
    console.log('- Barcelona Architecture & Culture: $1,195 (3 days)')
    console.log('- Croatia Culinary Conquest: $3,450 (10 days)')
    console.log('')
    console.log('💡 All tours now focus on multi-day cultural immersion experiences')
    console.log('✨ No more day trips - premium multi-day adventures only!')

  } catch (error) {
    console.error('❌ Error updating pricing:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateMinimumPricing()