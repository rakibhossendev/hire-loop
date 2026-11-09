"use client"

import { ChevronDown, SlidersHorizontal } from "lucide-react"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { cn } from "cn"
import { buildJobsHref, JOB_TYPE_OPTIONS, type JobFilters, type JobType } from "./jobs-data"

type JobFiltersProps = {
    filters: JobFilters
    counts: Record<JobType, number>
}

function formatCount(count: number): string {
    if (count >= 1000) {
        const thousands = count / 1000
        return `${thousands % 1 === 0 ? thousands : thousands.toFixed(1)}k`
    }
    return String(count)
}

export function JobFilters({ filters, counts }: JobFiltersProps) {
    const router = useRouter()
    const [open, setOpen] = useState(false)

    function toggleType(type: JobType) {
        const types = filters.types.includes(type)
            ? filters.types.filter((value) => value !== type)
            : [...filters.types, type]

        router.replace(buildJobsHref({ ...filters, types, page: 1 }), { scroll: false })
    }

    const activeCount = filters.types.length

    return (
        <div className="lg:sticky lg:top-4 lg:self-start">
            {/* Mobile/tablet toggle — sidebar is always visible from lg up */}
            <button
                type="button"
                onClick={() => setOpen((value) => !value)}
                aria-expanded={open}
                aria-controls="job-filters-panel"
                className="flex w-full items-center justify-between gap-2 rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-muted/60 lg:hidden"
            >
                <span className="flex items-center gap-2">
                    <SlidersHorizontal className="size-4 text-muted-foreground" aria-hidden="true" />
                    Filters
                    {activeCount > 0 && (
                        <span className="flex size-5 items-center justify-center rounded-full bg-brand text-[11px] font-semibold text-brand-foreground">
                            {activeCount}
                        </span>
                    )}
                </span>
                <ChevronDown
                    className={cn(
                        "size-4 text-muted-foreground transition-transform",
                        open && "rotate-180"
                    )}
                    aria-hidden="true"
                />
            </button>

            <div
                id="job-filters-panel"
                className={cn("mt-3 lg:mt-0 lg:block", open ? "block" : "hidden")}
            >
                <div className="rounded-xl border border-border bg-card p-5">
                    <h2 className="text-base font-semibold text-foreground">Filters</h2>

                    <fieldset className="mt-5">
                        <legend className="text-sm font-semibold text-foreground">
                            Job Type
                        </legend>

                        <div className="mt-2 flex flex-col">
                            {JOB_TYPE_OPTIONS.map((option) => {
                                const checked = filters.types.includes(option.value)

                                return (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-center gap-3 rounded-lg px-1 py-2 transition-colors hover:bg-muted/50"
                                    >
                                        <span className="relative flex size-4 shrink-0 items-center justify-center">
                                            <input
                                                type="checkbox"
                                                checked={checked}
                                                onChange={() => toggleType(option.value)}
                                                className="peer size-4 cursor-pointer appearance-none rounded-[4px] border border-input bg-transparent transition-colors checked:border-primary checked:bg-primary focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
                                            />
                                            <svg
                                                viewBox="0 0 16 16"
                                                fill="none"
                                                aria-hidden="true"
                                                className="pointer-events-none absolute size-3 text-primary-foreground opacity-0 transition-opacity peer-checked:opacity-100"
                                            >
                                                <path
                                                    d="M4 8.5l2.5 2.5L12 5"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                />
                                            </svg>
                                        </span>
                                        <span className="text-sm text-foreground">
                                            {option.label}
                                        </span>
                                        <span className="ml-auto text-xs text-muted-foreground tabular-nums">
                                            {formatCount(counts[option.value])}
                                        </span>
                                    </label>
                                )
                            })}
                        </div>
                    </fieldset>
                </div>
            </div>
        </div>
    )
}
