const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateRealisticPricing() {
  try {
    console.log('🔄 Updating tour prices to realistic luxury group tour pricing...')

    // Update Hidden Rome Walking Tour (1 day) - Premium day experience
    await prisma.conquistaTour.update({
      where: { slug: 'hidden-rome-walking-tour' },
      data: {
        pricePerPerson: 18500, // $185 - Premium guided walking tour with exclusive access
        description: 'Step off the beaten path and explore Rome like a local with exclusive access to hidden sites most tourists never see. This intimate walking tour reveals secret courtyards, underground ruins, and private collections, led by a native Roman historian with special permissions to restricted areas.',
      }
    })

    // Update Tokyo Street Photography (1 day) - Professional workshop experience
    await prisma.conquistaTour.update({
      where: { slug: 'tokyo-street-photography-experience' },
      data: {
        pricePerPerson: 24500, // $245 - Professional photography mentorship
        description: 'Join an award-winning professional photographer for an intensive street photography masterclass through Tokyo\'s most photogenic neighborhoods. Learn advanced techniques while discovering hidden alleys and authentic moments, with personalized instruction and portfolio review.',
      }
    })

    // Update Barcelona Architecture Tour (1 day) - Expert architectural experience
    await prisma.conquistaTour.update({
      where: { slug: 'barcelona-architecture-tour' },
      data: {
        pricePerPerson: 21500, // $215 - Licensed architect-led tour with exclusive access
        description: 'Discover Barcelona\'s architectural masterpieces with a licensed architect guide who provides exclusive insights into Gaudí\'s techniques and Modernisme movement. Includes special access to restricted areas and private architectural collections.',
      }
    })

    // Croatia stays the same as it's already realistically priced for a 10-day luxury tour
    console.log('✅ Croatia tour already has realistic pricing ($3,450 for 10 days)')

    console.log('✅ Successfully updated all tour prices to realistic luxury levels!')
    console.log('')
    console.log('📊 New pricing structure:')
    console.log('- Hidden Rome Walking Tour: $185 (Premium day experience)')
    console.log('- Tokyo Street Photography: $245 (Professional workshop)')
    console.log('- Barcelona Architecture: $215 (Expert architectural tour)')
    console.log('- Croatia Culinary Conquest: $3,450 (10-day luxury expedition)')
    console.log('')
    console.log('💡 These prices reflect realistic luxury group tour market rates:')
    console.log('- Day experiences: $150-$300 (Premium guided tours)')
    console.log('- Multi-day tours: $300-$600 per day (Luxury small groups)')
    console.log('- Expedition tours: $400-$800 per day (Ultra-luxury experiences)')

  } catch (error) {
    console.error('❌ Error updating pricing:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateRealisticPricing()