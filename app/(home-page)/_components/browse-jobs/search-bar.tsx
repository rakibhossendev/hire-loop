"use client"

import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation";

export function SearchBar() {
  const router = useRouter();
  // TODO: apply the submitted search value — logic is handled elsewhere.
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const getSearchData = Object.fromEntries(formData.entries()) as {search: string};
    const params = new URLSearchParams();
    params.set('search',getSearchData.search as string)
    router.push(`browse-jobs?${params.toString()}`)
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
            name="search"
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
