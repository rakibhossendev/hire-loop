"use client"

import { useRouter } from "next/navigation"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { buildJobsHref, SORT_OPTIONS, type JobFilters, type SortKey } from "./jobs-data"

export function SortJobs({ filters }: { filters: JobFilters }) {
    const router = useRouter()

    function handleChange(value: string | null) {
        if (!value) return
        router.replace(
            buildJobsHref({ ...filters, sort: value as SortKey, page: 1 }),
            { scroll: false }
        )
    }

    return (
        <div className="flex items-center gap-2">
            <label htmlFor="sort-jobs" className="text-sm whitespace-nowrap text-muted-foreground">
                Sort by:
            </label>
            <Select items={SORT_OPTIONS} value={filters.sort} onValueChange={handleChange}>
                <SelectTrigger id="sort-jobs" className="w-[168px]">
                    <SelectValue />
                </SelectTrigger>
                <SelectContent>
                    {SORT_OPTIONS.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                            {option.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
        </div>
    )
}
