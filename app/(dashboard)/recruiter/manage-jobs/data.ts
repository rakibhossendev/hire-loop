import type { JobType, SalaryFrequency } from "@/Typescript/mai"

// NOTE: This is static mock data for the Manage Job Posts UI.
// Once the backend API is ready, replace `mockJobPosts` with the API response.
// The `ManageJobPost` interface is designed to map closely to `CreateJobFormValues`.

export type JobPostStatus = "active" | "paused" | "closed"

export interface ManageJobPost {
    id: string;
    jobTitle: string;
    department: string;
    company: string;
    jobLocation: string;
    jobType: JobType;
    minSalary: string;
    maxSalary: string;
    salaryFrequency: SalaryFrequency;
    applicants: number;
    status: JobPostStatus;
    deadline: string; // formatted date, e.g. "May 29, 2025"
    postedAgo: string; // relative time, e.g. "Posted 4d ago"
}

export const mockJobPosts: ManageJobPost[] = [
    {
        id: "job-001",
        jobTitle: "Frontend Developer",
        department: "Design",
        company: "HirePulse Network",
        jobLocation: "Remote (New York, USA)",
        jobType: "full-time",
        minSalary: "25",
        maxSalary: "40",
        salaryFrequency: "hourly",
        applicants: 34,
        status: "active",
        deadline: "May 29, 2025",
        postedAgo: "Posted 4d ago",
    },
    {
        id: "job-002",
        jobTitle: "Backend Engineer",
        department: "Engineering & Tech",
        company: "HirePulse Labs",
        jobLocation: "London, UK",
        jobType: "full-time",
        minSalary: "90k",
        maxSalary: "115k",
        salaryFrequency: "yearly",
        applicants: 19,
        status: "active",
        deadline: "Jun 13, 2025",
        postedAgo: "Posted 1w ago",
    },
    {
        id: "job-003",
        jobTitle: "DevOps Specialist",
        department: "Infrastructure",
        company: "HirePulse Platform",
        jobLocation: "Berlin, Germany",
        jobType: "full-time",
        minSalary: "95k",
        maxSalary: "120k",
        salaryFrequency: "yearly",
        applicants: 12,
        status: "active",
        deadline: "Jun 29, 2025",
        postedAgo: "Posted 2w ago",
    },
    {
        id: "job-004",
        jobTitle: "Product Marketing Manager",
        department: "Marketing",
        company: "HirePulse Network",
        jobLocation: "Remote (London, UK)",
        jobType: "full-time",
        minSalary: "70k",
        maxSalary: "90k",
        salaryFrequency: "yearly",
        applicants: 8,
        status: "paused",
        deadline: "Jul 14, 2025",
        postedAgo: "Posted 3w ago",
    },
    {
        id: "job-005",
        jobTitle: "UI/UX Designer",
        department: "Design",
        company: "HirePulse Labs",
        jobLocation: "Amsterdam, Netherlands",
        jobType: "contract",
        minSalary: "35",
        maxSalary: "50",
        salaryFrequency: "hourly",
        applicants: 21,
        status: "active",
        deadline: "Jun 20, 2025",
        postedAgo: "Posted 1w ago",
    },
    {
        id: "job-006",
        jobTitle: "Data Analyst",
        department: "Engineering & Tech",
        company: "HirePulse Platform",
        jobLocation: "Remote (Berlin, Germany)",
        jobType: "internship",
        minSalary: "15",
        maxSalary: "20",
        salaryFrequency: "hourly",
        applicants: 5,
        status: "closed",
        deadline: "May 10, 2025",
        postedAgo: "Posted 1mo ago",
    },
]
