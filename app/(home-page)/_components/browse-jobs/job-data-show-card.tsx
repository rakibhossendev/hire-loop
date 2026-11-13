"use client"

import type { ManageJobPost } from "@/Typescript/main"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function formatSalary(job: ManageJobPost): string {
  const min = Number(job.minSalary)
  const max = Number(job.maxSalary)

  if (Number.isNaN(min) && Number.isNaN(max)) return "Salary not listed"

  const compact = (value: number) =>
    value >= 1000 ? `${Math.round(value / 1000)}k` : String(value)

  if (!Number.isNaN(min) && !Number.isNaN(max))
    return `$${compact(min)} - $${compact(max)}`
  if (!Number.isNaN(min)) return `From $${compact(min)}`
  return `Up $${compact(max)}`
}

export function JobDataShowCard({ job }: { job: ManageJobPost }) {
  // TODO: open the job details — logic is handled elsewhere.
  function handleView() { }

  // TODO: save the job — logic is handled elsewhere.
  function handleSave() { }

  // TODO: apply to the job — logic is handled elsewhere.
  function handleApply() { }

  return (
    <article className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 sm:p-5">

      <Link href={`/browse-jobs/${job._id}`}>
        <div className="flex gap-4">
          <div
            aria-hidden="true"
            className="flex size-12 shrink-0 items-center justify-center rounded-lg border border-border bg-brand/10 text-base font-semibold text-brand"
          >
            {job.company.charAt(0).toUpperCase()}
          </div>

          <div className="min-w-0 flex-1">
            <h3 className="truncate text-base font-semibold text-foreground">
              {job.jobTitle}
            </h3>
            <p className="mt-1 text-sm break-words text-muted-foreground">
              {job.company} • {job.jobLocation}
            </p>

            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs font-medium text-muted-foreground">
              <span className="rounded-md border border-border bg-muted/50 px-2 py-1">
                {formatSalary(job)}
              </span>
              <span className="rounded-md border border-border bg-muted/50 px-2 py-1 capitalize">
                {job.jobType.replace("-", " ")}
              </span>
            </div>

            <div className="mt-4 flex flex-wrap gap-2">
              <Button variant="outline" size="sm" onClick={handleView}>
                View
              </Button>
              <Button variant="outline" size="sm" onClick={handleSave}>
                Save
              </Button>
              <Button
                size="sm"
                className="bg-brand text-brand-foreground hover:bg-brand/90"
                onClick={handleApply}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </Link>
    </article>
  )
}
