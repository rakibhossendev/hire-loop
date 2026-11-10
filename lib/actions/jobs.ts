import { APIresponseType, CreateJobFormValues } from "@/Typescript/mai"

console.log(process.env.NEXT_PUBLIC_API_BASE_URL)
export const createJobs = async (data: CreateJobFormValues): Promise<APIresponseType> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/create-jobs`,{
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    return response.json()
}