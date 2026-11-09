"use client"

import { Bookmark, BookmarkCheck } from "lucide-react"
import { useState } from "react"

export function BookmarkButton({ title }: { title: string }) {
    const [saved, setSaved] = useState(false)

    return (
        <button
            type="button"
            onClick={() => setSaved((value) => !value)}
            aria-pressed={saved}
            aria-label={saved ? `Remove ${title} from saved jobs` : `Save ${title}`}
            title={saved ? "Remove from saved jobs" : "Save job"}
            className="flex size-8 shrink-0 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
            {saved ? (
                <BookmarkCheck className="size-4 text-brand" aria-hidden="true" />
            ) : (
                <Bookmark className="size-4" aria-hidden="true" />
            )}
        </button>
    )
}
