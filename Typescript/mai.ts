export type JobType = 'full-time' | 'part-time' | 'contract' | 'internship';

export type SalaryFrequency = 'hourly' | 'monthly' | 'yearly';

export interface CreateJobFormValues {
    jobTitle: string;
    company: string;
    jobCategory: string;
    jobType: JobType;
    remoteAllowed: boolean;
    jobLocation: string;
    deadline: string;
    minSalary: string; // can be number if parsed
    maxSalary: string;
    salaryFrequency: SalaryFrequency;
    responsibilities: string;
    requirements: string;
}