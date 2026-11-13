import { GetJobsAPIResponseType} from "@/Typescript/main";

export async function browseJobs(query: string = "") {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/browse-jobs?${query}`);
        const data: GetJobsAPIResponseType = await response.json()
        return data.data ?? []
    } catch (error) {
        console.log(error);
    }
}