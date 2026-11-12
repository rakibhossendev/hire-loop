
import { PlusIcon, Building2Icon } from "lucide-react"
import Link from "next/link"
import { redirect } from "next/navigation"

import { Button } from "@/components/ui/button"
import { getJobs } from "@/lib/actions/getJobs"
import type { ManageJobPost } from "@/Typescript/main"
import { auth } from "@/lib/auth"

import { headers } from "next/headers"

import JobAvatar from "../../_components/recruiter/manage-jobs/Job-avater"
import StatusBadge from "../../_components/recruiter/manage-jobs/StatusBadge"
import ActionButtons from "../../_components/recruiter/manage-jobs/action-button"

export default async function ManageJobsPage() {
    const session = await auth.api.getSession({
        headers: await headers(),
    })

    // Authentication check
    if (!session?.user?.email) {
        redirect("/login")
    }

    // Fetch recruiter jobs
    const jobsData: ManageJobPost[] = await getJobs(
        session.user.email
    )

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
                    <Link href="/recruiter/new">
                        <PlusIcon className="size-4" />
                        New Job Post
                    </Link>
                </Button>
            </div>

            {/* Jobs Table / Empty State */}
            {jobsData.length > 0 ? (
                <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full text-sm">
                        <thead className="bg-muted/50">
                            <tr className="border-b">
                                <th className="px-4 py-3 text-left">
                                    Job
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Status
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Location
                                </th>

                                <th className="px-4 py-3 text-left">
                                    Applicants
                                </th>

                                <th className="px-4 py-3 text-right">
                                    Actions
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {jobsData.map((job) => (
                                <tr
                                    key={job._id}
                                    className="border-b last:border-0"
                                >
                                    {/* Job Info */}
                                    <td className="px-4 py-4">
                                        <div className="flex items-center gap-3">
                                            <JobAvatar job={job} />

                                            <div>
                                                <p className="font-medium">
                                                    {job.jobTitle}
                                                </p>

                                                <p className="text-xs text-muted-foreground">
                                                    {job.company}
                                                </p>
                                            </div>
                                        </div>
                                    </td>

                                    {/* Status */}
                                    <td className="px-4 py-4">
                                        <StatusBadge status={job.status} />
                                    </td>

                                    {/* Location */}
                                    <td className="px-4 py-4">
                                        {job.jobLocation}
                                    </td>

                                    {/* Applicants */}
                                    <td className="px-4 py-4">
                                        {job.applicants}
                                    </td>

                                    {/* Actions */}
                                    <td className="px-4 py-4 text-right">
                                        <ActionButtons job={job} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) : (
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

                    <Button
                        className="mt-5 bg-brand text-brand-foreground hover:bg-brand/90"
                    >
                        <Link href="/recruiter/new">
                            <PlusIcon className="size-4" />
                            Create Job Post
                        </Link>
                    </Button>
                </div>
            )}
        </section>
    )
}
