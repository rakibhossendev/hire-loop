import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { getJobDetail } from "@/lib/actions/browse-jobs"
import { Navbar } from "../../_components/Navbar/Navbar"
import { CompanyOverviewCard } from "../../_components/browse-jobs/company-overview-card"
import { JobDescriptionCard } from "../../_components/browse-jobs/job-description-card"
import { JobDetailHeader } from "../../_components/browse-jobs/job-detail-header"

export const metadata: Metadata = {
  title: "Job Details | hireloop",
  description:
    "View full job details, responsibilities, requirements and benefits.",
}

type JobDetailPageProps = {
  params: Promise<{ jobId: string }>
}

export default async function JobDetailPage({ params }: JobDetailPageProps) {
  const { jobId } = await params
  const job = await getJobDetail(jobId)

  if (!job) notFound()

  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16">
      <Navbar />

      <div className="mt-6 grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
        {/* Header card (full width) + stat cards (left column) */}
        <JobDetailHeader job={job} />

        {/* Description — left column, below the stats */}
        <div className="min-w-0 lg:col-start-1 lg:row-start-3">
          <JobDescriptionCard job={job} />
        </div>

        {/* Company overview — right column, beside stats + description */}
        <div className="lg:col-start-2 lg:row-span-2 lg:row-start-2 lg:self-start">
          <CompanyOverviewCard job={job} />
        </div>
      </div>
    </main>
  )
}
