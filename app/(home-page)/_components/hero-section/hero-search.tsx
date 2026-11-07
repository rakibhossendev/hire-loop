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
  const [jobTitle, setJobTitle] = useState("")
  const [location, setLocation] = useState("")

  return (
    <>
      <form
        onSubmit={(event) => event.preventDefault()}
        className="mx-auto mt-8 max-w-3xl rounded-xl border border-border bg-card p-2"
      >
        <div className="flex flex-col gap-2 md:flex-row md:items-center">
          <label className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2">
            <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-brand/10">
              <Search className="size-3.5 text-brand" aria-hidden="true" />
            </span>
            <input
              type="text"
              value={jobTitle}
              onChange={(event) => setJobTitle(event.target.value)}
              placeholder="Job title, skill or company"
              aria-label="Job title, skill or company"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <span
            className="hidden h-6 w-px bg-border md:block"
            aria-hidden="true"
          />
          <label className="flex flex-1 items-center gap-2 rounded-lg px-3 py-2">
            <MapPin
              className="size-4 shrink-0 text-muted-foreground"
              aria-hidden="true"
            />
            <input
              type="text"
              value={location}
              onChange={(event) => setLocation(event.target.value)}
              placeholder="Location or Remote"
              aria-label="Location or Remote"
              className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </label>
          <Button
            type="submit"
            aria-label="Search"
            size="icon-lg"
            className="w-full gap-2 bg-brand text-brand-foreground hover:bg-brand/90 md:w-auto"
          >
            <Search aria-hidden="true" />
            <span className="md:hidden">Search</span>
          </Button>
        </div>
      </form>

      <div className="mt-6 flex flex-wrap items-center justify-center gap-x-4 gap-y-2">
        <span className="text-sm text-muted-foreground">Trending Position</span>
        <div className="flex flex-wrap items-center justify-center gap-2">
          {trendingPositions.map((position) => (
            <button
              key={position}
              type="button"
              onClick={() => setJobTitle(position)}
              className="rounded-full border border-border px-3 py-1 text-xs text-foreground transition-colors hover:bg-muted"
            >
              {position}
            </button>
          ))}
        </div>
      </div>
    </>
  )
}
