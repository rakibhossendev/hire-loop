// Single source of truth for the payment amount — used by both the
// server route (amount in cents) and the UI (price display).

export const PRO_PLAN = {
  name: "Pro Plan",
  amount: 2000, // cents
  currency: "usd",
  features: [
    "Unlimited job applications",
    "Priority candidate profile",
    "Advanced job filters",
    "24/7 priority support",
  ],
}

export function formatPlanPrice(): string {
  return `$${(PRO_PLAN.amount / 100).toFixed(2)}`
}
