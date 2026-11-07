import { Briefcase } from "lucide-react"

import { HeroSearch } from "./hero-search"

export function HeroSection() {
  return (
    <section className="dark mt-4 overflow-hidden rounded-2xl bg-background text-foreground">
      <div className="px-4 pt-10 pb-6 md:pt-16">
        <div className="flex items-center justify-center gap-4">
          <span
            className="hidden h-px flex-1 bg-border sm:block"
            aria-hidden="true"
          />
          <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 rounded-full border border-border bg-card px-4 py-2">
            <Briefcase className="size-4 text-orange-500" aria-hidden="true" />
            <span className="text-sm font-bold">50,000+</span>
            <span className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
              New jobs this month
            </span>
          </div>
          <span
            className="hidden h-px flex-1 bg-border sm:block"
            aria-hidden="true"
          />
        </div>

        <h1 className="mt-6 text-center text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
          Find Your Dream Job Today
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-center text-sm text-muted-foreground md:text-base">
          HireLoop connects top talent with world-class companies. Browse
          thousands of curated opportunities and land your next role — faster.
        </p>

        <HeroSearch />
      </div>
    </section>
  )
}
