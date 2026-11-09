import { CircleDollarSign } from "lucide-react"

import { cn } from "cn"
import { BookmarkButton } from "./bookmark-button"
import { formatSalary, type Job, type JobBadge } from "./jobs-data"

const toneClasses: Record<NonNullable<JobBadge["tone"]>, string> = {
    default: "border-border bg-muted/50 text-muted-foreground",
    success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-400",
    warning: "border-amber-500/30 bg-amber-500/10 text-amber-400",
}

function JobBadgeChip({ badge }: { badge: JobBadge }) {
    const Icon = badge.icon

    return (
        <span
            className={cn(
                "inline-flex h-6 items-center gap-1.5 rounded-md border px-2 text-xs font-medium whitespace-nowrap",
                toneClasses[badge.tone ?? "default"]
            )}
        >
            <Icon className="size-3.5" aria-hidden="true" />
            {badge.label}
        </span>
    )
}

export function JobCard({ job }: { job: Job }) {
    const LogoIcon = job.logoIcon

    return (
        <article className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40 sm:p-5">
            <div className="flex gap-4">
                <div
                    aria-hidden="true"
                    className={cn(
                        "flex size-12 shrink-0 items-center justify-center rounded-lg border border-border",
                        job.logoClassName
                    )}
                >
                    <LogoIcon className="size-5" />
                </div>

                <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                        <div className="min-w-0">
                            <h3 className="truncate text-base font-semibold text-foreground">
                                {job.title}
                            </h3>
                            <p className="mt-1 text-sm break-words text-muted-foreground">
                                {job.company} • {job.location}
                            </p>
                        </div>

                        <BookmarkButton title={job.title} />
                    </div>

                    <div className="mt-3 flex flex-wrap items-center gap-2">
                        <span className="inline-flex h-6 items-center gap-1.5 rounded-md border border-border bg-muted/50 px-2 text-xs font-medium whitespace-nowrap text-muted-foreground">
                            <CircleDollarSign className="size-3.5" aria-hidden="true" />
                            {formatSalary(job)}
                        </span>

                        {job.badges.map((badge) => (
                            <JobBadgeChip key={badge.label} badge={badge} />
                        ))}
                    </div>
                </div>
            </div>
        </article>
    )
}
