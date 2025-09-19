const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function updateCroatiaImages() {
  try {
    console.log('🇭🇷 Updating Croatia tour with your uploaded images...')

    // Update Croatia Tour with the new uploaded images
    await prisma.conquistaTour.update({
      where: { slug: 'croatia-culinary-conquest-taste-of-the-adriatic' },
      data: {
        heroImages: JSON.stringify([
          '/assets/images/tours/croatia/vecteezy_dubrovnik-landscape-view_11938207.jpg', // Dubrovnik landscape
          '/assets/images/tours/croatia/vecteezy_aerial-view-of-saint-domnius-bell-tower-near-diocletian-s_69870230.jpg', // Split bell tower aerial
          'https://images.unsplash.com/photo-1516483638261-f4dbaf036963?q=80&w=2340&auto=format&fit=crop', // Croatian seafood
          'https://images.unsplash.com/photo-1513342791302-46a8a18ca9dc?q=80&w=2340&auto=format&fit=crop', // Croatian wine and olives
        ]),
        galleryImages: JSON.stringify([
          '/assets/images/tours/croatia/vecteezy_aerial-view-of-saint-domnius-bell-tower-near-diocletian-s_69870230.jpg', // Split aerial view
          '/assets/images/tours/croatia/vecteezy_dubrovnik-landscape-view_11938207.jpg', // Dubrovnik landscape
          'https://images.unsplash.com/photo-1578071421344-96b87d8c01a4?q=80&w=2340&auto=format&fit=crop', // Plitvice Lakes
          'https://images.unsplash.com/photo-1568515045052-f9a854d70bfd?q=80&w=2340&auto=format&fit=crop', // Croatian market
          'https://images.unsplash.com/photo-1531259683007-016a943cff19?q=80&w=2340&auto=format&fit=crop', // Traditional Croatian cooking
          'https://images.unsplash.com/photo-1527838832700-5059252407fa?q=80&w=2340&auto=format&fit=crop', // Croatian islands
          'https://images.unsplash.com/photo-1517400508447-f8dd518b86db?q=80&w=2340&auto=format&fit=crop', // Croatian traditional meal
        ])
      }
    })

    console.log('✅ Successfully updated Croatia tour with your beautiful images!')
    console.log('')
    console.log('📸 Your uploaded images now featured:')
    console.log('- Dubrovnik landscape view (hero image)')
    console.log('- Split bell tower aerial view (hero & gallery)')
    console.log('🎨 Combined with curated stock photos for a complete gallery')

  } catch (error) {
    console.error('❌ Error updating Croatia images:', error)
  } finally {
    await prisma.$disconnect()
  }
}

updateCroatiaImages()