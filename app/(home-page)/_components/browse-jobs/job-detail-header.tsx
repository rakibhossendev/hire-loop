"use client"

import {
  BadgeCheck,
  Bookmark,
  Clock,
  MapPin,
  Wallet,
  BarChart3,
} from "lucide-react"

import type { JobDetailType } from "@/Typescript/main"
import { Button } from "@/components/ui/button"

function formatSalary(job: JobDetailType): string {
  const min = Number(job.minSalary)
  const max = Number(job.maxSalary)

  if (Number.isNaN(min) && Number.isNaN(max)) return "Not specified"

  const compact = (value: number) =>
    value >= 1000 ? `$${Math.round(value / 1000)}k` : `$${value}`

  if (!Number.isNaN(min) && !Number.isNaN(max))
    return `${compact(min)} - ${compact(max)}`
  if (!Number.isNaN(min)) return `From ${compact(min)}`
  return `Up to ${compact(max)}`
}

function formatJobType(job: JobDetailType): string {
  return job.jobType
    .replace("-", " ")
    .replace(/\b\w/g, (letter) => letter.toUpperCase())
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex flex-col gap-2 rounded-xl border border-border bg-card p-4">
      <span className="flex items-center gap-1.5 text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {icon}
        {label}
      </span>
      <span className="text-sm font-semibold text-foreground">{value}</span>
    </div>
  )
}

export function JobDetailHeader({ job }: { job: JobDetailType }) {
  // TODO: save the job — logic is handled elsewhere.
  function handleSave() {}

  // TODO: apply to the job — logic is handled elsewhere.
  function handleApply() {}

  return (
    <>
      {/* Header card — spans the full grid width */}
      <div className="rounded-xl border border-border bg-card p-5 lg:col-span-2">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div
              aria-hidden="true"
              className="flex size-14 shrink-0 items-center justify-center rounded-xl border border-border bg-brand/10 text-xl font-semibold text-brand"
            >
              {job.company.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0">
              <h1 className="truncate text-xl font-semibold text-foreground">
                {job.jobTitle}
              </h1>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                <span>{job.company}</span>
                {job.verified && (
                  <span className="flex items-center gap-1 text-emerald-500">
                    <BadgeCheck className="size-4" aria-hidden="true" />
                    Verified Employer
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2">
            <button
              type="button"
              onClick={handleSave}
              aria-label={`Save ${job.jobTitle}`}
              title="Save job"
              className="flex size-9 items-center justify-center rounded-lg border border-border text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
            >
              <Bookmark className="size-4" aria-hidden="true" />
            </button>
            <Button
              size="lg"
              className="bg-brand text-brand-foreground hover:bg-brand/90"
              onClick={handleApply}
            >
              Apply Now
            </Button>
          </div>
        </div>
      </div>

      {/* Stat cards — left column row */}
      <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">
        <StatCard
          icon={<Wallet className="size-3.5" aria-hidden="true" />}
          label="Salary Range"
          value={formatSalary(job)}
        />
        <StatCard
          icon={<MapPin className="size-3.5" aria-hidden="true" />}
          label="Location"
          value={job.jobLocation}
        />
        <StatCard
          icon={<Clock className="size-3.5" aria-hidden="true" />}
          label="Job Type"
          value={formatJobType(job)}
        />
        <StatCard
          icon={<BarChart3 className="size-3.5" aria-hidden="true" />}
          label="Experience"
          value={job.experience ?? "—"}
        />
      </div>
    </>
  )
}
