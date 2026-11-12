import {GetJobsAPIResponseType, ManageJobPost,} from "@/Typescript/main"

export const getJobs = async (email: string): Promise<ManageJobPost[]> => {
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/manage-jobs/${encodeURIComponent(email)}`)
        if (!response.ok) {
            throw new Error("Failed to fetch job posts")
        }
        const data: GetJobsAPIResponseType = await response.json()
        return data.data ?? []

    } catch (error) {
        console.error("Get Jobs Error:", error)
        throw error
    }
}
