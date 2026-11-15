import { Check } from "lucide-react"

import { PRO_PLAN, formatPlanPrice } from "@/lib/payment-plan"

export function OrderSummaryCard() {
  return (
    <div className="flex flex-col gap-5 rounded-xl border border-border bg-card p-5 sm:p-6">
      <h2 className="text-base font-semibold text-foreground">Order Summary</h2>

      <div className="flex items-baseline justify-between gap-3">
        <div>
          <p className="text-base font-semibold text-foreground">
            {PRO_PLAN.name}
          </p>
          <p className="mt-0.5 text-sm text-muted-foreground">
            Billed once, cancel anytime
          </p>
        </div>
        <p className="text-2xl font-bold text-foreground">
          {formatPlanPrice()}
        </p>
      </div>

      <ul className="flex flex-col gap-2.5">
        {PRO_PLAN.features.map((feature) => (
          <li
            key={feature}
            className="flex items-start gap-2.5 text-sm text-muted-foreground"
          >
            <span className="mt-0.5 flex size-4 shrink-0 items-center justify-center rounded-full bg-brand/10 text-brand">
              <Check className="size-3" aria-hidden="true" />
            </span>
            {feature}
          </li>
        ))}
      </ul>

      <div className="flex items-center justify-between gap-3 border-t border-border pt-4">
        <span className="text-sm font-medium text-muted-foreground">Total</span>
        <span className="text-lg font-bold text-foreground">
          {formatPlanPrice()} USD
        </span>
      </div>
    </div>
  )
}
