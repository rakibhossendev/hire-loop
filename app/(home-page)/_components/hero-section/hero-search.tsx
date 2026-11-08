"use client"

import { MapPin, Search } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"

const trendingPositions = [
  "Product Designer",
  "AI Engineering",
  "Dev-ops Engineer",
]

export function HeroSearch() {
  const [ jobTitle, setJobTitle ] = useState("")
  const [ location, setLocation ] = useState("")


  return (
    <div className="mx-auto mt-10 w-full max-w-3xl">
      {/* Search Card */}
      <form
        onSubmit={(event) => event.preventDefault()}
        className="rounded-2xl border border-border/80 bg-card p-2 shadow-xl shadow-black/[0.04] dark:shadow-black/20"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center">

          {/* Job Search */}
          <label className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3 transition-colors focus-within:bg-muted/60">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Search className="size-5" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="mb-1 block text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                What
              </span>
              <input
                type="text"
                value={jobTitle}
                onChange={(event) => setJobTitle(event.target.value)}
                placeholder="Job title, skill or company"
                aria-label="Job title, skill or company"
                className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground"
              />
            </div>
          </label>

          {/* Divider */}
          <div className="hidden h-10 w-px bg-border md:block" />

          {/* Location Search */}
          <label className="group flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3 transition-colors focus-within:bg-muted/60">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-muted text-muted-foreground">
              <MapPin className="size-5" aria-hidden="true" />
            </div>

            <div className="min-w-0 flex-1">
              <span className="mb-1 block text-[11px] font-semibold tracking-wide text-muted-foreground uppercase">
                Where
              </span>
              <input
                type="text"
                value={location}
                onChange={(event) => setLocation(event.target.value)}
                placeholder="City or Remote"
                aria-label="Location or Remote"
                className="w-full bg-transparent text-sm font-medium text-foreground outline-none placeholder:font-normal placeholder:text-muted-foreground"
              />
            </div>
          </label>

          {/* Search Button */}
          <Button
            type="submit"
            className="h-12 w-full gap-2 rounded-xl bg-brand px-6 text-brand-foreground shadow-sm transition-all hover:bg-brand/90 hover:shadow-md md:w-auto"
          >
            <Search className="size-4" aria-hidden="true" />
            <span>Search Jobs</span>
          </Button>
        </div>
      </form>

      {/* Trending Searches */}
      <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
        <span className="text-xs font-semibold text-muted-foreground">
          POPULAR:
        </span>

        <div className="flex flex-wrap items-center justify-center gap-2">
          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => setJobTitle(position)}
              className="rounded-full border border-border/80 bg-background px-3.5 py-1.5 text-xs font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:text-primary"
            >
              {position}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
