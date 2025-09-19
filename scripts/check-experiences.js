const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

async function checkExperiences() {
  try {
    const tours = await prisma.conquistaTour.findMany({
      select: {
        title: true,
        pricePerPerson: true,
        status: true,
        featuredOrder: true
      }
    })

    console.log('Current experiences:')
    tours.forEach(tour => {
      const price = tour.pricePerPerson / 100
      console.log(`- ${tour.title} ($${price}) [${tour.status}] Order: ${tour.featuredOrder || 'none'}`)
    })
  } catch (error) {
    console.error('Error:', error)
  } finally {
    await prisma.$disconnect()
  }
}

checkExperiences()