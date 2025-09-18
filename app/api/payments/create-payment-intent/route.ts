import { NextRequest, NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'
import { z } from 'zod'

const prisma = new PrismaClient()

// In production, use environment variables
const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY || 'sk_test_placeholder'

const createPaymentSchema = z.object({
  bookingId: z.string().cuid(),
  paymentType: z.enum(['DEPOSIT', 'BALANCE']),
  returnUrl: z.string().url().optional()
})

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { bookingId, paymentType, returnUrl } = createPaymentSchema.parse(body)

    // Fetch booking details
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
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
        traveler: {
          include: {
            profile: true
          }
        }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Determine payment amount
    let amount: number
    if (paymentType === 'DEPOSIT') {
      if (booking.paidDeposit) {
        return NextResponse.json(
          { error: 'Deposit already paid' },
          { status: 400 }
        )
      }
      amount = booking.depositAmount
    } else {
      if (!booking.paidDeposit) {
        return NextResponse.json(
          { error: 'Deposit must be paid first' },
          { status: 400 }
        )
      }
      if (booking.paidBalance) {
        return NextResponse.json(
          { error: 'Balance already paid' },
          { status: 400 }
        )
      }
      amount = booking.totalPrice - booking.depositAmount
    }

    // Create payment record
    const payment = await prisma.payment.create({
      data: {
        bookingId,
        type: paymentType,
        amount,
        status: 'PENDING'
      }
    })

    // In a real implementation, create Stripe Payment Intent
    const mockPaymentIntent = {
      id: `pi_mock_${payment.id}`,
      client_secret: `pi_mock_${payment.id}_secret_mock`,
      amount,
      currency: 'usd',
      status: 'requires_payment_method',
      metadata: {
        bookingId,
        paymentId: payment.id,
        paymentType,
        tourTitle: booking.departure.conquistatour.title
      }
    }

    // Update payment with Stripe payment intent ID
    await prisma.payment.update({
      where: { id: payment.id },
      data: {
        stripePaymentIntentId: mockPaymentIntent.id
      }
    })

    return NextResponse.json({
      paymentIntentId: mockPaymentIntent.id,
      clientSecret: mockPaymentIntent.client_secret,
      amount,
      currency: 'usd',
      paymentId: payment.id,
      booking: {
        id: booking.id,
        tourTitle: booking.departure.conquistatour.title,
        travelers: booking.participants,
        startDate: booking.departure.startDate,
        endDate: booking.departure.endDate
      }
    })

  } catch (error) {
    console.error('Error creating payment intent:', error)
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.issues },
        { status: 400 }
      )
    }
    return NextResponse.json(
      { error: 'Failed to create payment intent' },
      { status: 500 }
    )
  }
}