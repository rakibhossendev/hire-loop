import { NextResponse } from "next/server"

import { stripe } from "@/lib/stripe"
import { PRO_PLAN } from "@/lib/payment-plan"

export async function POST() {
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount: PRO_PLAN.amount,
      currency: PRO_PLAN.currency,
      allowed_payment_method_types: ["card"],
      description: PRO_PLAN.name,
    })

    if (!paymentIntent.client_secret) {
      return NextResponse.json(
        { error: "Payment intent created without client secret" },
        { status: 500 }
      )
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret })
  } catch (err) {
    const error = err instanceof Error ? err : new Error(String(err))
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
