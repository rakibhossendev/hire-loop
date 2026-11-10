import { ManageJobPost } from "@/app/(dashboard)/recruiter/manage-jobs/data";

// Job Avatar
export default function JobAvatar({ job }: { job: ManageJobPost }) {
    return (
        <div className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand/10 font-semibold text-brand">
            {job.jobTitle.charAt(0).toUpperCase()}
        </div>
    )
}
