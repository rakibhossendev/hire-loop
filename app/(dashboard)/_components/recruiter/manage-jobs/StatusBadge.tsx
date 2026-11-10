import { JobPostStatus } from "@/app/(dashboard)/recruiter/manage-jobs/data";
import { Badge } from "@/components/ui/badge";


const STATUS_LABEL: Record<JobPostStatus, string> = {
    active: "Active",
    paused: "Paused",
    closed: "Closed",
}
const STATUS_BADGE_CLASS: Record<JobPostStatus, string> = {
    active: "border-emerald-500/20 bg-emerald-500/10 text-emerald-600",
    paused: "border-amber-500/20 bg-amber-500/10 text-amber-600",
    closed: "border-rose-500/20 bg-rose-500/10 text-rose-600",
}


// Status Badge
export default function StatusBadge({ status }: { status: JobPostStatus }) {
    return (
        <Badge
            variant="outline"
            className={STATUS_BADGE_CLASS[status]}
        >
            <span
                className={`mr-1.5 size-1.5 rounded-full ${
                    status === "active"
                        ? "bg-emerald-500"
                        : status === "paused"
                          ? "bg-amber-500"
                          : "bg-rose-500"
                }`}
            />
            {STATUS_LABEL[status]}
        </Badge>
    )
}