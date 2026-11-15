import type { Metadata } from "next"

import { Navbar } from "../_components/Navbar/Navbar"
import { OrderSummaryCard } from "../_components/payment/order-summary-card"
import { PaymentCard } from "../_components/payment/payment-card"

export const metadata: Metadata = {
  title: "Payment | hireloop",
  description: "Complete your payment securely with Stripe.",
}

export default function PaymentPage() {
  return (
    <main className="mx-auto w-full max-w-4xl px-4 pb-16">
      <Navbar />

      <div className="mt-8">
        <h1 className="text-2xl font-bold text-foreground">Checkout</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Complete your purchase securely with Stripe.
        </p>
      </div>

      <div className="mt-6 grid gap-6 md:grid-cols-2">
        <OrderSummaryCard />
        <PaymentCard />
      </div>
    </main>
  )
}
