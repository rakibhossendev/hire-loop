import { ManageJobPost } from "@/app/(dashboard)/recruiter/manage-jobs/data";
import { Button } from "@/components/ui/button";
import { EyeIcon, PencilIcon, Trash2Icon } from "lucide-react";

// Action buttons
export default function ActionButtons({ job }: { job: ManageJobPost }) {
    return (
        <div className="flex items-center gap-1">
            <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label={`View ${job.jobTitle}`}
                title="View Details"
                onClick={() => console.log("View:", job.id)}
            >
                <EyeIcon className="size-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:bg-muted hover:text-brand"
                aria-label={`Edit ${job.jobTitle}`}
                title="Edit Job"
                onClick={() => console.log("Edit:", job.id)}
            >
                <PencilIcon className="size-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500"
                aria-label={`Delete ${job.jobTitle}`}
                title="Delete Job"
                onClick={() => console.log("Delete:", job.id)}
            >
                <Trash2Icon className="size-4" />
            </Button>
        </div>
    )
}