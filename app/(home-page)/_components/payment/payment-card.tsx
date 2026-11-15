"use client"

import { useEffect, useState } from "react"
import { loadStripe } from "@stripe/stripe-js"
import {
  Elements,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js"

import { Button } from "@/components/ui/button"
import { formatPlanPrice } from "@/lib/payment-plan"

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
)

function CheckoutForm() {
  const stripe = useStripe()
  const elements = useElements()
  const [submitting, setSubmitting] = useState(false)
  const [message, setMessage] = useState<string | null>(null)

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (!stripe || !elements) return

    setSubmitting(true)
    setMessage(null)

    const { error } = await stripe.confirmPayment({
      elements,
      // On success the browser is redirected away to /payment/success.
      confirmParams: {
        return_url: `${window.location.origin}/payment/success`,
      },
    })

    // Only reached when payment fails immediately (card declined, etc.).
    if (error) {
      setMessage(error.message ?? "Payment failed. Please try again.")
      setSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      <PaymentElement />

      <Button
        type="submit"
        disabled={!stripe || submitting}
        className="h-11 w-full bg-brand text-brand-foreground hover:bg-brand/90"
      >
        {submitting ? "Processing..." : `Pay ${formatPlanPrice()}`}
      </Button>

      {message && (
        <p role="alert" className="text-sm text-destructive">
          {message}
        </p>
      )}
    </form>
  )
}

function CardSkeleton() {
  return (
    <div className="flex animate-pulse flex-col gap-4" aria-hidden="true">
      <div className="h-10 w-full rounded-lg bg-muted" />
      <div className="grid grid-cols-2 gap-4">
        <div className="h-10 rounded-lg bg-muted" />
        <div className="h-10 rounded-lg bg-muted" />
      </div>
      <div className="h-11 w-full rounded-lg bg-muted" />
    </div>
  )
}

export function PaymentCard() {
  const [clientSecret, setClientSecret] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [attempt, setAttempt] = useState(0)

  useEffect(() => {
    let cancelled = false

    fetch("/api/create-payment-intent", { method: "POST" })
      .then((response) => {
        if (!response.ok)
          throw new Error("Could not start the payment session.")
        return response.json() as Promise<{
          clientSecret?: string
          error?: string
        }>
      })
      .then((data) => {
        if (cancelled) return
        if (!data.clientSecret)
          throw new Error(data.error ?? "Missing payment session.")
        setClientSecret(data.clientSecret)
        setError(null)
      })
      .catch((cause: unknown) => {
        if (cancelled) return
        setError(
          cause instanceof Error ? cause.message : "Something went wrong."
        )
      })

    return () => {
      cancelled = true
    }
  }, [attempt])

  return (
    <div className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-base font-semibold text-foreground">
        Payment Details
      </h2>

      {error ? (
        <div className="flex flex-col items-start gap-3">
          <p className="text-sm text-destructive">{error}</p>
          <Button
            type="button"
            variant="outline"
            onClick={() => setAttempt((value) => value + 1)}
          >
            Try again
          </Button>
        </div>
      ) : !clientSecret ? (
        <CardSkeleton />
      ) : (
        <Elements
          stripe={stripePromise}
          options={{
            clientSecret,
            appearance: { theme: "stripe" },
          }}
        >
          <CheckoutForm />
        </Elements>
      )}
    </div>
  )
}
