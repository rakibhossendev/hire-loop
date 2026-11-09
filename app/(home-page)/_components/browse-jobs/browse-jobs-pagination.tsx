import { ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"

import { cn } from "cn"
import { buildJobsHref, buildPageItems, type JobFilters } from "./jobs-data"

type BrowseJobsPaginationProps = {
    filters: JobFilters
    page: number
    totalPages: number
}

const pillClasses =
    "flex size-8 items-center justify-center rounded-lg border text-sm font-medium transition-colors"

export function BrowseJobsPagination({
    filters,
    page,
    totalPages,
}: BrowseJobsPaginationProps) {
    if (totalPages <= 1) return null

    const items = buildPageItems(page, totalPages)

    return (
        <nav
            aria-label="Job results pages"
            className="mt-8 flex flex-wrap items-center justify-center gap-2"
        >
            {page > 1 ? (
                <Link
                    href={buildJobsHref({ ...filters, page: page - 1 })}
                    aria-label="Previous page"
                    className={cn(
                        pillClasses,
                        "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                </Link>
            ) : (
                <span
                    aria-hidden="true"
                    className={cn(pillClasses, "border-border bg-card text-muted-foreground/40")}
                >
                    <ChevronLeft className="size-4" aria-hidden="true" />
                </span>
            )}

            {items.map((item, index) =>
                item === "…" ? (
                    <span
                        key={`gap-${index}`}
                        aria-hidden="true"
                        className="flex size-8 items-center justify-center text-sm text-muted-foreground"
                    >
                        …
                    </span>
                ) : (
                    <Link
                        key={item}
                        href={buildJobsHref({ ...filters, page: item })}
                        aria-current={item === page ? "page" : undefined}
                        aria-label={`Page ${item}`}
                        className={cn(
                            pillClasses,
                            item === page
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                        )}
                    >
                        {item}
                    </Link>
                )
            )}

            {page < totalPages ? (
                <Link
                    href={buildJobsHref({ ...filters, page: page + 1 })}
                    aria-label="Next page"
                    className={cn(
                        pillClasses,
                        "border-border bg-card text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                >
                    <ChevronRight className="size-4" aria-hidden="true" />
                </Link>
            ) : (
                <span
                    aria-hidden="true"
                    className={cn(pillClasses, "border-border bg-card text-muted-foreground/40")}
                >
                    <ChevronRight className="size-4" aria-hidden="true" />
                </span>
            )}
        </nav>
    )
}
