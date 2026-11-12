"use client"

import { Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { buildJobsHref, type JobFilters } from "./jobs-data"

export function BrowseJobsSearch({ filters }: { filters: JobFilters }) {
  const router = useRouter()
  const [value, setValue] = useState(filters.q)
  const [prevQ, setPrevQ] = useState(filters.q)

  // Keep the input in sync when the URL changes from elsewhere
  // (back/forward). Adjusting state during render instead of an
  // effect avoids a cascading re-render.
  if (filters.q !== prevQ) {
    setPrevQ(filters.q)
    setValue(filters.q)
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    router.replace(buildJobsHref({ ...filters, q: value, page: 1 }), {
      scroll: false,
    })
  }

  return (
    <form
      onSubmit={handleSubmit}
      role="search"
      className="rounded-xl border border-border bg-card p-3 shadow-sm"
    >
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <label className="group relative flex min-w-0 flex-1 items-center">
          <Search
            className="pointer-events-none absolute left-3 size-4 text-muted-foreground"
            aria-hidden="true"
          />
          <span className="sr-only">Search by job title, keywords</span>
          <input
            type="search"
            value={value}
            onChange={(event) => setValue(event.target.value)}
            placeholder="Search by job title, keywords..."
            className="h-11 w-full min-w-0 rounded-lg border border-transparent bg-transparent pr-3 pl-10 text-sm text-foreground transition-colors outline-none placeholder:text-muted-foreground focus:border-ring focus:ring-3 focus:ring-ring/50"
          />
        </label>

        <Button
          type="submit"
          size="lg"
          className="h-11 w-full shrink-0 px-6 sm:w-auto"
        >
          Search Jobs
        </Button>
      </div>
    </form>
  )
}
