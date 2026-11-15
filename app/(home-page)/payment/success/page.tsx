import Link from "next/link"
import { redirect } from "next/navigation"
import { CheckCircle2, ArrowRight, ShieldCheck } from "lucide-react"

import { Navbar } from "../../_components/Navbar/Navbar"
import { stripe } from "@/lib/stripe"
import { paymentCheckoutVerify } from "@/lib/actions/payment_checkout"



export default async function PaymentSuccessPage({searchParams,}: {searchParams: Promise<{session_id: string}>}) {
  const { session_id } = await searchParams

  const { status, payment_status } =
    await stripe.checkout.sessions.retrieve(session_id, {
      expand: ["line_items", "payment_intent"],
    })

  if (status === "open") {
    redirect("/")
  }
  if(status == 'complete' && payment_status == "paid"){
    const result = await paymentCheckoutVerify(session_id as string);
    console.log(result)
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="mx-auto w-full max-w-7xl px-4">
        <Navbar />

        <section className="flex min-h-[75vh] items-center justify-center py-16">
          <div className="w-full max-w-lg text-center">

            {/* Success Icon */}
            <div className="mx-auto flex size-20 items-center justify-center rounded-full bg-emerald-500/10 ring-8 ring-emerald-500/5">
              <CheckCircle2
                className="size-10 text-emerald-500"
                strokeWidth={1.8}
              />
            </div>

            {/* Heading */}
            <div className="mt-8 space-y-3">
              <span className="text-xs font-semibold uppercase tracking-[0.2em] text-emerald-500">
                Payment confirmed
              </span>

              <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                Payment successful!
              </h1>

              <p className="mx-auto max-w-sm text-sm leading-6 text-muted-foreground sm:text-base">
                Thank you for your purchase. Your payment has been processed
                successfully, and your Pro features are already active.
              </p>
            </div>

            {/* Payment Details */}
            <div className="mt-8 rounded-2xl border border-border bg-card p-5 text-left shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex size-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <ShieldCheck className="size-5 text-emerald-500" />
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground">
                    Transaction details
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Your checkout session information
                  </p>
                </div>
              </div>

              <div className="my-5 border-t border-border" />

              <div className="flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Session status
                </span>
                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium capitalize text-emerald-500">
                  {status ?? "Completed"}
                </span>
              </div>

              <div className="mt-4 flex items-center justify-between gap-4">
                <span className="text-sm text-muted-foreground">
                  Payment status
                </span>
                <span className="text-sm font-medium capitalize text-foreground">
                  {payment_status}
                </span>
              </div>

              <div className="mt-4 space-y-2">
                <span className="text-sm text-muted-foreground">
                  Reference ID
                </span>
                <p className="break-all rounded-lg bg-muted px-3 py-2 font-mono text-xs text-muted-foreground">
                  {session_id}
                </p>
              </div>
            </div>

            {/* Action */}
            <Link
              href="/"
              className="mt-8 inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-brand px-6 text-sm font-semibold text-brand-foreground transition-all hover:bg-brand/90 hover:shadow-lg sm:w-auto"
            >
              Back to home
              <ArrowRight className="size-4" />
            </Link>

            <p className="mt-5 text-xs text-muted-foreground">
              Thank you for choosing hireloop!
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

