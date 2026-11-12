import { HeroSearch } from "./hero-search"

export function HeroSection() {
  return (
    <section className="relative mt-4 overflow-hidden rounded-2xl border bg-background text-foreground">
      {/* Subtle background decoration */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />
      </div>

      <div className="relative px-5 py-16 sm:px-8 md:py-24">
        <div className="mx-auto max-w-3xl text-center">
          {/* Small label */}
          <div className="mb-7 inline-flex items-center gap-2 rounded-full border bg-card/80 px-3.5 py-1.5 text-xs font-medium text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-500 opacity-50" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            Your next opportunity starts here
          </div>

          {/* Heading */}
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            Find work that
            <br />
            <span className="text-primary">moves you forward.</span>
          </h1>

          {/* Description */}
          <p className="mx-auto mt-6 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
            Discover opportunities that match your skills, explore exciting
            companies, and take the next step in your career.
          </p>

          {/* Search */}
          <div className="mt-10">
            <HeroSearch />
          </div>

          {/* Supporting text */}
          <p className="mt-5 text-xs text-muted-foreground">
            Explore opportunities across different industries and career levels.
          </p>
        </div>
      </div>
    </section>
  )
}
