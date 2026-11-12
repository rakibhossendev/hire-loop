"use client"

import { ManageJobPost } from "@/Typescript/main";
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
                onClick={() => console.log("View:", job._id)}
            >
                <EyeIcon className="size-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:bg-muted hover:text-brand"
                aria-label={`Edit ${job.jobTitle}`}
                title="Edit Job"
                onClick={() => console.log("Edit:", job._id)}
            >
                <PencilIcon className="size-4" />
            </Button>

            <Button
                variant="ghost"
                size="icon"
                className="size-8 text-muted-foreground hover:bg-rose-500/10 hover:text-rose-500"
                aria-label={`Delete ${job.jobTitle}`}
                title="Delete Job"
                onClick={() => console.log("Delete:", job._id)}
            >
                <Trash2Icon className="size-4" />
            </Button>
        </div>
    )
}