import { NextRequest, NextResponse } from 'next/server'
import Stripe from 'stripe'

export async function POST(req: NextRequest) {
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!)
    const { sessionId } = await req.json()

    const session = await stripe.checkout.sessions.retrieve(sessionId)
    const success = session.payment_status === 'paid'

    return NextResponse.json({ success, paymentId: session.payment_intent as string })
  } catch (error) {
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
