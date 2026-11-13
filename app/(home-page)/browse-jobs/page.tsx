import type { Metadata } from "next"

import { browseJobs } from "@/lib/actions/browse-jobs"
import type { ManageJobPost } from "@/Typescript/main"
import { Navbar } from "../_components/Navbar/Navbar"
import { FilterCard } from "../_components/browse-jobs/filter-card"
import { JobDataShowCard } from "../_components/browse-jobs/job-data-show-card"
import { SearchBar } from "../_components/browse-jobs/search-bar"

export const metadata: Metadata = {
  title: "Browse Jobs | hireloop",
  description: "Search and filter professional jobs by type, salary and more.",
}

type BrowseJobsPageProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BrowseJobsPage({
  searchParams,
}: BrowseJobsPageProps) {
  const params = await searchParams
  const query = new URLSearchParams(params as Record<string, string>).toString()
  const jobs: ManageJobPost[] = (await browseJobs(query)) ?? []

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16">
      <Navbar />

      <div className="mt-6">
        <SearchBar />
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <aside className="lg:sticky lg:top-4 lg:self-start">
          <FilterCard />
        </aside>

        <section className="flex min-w-0 flex-col gap-4">
          <h1 className="text-lg font-semibold text-foreground">
            Found {jobs.length.toLocaleString("en-US")} Professional{" "}
            {jobs.length === 1 ? "Job" : "Jobs"}
          </h1>

          {jobs.map((job) => (
            <JobDataShowCard key={job._id} job={job} />
          ))}
        </section>
      </div>
    </main>
  )
}
