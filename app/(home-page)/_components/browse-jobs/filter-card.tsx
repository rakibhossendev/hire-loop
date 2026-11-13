
"use client"

import { useRouter } from "next/navigation"

const FILTER_OPTIONS = [
    {
        name: "jobTitle",
        label: "Job Title",
        options: [
            { label: "All", value: "" },
            { label: "Frontend Engineer", value: "Frontend Engineer" },
            { label: "Backend Engineer", value: "Backend Engineer" },
            { label: "Full Stack Developer", value: "Full Stack Developer" },
            { label: "Software Engineer", value: "Software Engineer" },
        ],
    },
    {
        name: "jobCategory",
        label: "Job Category",
        options: [
            { label: "All", value: "" },
            { label: "Engineering & Tech", value: "engineering-tech" },
            { label: "Design & Creative", value: "design" },
            { label: "Marketing & Sales", value: "marketing" },
            { label: "Finance & Legal", value: "finance" },
            { label: "Customer Support", value: "customer-support" },
            { label: "Human Resources", value: "human-resources" },
            { label: "Education & Training", value: "education" },
        ],
    },
    {
        name: "location",
        label: "Location",
        options: [
            { label: "All", value: "" },
            { label: "Dhaka", value: "Dhaka" },
            { label: "Jashore", value: "Jashore" },
            { label: "Khulna", value: "Khulna" },
            { label: "Chittagong", value: "Chittagong" },
            { label: "Remote", value: "Remote" },
        ],
    },
    {
        name: "jobType",
        label: "Job Type",
        options: [
            { label: "All", value: "" },
            { label: "Full-Time", value: "full-time" },
            { label: "Part-Time", value: "part-time" },
            { label: "Contract", value: "contract" },
            { label: "Internship", value: "internship" },
        ],
    },
    {
        name: "remoteAllowed",
        label: "Work Mode",
        options: [
            { label: "Any", value: "" },
            { label: "Remote", value: "true" },
            { label: "On-site", value: "false" },
        ],
    },
]

const labelClasses = "text-xs font-medium text-muted-foreground"

export function FilterCard() {
  const router = useRouter();
  const handleFilter = async (event: React.ChangeEvent<HTMLInputElement> ) => {
    const {name,value}  = event?.target
    const params = new URLSearchParams(location.search);
    params.set(name,value);
    router.push(`/browse-jobs?${params.toString()}`)
  }
    return (
        <div className="rounded-xl border border-border bg-card p-5">
            <h2 className="text-base font-semibold text-foreground">
                Filters
            </h2>

            <div className="mt-5 flex flex-col gap-5">
                {FILTER_OPTIONS.map((filter) => (
                    <div key={filter.name} className="space-y-3">
                        <h3 className={labelClasses}>
                            {filter.label}
                        </h3>

                        <div className="flex flex-col gap-2.5">
                            {filter.options.map((option) => (
                                <label
                                    key={option.value || "all"}
                                    className="flex cursor-pointer items-center gap-2.5 text-sm text-foreground"
                                >
                                    <input
                                        type="radio"
                                        name={filter.name}
                                        onChange={handleFilter}
                                        value={option.value}
                                        defaultChecked={option.value === ""}
                                        className="size-4 accent-primary"
                                    />

                                    {option.label}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
