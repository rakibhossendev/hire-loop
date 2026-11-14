import { ApplyJobsType } from "@/Typescript/main";

export async function applyJobs(data: ApplyJobsType){
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/apply-jobs`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data),
    })

    return response.json();
}