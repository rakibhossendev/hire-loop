import { SearchX } from "lucide-react"
import Link from "next/link"

export function EmptyState() {
    return (
        <div className="rounded-xl border border-border bg-card px-6 py-14 text-center">
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-muted">
                <SearchX className="size-6 text-muted-foreground" aria-hidden="true" />
            </div>
            <h3 className="mt-4 text-base font-semibold text-foreground">No jobs found</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
                Try adjusting your search or removing some filters to see more results.
            </p>
            <Link
                href="/browse-jobs"
                className="mt-5 inline-flex h-9 items-center justify-center rounded-lg border border-border bg-card px-4 text-sm font-medium text-foreground transition-colors hover:bg-muted"
            >
                Clear all filters
            </Link>
        </div>
    )
}
