"use client"

import Image from "next/image"

import type { JobDetailType } from "@/Typescript/main"
import { Button } from "@/components/ui/button"

function DetailRow({ label, value }: { label: string; value?: string }) {
  return (
    <div className="flex items-center justify-between gap-3 border-b border-border py-3 last:border-b-0">
      <span className="text-[11px] font-medium tracking-wide text-muted-foreground uppercase">
        {label}
      </span>
      <span className="text-right text-sm font-medium text-foreground">
        {value ?? "—"}
      </span>
    </div>
  )
}

export function CompanyOverviewCard({ job }: { job: JobDetailType }) {
  const overview = job.companyOverview

  // TODO: open the company website — logic is handled elsewhere.
  function handleVisitWebsite() {}

  return (
    <aside className="flex flex-col gap-4 rounded-xl border border-border bg-card p-5">
      <h2 className="text-base font-semibold text-foreground">
        Company Overview
      </h2>

      {overview?.image ? (
        <Image
          src={overview.image}
          alt={`${job.company} workplace`}
          width={400}
          height={200}
          className="h-40 w-full rounded-lg border border-border object-cover"
        />
      ) : (
        <div
          aria-hidden="true"
          className="flex h-40 w-full items-center justify-center rounded-lg border border-border bg-muted text-sm text-muted-foreground"
        >
          {job.company}
        </div>
      )}

      <div>
        <DetailRow label="Size" value={overview?.size} />
        <DetailRow label="Industry" value={overview?.industry} />
      </div>

      <Button
        variant="outline"
        size="lg"
        className="w-full"
        onClick={handleVisitWebsite}
      >
        Visit Website
      </Button>
    </aside>
  )
}
