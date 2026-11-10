"use client"
import {
    PlusIcon,
    UsersIcon,
    MapPinIcon,
    Building2Icon,
    CalendarDaysIcon,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

import {
    mockJobPosts,
    type ManageJobPost,
} from "./data"
import ActionButtons from "../../_components/recruiter/manage-jobs/action-button"
import StatusBadge from "../../_components/recruiter/manage-jobs/StatusBadge"
import JobAvatar from "../../_components/recruiter/manage-jobs/Job-avater"

// Replace with backend API response
const jobPosts = mockJobPosts

const CURRENCY = "€"

const JOB_TYPE_LABEL: Record<ManageJobPost[ "jobType" ], string> = {
    "full-time": "Full-Time",
    "part-time": "Part-Time",
    contract: "Contract",
    internship: "Internship",
}

const SALARY_FREQUENCY_LABEL: Record<
    ManageJobPost[ "salaryFrequency" ],
    string
> = {
    hourly: "hour",
    monthly: "month",
    yearly: "year",
}




function formatSalary(job: ManageJobPost) {
    return `${CURRENCY}${job.minSalary} – ${CURRENCY}${job.maxSalary} / ${SALARY_FREQUENCY_LABEL[ job.salaryFrequency ]}`
}




// Reusable section label
function InfoLabel({ children }: { children: React.ReactNode }) {
    return (
        <dt className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
            {children}
        </dt>
    )
}

export default function ManageJobsPage() {
    return (
        <section className="mx-auto w-full max-w-7xl space-y-6 px-3 py-4 sm:space-y-8 sm:px-5 lg:px-8">

            {/* Breadcrumb */}
            <div className="flex items-center gap-2 text-xs sm:text-sm">
                <span className="text-muted-foreground">
                    Manage Jobs
                </span>
                <span className="text-border">/</span>
                <span className="font-medium text-foreground">
                    Job Listings & Postings
                </span>
            </div>

            {/* Header */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div className="min-w-0 space-y-2">
                    <h1 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
                        Manage Job Posts
                    </h1>

                    <p className="max-w-2xl text-sm leading-relaxed text-muted-foreground sm:text-base">
                        Review live listings, monitor applicants, and
                        update job details across your organization.
                    </p>
                </div>

                <Button
                    size="lg"
                    className="w-full shrink-0 bg-brand text-brand-foreground hover:bg-brand/90 sm:w-auto"
                >
                    <PlusIcon className="size-4" />
                    New Job Post
                </Button>
            </div>

            {/* Desktop / Tablet Table */}
            <div className="hidden overflow-hidden rounded-xl border border-border bg-card md:block">

                <div className="w-full overflow-x-auto">
                    <table className="w-full min-w-[850px] text-left text-sm">

                        <thead>
                            <tr className="border-b border-border bg-muted/30">
                                <th className="px-4 py-4 font-medium text-muted-foreground lg:px-5">
                                    Job Title
                                </th>

                                <th className="px-4 py-4 font-medium text-muted-foreground lg:px-5">
                                    Company
                                </th>

                                <th className="hidden px-4 py-4 font-medium text-muted-foreground lg:table-cell">
                                    Type
                                </th>

                                <th className="hidden px-4 py-4 font-medium text-muted-foreground xl:table-cell">
                                    Salary
                                </th>

                                <th className="px-4 py-4 font-medium text-muted-foreground">
                                    Applicants
                                </th>

                                <th className="px-4 py-4 font-medium text-muted-foreground">
                                    Status
                                </th>

                                <th className="hidden px-4 py-4 font-medium text-muted-foreground xl:table-cell">
                                    Deadline
                                </th>

                                <th className="px-4 py-4 text-right font-medium text-muted-foreground">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobPosts.map((job) => (
                                <tr
                                    key={job.id}
                                    className="border-b border-border transition-colors last:border-0 hover:bg-muted/30"
                                >
                                    {/* Job Title */}
                                    <td className="px-4 py-4 lg:px-5">
                                        <div className="flex min-w-[180px] items-center gap-3">
                                            <JobAvatar job={job} />

                                            <div className="min-w-0">
                                                <p className="truncate font-semibold text-foreground">
                                                    {job.jobTitle}
                                                </p>

                                                <p className="mt-1 truncate text-xs text-muted-foreground">
                                                    {job.department}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Company */}
                                    <td className="px-4 py-4">
                                        <p className="font-medium text-foreground">
                                            {job.company}
                                        </p>

                                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                            <MapPinIcon className="size-3" />
                                            {job.jobLocation}
                                        </p>
                                    </td>

                                    {/* Type */}
                                    <td className="hidden px-4 py-4 lg:table-cell">
                                        <Badge variant="outline">
                                            {JOB_TYPE_LABEL[ job.jobType ]}
                                        </Badge>
                                    </td>

                                    {/* Salary */}
                                    <td className="hidden px-4 py-4 font-medium whitespace-nowrap xl:table-cell">
                                        {formatSalary(job)}
                                    </td>

                                    {/* Applicants */}
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-2 whitespace-nowrap text-muted-foreground">
                                            <UsersIcon className="size-4" />
                                            <span>
                                                {job.applicants}
                                            </span>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-4">
                                        <StatusBadge status={job.status} />
                                    </td>

                                    {/* Deadline */}
                                    <td className="hidden px-4 py-4 xl:table-cell">
                                        <p className="font-medium">
                                            {job.deadline}
                                        </p>

                                        <p className="mt-1 text-xs text-muted-foreground">
                                            {job.postedAgo}
                                        </p>
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-4">
                                        <div className="flex justify-end">
                                            <ActionButtons job={job} />
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Mobile Cards */}
            <div className="space-y-3 md:hidden">

                {jobPosts.map((job) => (
                    <article
                        key={job.id}
                        className="overflow-hidden rounded-xl border border-border bg-card"
                    >

                        {/* Card Header */}
                        <div className="flex items-start justify-between gap-3 p-4">

                            <div className="flex min-w-0 items-center gap-3">
                                <JobAvatar job={job} />

                                <div className="min-w-0">
                                    <h3 className="truncate font-semibold text-foreground">
                                        {job.jobTitle}
                                    </h3>

                                    <p className="mt-1 truncate text-xs text-muted-foreground">
                                        {job.department}
                                    </p>
                                </div>
                            </div>

                            <StatusBadge status={job.status} />
                        </div>

                        {/* Company Info */}
                        <div className="space-y-2 border-t border-border px-4 py-3">

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <Building2Icon className="size-4 shrink-0" />
                                <span className="truncate text-foreground">
                                    {job.company}
                                </span>
                            </div>

                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <MapPinIcon className="size-4 shrink-0" />
                                <span className="truncate">
                                    {job.jobLocation}
                                </span>
                            </div>
                        </div>

                        {/* Details Grid */}
                        <dl className="grid grid-cols-2 gap-x-4 gap-y-4 border-t border-border bg-muted/20 px-4 py-4">

                            <div className="space-y-1">
                                <InfoLabel>Salary</InfoLabel>
                                <dd className="text-sm font-medium text-foreground">
                                    {formatSalary(job)}
                                </dd>
                            </div>

                            <div className="space-y-1">
                                <InfoLabel>Applicants</InfoLabel>
                                <dd className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                    <UsersIcon className="size-4 text-muted-foreground" />
                                    {job.applicants} candidates
                                </dd>
                            </div>

                            <div className="space-y-1">
                                <InfoLabel>Job Type</InfoLabel>
                                <dd className="text-sm font-medium text-foreground">
                                    {JOB_TYPE_LABEL[ job.jobType ]}
                                </dd>
                            </div>

                            <div className="space-y-1">
                                <InfoLabel>Deadline</InfoLabel>
                                <dd className="flex items-center gap-1.5 text-sm font-medium text-foreground">
                                    <CalendarDaysIcon className="size-4 text-muted-foreground" />
                                    {job.deadline}
                                </dd>
                            </div>
                        </dl>

                        {/* Card Footer */}
                        <div className="flex items-center justify-between border-t border-border px-4 py-2.5">

                            <span className="text-xs text-muted-foreground">
                                Posted {job.postedAgo}
                            </span>

                            <ActionButtons job={job} />
                        </div>
                    </article>
                ))}
            </div>

            {/* Empty State */}
            {jobPosts.length === 0 && (
                <div className="rounded-xl border border-dashed border-border px-5 py-16 text-center">
                    <div className="mx-auto mb-4 flex size-12 items-center justify-center rounded-xl bg-muted">
                        <Building2Icon className="size-6 text-muted-foreground" />
                    </div>

                    <h3 className="font-semibold">
                        No job posts yet
                    </h3>

                    <p className="mt-1 text-sm text-muted-foreground">
                        Create your first job post to get started.
                    </p>

                    <Button className="mt-5 bg-brand text-brand-foreground hover:bg-brand/90">
                        <PlusIcon />
                        Create Job Post
                    </Button>
                </div>
            )}
        </section>
    )
}
