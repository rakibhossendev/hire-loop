
export type JobType = "full-time" | "part-time" | "contract" | "internship"

export type SalaryFrequency = "hourly" | "monthly" | "yearly"

export interface CreateJobFormValues {
    recruiterEmail: string
    jobTitle: string
    company: string
    jobCategory: string
    jobType: JobType
    remoteAllowed: boolean
    jobLocation: string
    deadline: string
    minSalary: string
    maxSalary: string
    salaryFrequency: SalaryFrequency
    responsibilities: string
    requirements: string
}

export interface APIresponseType {
    success: boolean
    data?: CreateJobFormValues
}

// ---------- Manage Jobs ----------

export type JobPostStatus = "active" | "paused" | "closed"

export interface ManageJobPost {
    _id: string
    jobTitle: string
    department: string
    company: string
    jobLocation: string
    jobType: JobType
    minSalary: string
    maxSalary: string
    salaryFrequency: SalaryFrequency
    applicants: number
    status: JobPostStatus
    deadline: string
    postedAgo: string
}

// API Response
export interface GetJobsAPIResponseType {
    success: boolean
    data: ManageJobPost[]
}
