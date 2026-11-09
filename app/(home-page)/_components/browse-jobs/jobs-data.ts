import type { LucideIcon } from "lucide-react"
import {
    Atom,
    BarChart3,
    Boxes,
    Braces,
    Building2,
    Calculator,
    Clock,
    Cloud,
    Code,
    Container,
    Cpu,
    FileText,
    Flame,
    Globe,
    Headphones,
    Laptop,
    Layers,
    Megaphone,
    Palette,
    PenTool,
    Rocket,
    Server,
    ShieldCheck,
    Smartphone,
    Sparkles,
    Star,
    Terminal,
    TestTube,
    Users,
    Workflow,
    Zap,
} from "lucide-react"

export type JobType = "full-time" | "contract" | "freelance"

export const JOB_TYPE_OPTIONS: { value: JobType; label: string }[] = [
    { value: "full-time", label: "Full-time" },
    { value: "contract", label: "Contract" },
    { value: "freelance", label: "Freelance" },
]

const JOB_TYPE_VALUES = JOB_TYPE_OPTIONS.map((option) => option.value)

export const SORT_OPTIONS = [
    { value: "recent", label: "Most Recent" },
    { value: "salary-desc", label: "Salary: High to Low" },
    { value: "salary-asc", label: "Salary: Low to High" },
    { value: "title", label: "Title A-Z" },
] as const

export type SortKey = (typeof SORT_OPTIONS)[number]["value"]

export const PAGE_SIZE = 4

export type BadgeTone = "default" | "success" | "warning"

export type JobBadge = {
    label: string
    icon: LucideIcon
    tone?: BadgeTone
}

export type Job = {
    id: string
    title: string
    company: string
    location: string
    type: JobType
    salaryMin: number
    salaryMax: number
    badges: JobBadge[]
    /** Days ago the job was posted — lower is more recent. */
    postedDaysAgo: number
    logoIcon: LucideIcon
    logoClassName: string
}

export const JOBS: Job[] = [
    {
        id: "senior-product-designer",
        title: "Senior Product Designer",
        company: "TechFlow Systems",
        location: "San Francisco, CA (Remote)",
        type: "full-time",
        salaryMin: 140_000,
        salaryMax: 180_000,
        badges: [
            { label: "Full-time", icon: Clock },
            { label: "Easy Apply", icon: Zap, tone: "success" },
        ],
        postedDaysAgo: 1,
        logoIcon: Terminal,
        logoClassName: "bg-cyan-500/10 text-cyan-400",
    },
    {
        id: "lead-frontend-engineer",
        title: "Lead Frontend Engineer",
        company: "FinGrid Solutions",
        location: "New York, NY",
        type: "full-time",
        salaryMin: 165_000,
        salaryMax: 210_000,
        badges: [{ label: "Hybrid", icon: Laptop }],
        postedDaysAgo: 2,
        logoIcon: Code,
        logoClassName: "bg-blue-500/10 text-blue-400",
    },
    {
        id: "ux-researcher",
        title: "UX Researcher",
        company: "CreativeStudio",
        location: "Austin, TX",
        type: "contract",
        salaryMin: 110_000,
        salaryMax: 145_000,
        badges: [{ label: "Contract", icon: FileText }],
        postedDaysAgo: 3,
        logoIcon: Palette,
        logoClassName: "bg-pink-500/10 text-pink-400",
    },
    {
        id: "machine-learning-engineer",
        title: "Machine Learning Engineer",
        company: "HealthAI Corp",
        location: "Boston, MA (Remote)",
        type: "full-time",
        salaryMin: 180_000,
        salaryMax: 250_000,
        badges: [
            { label: "Senior", icon: Star },
            { label: "Hot Job", icon: Flame, tone: "warning" },
        ],
        postedDaysAgo: 1,
        logoIcon: Atom,
        logoClassName: "bg-violet-500/10 text-violet-400",
    },
    {
        id: "devops-engineer",
        title: "DevOps Engineer",
        company: "CloudScale",
        location: "Seattle, WA",
        type: "full-time",
        salaryMin: 150_000,
        salaryMax: 195_000,
        badges: [
            { label: "Full-time", icon: Clock },
            { label: "Remote", icon: Globe },
        ],
        postedDaysAgo: 4,
        logoIcon: Cloud,
        logoClassName: "bg-sky-500/10 text-sky-400",
    },
    {
        id: "content-strategist",
        title: "Content Strategist",
        company: "BrightVoice Media",
        location: "Portland, OR (Remote)",
        type: "freelance",
        salaryMin: 70_000,
        salaryMax: 95_000,
        badges: [{ label: "Freelance", icon: Globe }],
        postedDaysAgo: 5,
        logoIcon: Megaphone,
        logoClassName: "bg-amber-500/10 text-amber-400",
    },
    {
        id: "product-manager",
        title: "Product Manager",
        company: "NovaRetail",
        location: "Chicago, IL",
        type: "full-time",
        salaryMin: 155_000,
        salaryMax: 200_000,
        badges: [
            { label: "Full-time", icon: Clock },
            { label: "Senior", icon: Star },
        ],
        postedDaysAgo: 2,
        logoIcon: Rocket,
        logoClassName: "bg-orange-500/10 text-orange-400",
    },
    {
        id: "react-native-developer",
        title: "React Native Developer",
        company: "AppNest Labs",
        location: "Los Angeles, CA",
        type: "contract",
        salaryMin: 120_000,
        salaryMax: 160_000,
        badges: [
            { label: "Contract", icon: FileText },
            { label: "Easy Apply", icon: Zap, tone: "success" },
        ],
        postedDaysAgo: 6,
        logoIcon: Smartphone,
        logoClassName: "bg-teal-500/10 text-teal-400",
    },
    {
        id: "data-analyst",
        title: "Data Analyst",
        company: "MarketMinds",
        location: "Denver, CO (Remote)",
        type: "full-time",
        salaryMin: 95_000,
        salaryMax: 130_000,
        badges: [{ label: "Full-time", icon: Clock }],
        postedDaysAgo: 3,
        logoIcon: BarChart3,
        logoClassName: "bg-emerald-500/10 text-emerald-400",
    },
    {
        id: "backend-engineer-go",
        title: "Backend Engineer (Go)",
        company: "ServerForge",
        location: "Remote",
        type: "full-time",
        salaryMin: 160_000,
        salaryMax: 205_000,
        badges: [
            { label: "Full-time", icon: Clock },
            { label: "Remote", icon: Globe },
        ],
        postedDaysAgo: 1,
        logoIcon: Server,
        logoClassName: "bg-red-500/10 text-red-400",
    },
    {
        id: "brand-designer",
        title: "Brand Designer",
        company: "StudioKite",
        location: "Brooklyn, NY",
        type: "freelance",
        salaryMin: 80_000,
        salaryMax: 110_000,
        badges: [
            { label: "Freelance", icon: Globe },
            { label: "New", icon: Sparkles, tone: "success" },
        ],
        postedDaysAgo: 2,
        logoIcon: PenTool,
        logoClassName: "bg-fuchsia-500/10 text-fuchsia-400",
    },
    {
        id: "cybersecurity-analyst",
        title: "Cybersecurity Analyst",
        company: "IronWall Security",
        location: "Washington, DC",
        type: "full-time",
        salaryMin: 140_000,
        salaryMax: 185_000,
        badges: [
            { label: "Full-time", icon: Clock },
            { label: "Hot Job", icon: Flame, tone: "warning" },
        ],
        postedDaysAgo: 4,
        logoIcon: ShieldCheck,
        logoClassName: "bg-rose-500/10 text-rose-400",
    },
    {
        id: "technical-writer",
        title: "Technical Writer",
        company: "DocuWorks",
        location: "Remote",
        type: "contract",
        salaryMin: 85_000,
        salaryMax: 115_000,
        badges: [{ label: "Contract", icon: FileText }],
        postedDaysAgo: 7,
        logoIcon: FileText,
        logoClassName: "bg-slate-500/10 text-slate-400",
    },
    {
        id: "sales-development-rep",
        title: "Sales Development Rep",
        company: "GrowthLoop",
        location: "Miami, FL",
        type: "full-time",
        salaryMin: 70_000,
        salaryMax: 100_000,
        badges: [{ label: "Full-time", icon: Clock }],
        postedDaysAgo: 5,
        logoIcon: Users,
        logoClassName: "bg-indigo-500/10 text-indigo-400",
    },
    {
        id: "qa-automation-engineer",
        title: "QA Automation Engineer",
        company: "TestBench",
        location: "Phoenix, AZ (Remote)",
        type: "contract",
        salaryMin: 105_000,
        salaryMax: 140_000,
        badges: [
            { label: "Contract", icon: FileText },
            { label: "Easy Apply", icon: Zap, tone: "success" },
        ],
        postedDaysAgo: 3,
        logoIcon: TestTube,
        logoClassName: "bg-lime-500/10 text-lime-400",
    },
    {
        id: "senior-ios-engineer",
        title: "Senior iOS Engineer",
        company: "PocketGear",
        location: "San Francisco, CA",
        type: "full-time",
        salaryMin: 170_000,
        salaryMax: 215_000,
        badges: [
            { label: "Full-time", icon: Clock },
            { label: "Senior", icon: Star },
        ],
        postedDaysAgo: 2,
        logoIcon: Cpu,
        logoClassName: "bg-cyan-500/10 text-cyan-400",
    },
    {
        id: "hr-business-partner",
        title: "HR Business Partner",
        company: "PeopleFirst",
        location: "Boston, MA",
        type: "full-time",
        salaryMin: 100_000,
        salaryMax: 135_000,
        badges: [{ label: "Full-time", icon: Clock }],
        postedDaysAgo: 8,
        logoIcon: Building2,
        logoClassName: "bg-green-500/10 text-green-400",
    },
    {
        id: "growth-marketing-manager",
        title: "Growth Marketing Manager",
        company: "AdSpark",
        location: "Remote",
        type: "full-time",
        salaryMin: 115_000,
        salaryMax: 150_000,
        badges: [
            { label: "Full-time", icon: Clock },
            { label: "Remote", icon: Globe },
        ],
        postedDaysAgo: 4,
        logoIcon: Workflow,
        logoClassName: "bg-purple-500/10 text-purple-400",
    },
    {
        id: "cloud-architect",
        title: "Cloud Architect",
        company: "StratusOps",
        location: "Austin, TX",
        type: "full-time",
        salaryMin: 185_000,
        salaryMax: 235_000,
        badges: [
            { label: "Senior", icon: Star },
            { label: "Hot Job", icon: Flame, tone: "warning" },
        ],
        postedDaysAgo: 1,
        logoIcon: Boxes,
        logoClassName: "bg-blue-500/10 text-blue-400",
    },
    {
        id: "junior-frontend-developer",
        title: "Junior Frontend Developer",
        company: "CodeCamp",
        location: "Remote",
        type: "full-time",
        salaryMin: 65_000,
        salaryMax: 85_000,
        badges: [
            { label: "Full-time", icon: Clock },
            { label: "New", icon: Sparkles, tone: "success" },
        ],
        postedDaysAgo: 1,
        logoIcon: Braces,
        logoClassName: "bg-green-500/10 text-green-400",
    },
    {
        id: "video-editor",
        title: "Video Editor",
        company: "ReelWorks",
        location: "Los Angeles, CA",
        type: "freelance",
        salaryMin: 60_000,
        salaryMax: 90_000,
        badges: [{ label: "Freelance", icon: Globe }],
        postedDaysAgo: 6,
        logoIcon: Layers,
        logoClassName: "bg-violet-500/10 text-violet-400",
    },
    {
        id: "financial-analyst",
        title: "Financial Analyst",
        company: "Ledger & Co.",
        location: "New York, NY",
        type: "full-time",
        salaryMin: 105_000,
        salaryMax: 140_000,
        badges: [{ label: "Full-time", icon: Clock }],
        postedDaysAgo: 5,
        logoIcon: Calculator,
        logoClassName: "bg-emerald-500/10 text-emerald-400",
    },
    {
        id: "customer-support-specialist",
        title: "Customer Support Specialist",
        company: "HelpHive",
        location: "Remote",
        type: "contract",
        salaryMin: 55_000,
        salaryMax: 75_000,
        badges: [
            { label: "Contract", icon: FileText },
            { label: "Easy Apply", icon: Zap, tone: "success" },
        ],
        postedDaysAgo: 2,
        logoIcon: Headphones,
        logoClassName: "bg-cyan-500/10 text-cyan-400",
    },
    {
        id: "platform-engineer",
        title: "Platform Engineer (Kubernetes)",
        company: "OrbitCloud",
        location: "Denver, CO",
        type: "full-time",
        salaryMin: 175_000,
        salaryMax: 220_000,
        badges: [
            { label: "Full-time", icon: Clock },
            { label: "Hot Job", icon: Flame, tone: "warning" },
        ],
        postedDaysAgo: 3,
        logoIcon: Container,
        logoClassName: "bg-indigo-500/10 text-indigo-400",
    },
]

export type JobFilters = {
    q: string
    types: JobType[]
    sort: SortKey
    page: number
}

export function parseFilters(searchParams: Record<string, string | string[] | undefined>): JobFilters {
    const q = typeof searchParams.q === "string" ? searchParams.q : ""

    const rawTypes = typeof searchParams.type === "string" ? searchParams.type.split(",") : []
    const types = rawTypes.filter((type): type is JobType =>
        JOB_TYPE_VALUES.includes(type as JobType)
    )

    const sort =
        typeof searchParams.sort === "string" &&
        SORT_OPTIONS.some((option) => option.value === searchParams.sort)
            ? (searchParams.sort as SortKey)
            : "recent"

    const rawPage = typeof searchParams.page === "string" ? searchParams.page : ""
    const page = /^\d+$/.test(rawPage) ? Math.max(1, Number.parseInt(rawPage, 10)) : 1

    return { q, types, sort, page }
}

export function buildJobsHref(filters: JobFilters): string {
    const params = new URLSearchParams()

    if (filters.q.trim()) params.set("q", filters.q.trim())
    if (filters.types.length > 0) params.set("type", filters.types.join(","))
    if (filters.sort !== "recent") params.set("sort", filters.sort)
    if (filters.page > 1) params.set("page", String(filters.page))

    const queryString = params.toString()
    return queryString ? `/browse-jobs?${queryString}` : "/browse-jobs"
}

export function matchesQuery(job: Job, q: string): boolean {
    const query = q.trim().toLowerCase()
    if (!query) return true

    return [job.title, job.company, job.location].some((value) =>
        value.toLowerCase().includes(query)
    )
}

export function filterJobs(
    jobs: Job[],
    filters: Pick<JobFilters, "q" | "types">
): Job[] {
    return jobs.filter((job) => {
        if (!matchesQuery(job, filters.q)) return false
        if (filters.types.length > 0 && !filters.types.includes(job.type)) return false
        return true
    })
}

export function countJobTypes(jobs: Job[], q: string): Record<JobType, number> {
    const counts = { "full-time": 0, contract: 0, freelance: 0 } as Record<JobType, number>

    for (const job of jobs) {
        if (matchesQuery(job, q)) counts[job.type] += 1
    }

    return counts
}

export function sortJobs(jobs: Job[], sort: SortKey): Job[] {
    const list = [...jobs]

    switch (sort) {
        case "salary-desc":
            return list.sort((a, b) => b.salaryMax - a.salaryMax)
        case "salary-asc":
            return list.sort((a, b) => a.salaryMax - b.salaryMax)
        case "title":
            return list.sort((a, b) => a.title.localeCompare(b.title))
        case "recent":
        default:
            return list.sort((a, b) => a.postedDaysAgo - b.postedDaysAgo)
    }
}

export function paginate(jobs: Job[], page: number, pageSize = PAGE_SIZE): Job[] {
    const start = (page - 1) * pageSize
    return jobs.slice(start, start + pageSize)
}

export function totalPagesFor(total: number, pageSize = PAGE_SIZE): number {
    return Math.max(1, Math.ceil(total / pageSize))
}

export function formatSalary(job: Pick<Job, "salaryMin" | "salaryMax">): string {
    const min = Math.round(job.salaryMin / 1000)
    const max = Math.round(job.salaryMax / 1000)
    return `$${min}k - $${max}k`
}

/** Page numbers with "…" gaps, e.g. [1, 2, "…", 8]. */
export function buildPageItems(page: number, totalPages: number): (number | "…")[] {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, index) => index + 1)
    }

    const pages = new Set<number>([1, totalPages, page - 1, page, page + 1])
    const sorted = [...pages]
        .filter((value) => value >= 1 && value <= totalPages)
        .sort((a, b) => a - b)

    const items: (number | "…")[] = []
    let previous = 0

    for (const value of sorted) {
        if (value - previous > 1) items.push("…")
        items.push(value)
        previous = value
    }

    return items
}
