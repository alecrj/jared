import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

const confirmPaymentSchema = z.object({
  paymentIntentId: z.string(),
  paymentId: z.string().cuid()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { paymentIntentId, paymentId } = confirmPaymentSchema.parse(body)

    // Find the payment
    const payment = await prisma.payment.findUnique({
      where: { id: paymentId },
      include: {
        booking: {
          include: {
            departure: {
              include: {
                conquistatour: true
              }
            }
          }
        }
      }
    })

    if (!payment) {
      return NextResponse.json(
        { error: 'Payment not found' },
        { status: 404 }
      )
    }

    if (payment.stripePaymentIntentId !== paymentIntentId) {
      return NextResponse.json(
        { error: 'Payment intent mismatch' },
        { status: 400 }
      )
    }

    // In a real implementation, verify with Stripe
    // const stripe = new Stripe(STRIPE_SECRET_KEY)
    // const paymentIntent = await stripe.paymentIntents.retrieve(paymentIntentId)
    
    // For demo purposes, simulate successful payment
    const mockPaymentSuccess = true

    if (mockPaymentSuccess) {
      // Update payment status
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: 'COMPLETED'
        }
      })

      // Update booking payment status
      const updateData: any = {}
      if (payment.type === 'DEPOSIT') {
        updateData.paidDeposit = true
        // If only deposit paid, booking remains PENDING
        if (!payment.booking.paidBalance) {
          updateData.status = 'PENDING'
        }
      } else if (payment.type === 'BALANCE') {
        updateData.paidBalance = true
        // If both deposit and balance paid, booking is CONFIRMED
        if (payment.booking.paidDeposit) {
          updateData.status = 'CONFIRMED'
        }
      }

      const updatedBooking = await prisma.booking.update({
        where: { id: payment.bookingId },
        data: updateData,
        include: {
          departure: {
            include: {
              conquistatour: {
                include: {
                  leader: {
                    include: {
                      profile: true
                    }
                  }
                }
              }
            }
          },
          travelers: true
        }
      })

      // Create confirmation message (in production, send email/SMS)
      let message = ''
      if (payment.type === 'DEPOSIT') {
        message = `Deposit payment of $${(payment.amount / 100).toFixed(2)} confirmed for ${updatedBooking.departure.conquistatour.title}. Balance of $${((updatedBooking.totalPrice - updatedBooking.depositAmount) / 100).toFixed(2)} due by ${updatedBooking.balanceDueAt.toDateString()}.`
      } else {
        message = `Final payment of $${(payment.amount / 100).toFixed(2)} confirmed! Your conquistatour "${updatedBooking.departure.conquistatour.title}" is fully booked and confirmed.`
      }

      return NextResponse.json({
        success: true,
        message,
        paymentType: payment.type,
        amount: payment.amount,
        booking: updatedBooking,
        nextStep: payment.type === 'DEPOSIT' ? 'balance_due' : 'confirmed'
      })

    } else {
      // Payment failed
      await prisma.payment.update({
        where: { id: paymentId },
        data: {
          status: 'FAILED'
        }
      })

      return NextResponse.json(
        { error: 'Payment failed' },
        { status: 400 }
      )
    }

  } catch (error) {
    console.error('Error confirming payment:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.errors },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to confirm payment' },
      { status: 500 }
    )
  }
}