import {
  GetJobDetailAPIResponseType,
  GetJobsAPIResponseType,
} from "@/Typescript/main"

export async function browseJobs(query: string = "") {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/browse-jobs?${query}`
    )
    const data: GetJobsAPIResponseType = await response.json()
    return data.data ?? []
  } catch (error) {
    console.log(error)
  }
}

export async function getJobDetail(jobId: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/browse-jobs/${jobId}`
    )
    const data: GetJobDetailAPIResponseType = await response.json()
    return data.data ?? null
  } catch (error) {
    console.log(error)
  }
}
