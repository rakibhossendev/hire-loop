import type { Metadata } from "next"

import { Navbar } from "../_components/Navbar/Navbar"
import { BrowseJobsPagination } from "../_components/browse-jobs/browse-jobs-pagination"
import { BrowseJobsSearch } from "../_components/browse-jobs/browse-jobs-search"
import { EmptyState } from "../_components/browse-jobs/empty-state"
import { JobCard } from "../_components/browse-jobs/job-card"
import { JobFilters } from "../_components/browse-jobs/job-filters"
import { SortJobs } from "../_components/browse-jobs/sort-jobs"
import {
    countJobTypes,
    filterJobs,
    JOBS,
    paginate,
    parseFilters,
    sortJobs,
    totalPagesFor,
} from "../_components/browse-jobs/jobs-data"

export const metadata: Metadata = {
    title: "Browse Jobs | hireloop",
    description: "Search and filter professional jobs by type, salary and more.",
}

type BrowseJobsPageProps = {
    searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

export default async function BrowseJobsPage({ searchParams }: BrowseJobsPageProps) {
    const filters = parseFilters(await searchParams)

    const counts = countJobTypes(JOBS, filters.q)
    const filtered = filterJobs(JOBS, filters)
    const sorted = sortJobs(filtered, filters.sort)

    const total = sorted.length
    const totalPages = totalPagesFor(total)
    const page = Math.min(filters.page, totalPages)
    const jobs = paginate(sorted, page)

    return (
        <main className="mx-auto w-full max-w-7xl px-4 pb-16">
            <Navbar />

            <div className="mt-6">
                <BrowseJobsSearch filters={filters} />
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
                <JobFilters filters={filters} counts={counts} />

                <section className="min-w-0">
                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                        <h1 className="text-lg font-semibold text-foreground">
                            Found {total.toLocaleString("en-US")} Professional{" "}
                            {total === 1 ? "Job" : "Jobs"}
                        </h1>
                        <SortJobs filters={filters} />
                    </div>

                    <div className="mt-4 flex flex-col gap-4">
                        {jobs.length > 0 ? (
                            jobs.map((job) => <JobCard key={job.id} job={job} />)
                        ) : (
                            <EmptyState />
                        )}
                    </div>

                    <BrowseJobsPagination filters={filters} page={page} totalPages={totalPages} />
                </section>
            </div>
        </main>
    )
}
