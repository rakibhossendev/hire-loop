"use client"

import Link from "next/link"
import { ArrowLeftIcon, Building2Icon, MapPinIcon } from "lucide-react"
import { cn } from "cn"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

const JOB_CATEGORIES: Record<string, string> = {
    "engineering-tech": "Engineering & Tech",
    design: "Design & Creative",
    marketing: "Marketing & Sales",
    sales: "Sales & Business Dev",
    finance: "Finance & Legal",
    "customer-support": "Customer Support",
    "human-resources": "Human Resources",
    education: "Education & Training",
}

const JOB_TYPES = [
    { value: "full-time", label: "Full-Time" },
    { value: "part-time", label: "Part-Time" },
    { value: "contract", label: "Contract" },
    { value: "internship", label: "Internship" },
] as const

const SALARY_FREQUENCIES: Record<string, string> = {
    hour: "per hour",
    day: "per day",
    week: "per week",
    month: "per month",
    year: "per year",
}

function SectionHeading({ step, title }: { step: number; title: string }) {
    return (
        <CardHeader>
            <div className="flex items-center gap-3">
                <Badge className="size-6 rounded-md bg-brand px-0 text-brand-foreground">
                    {step}
                </Badge>
                <CardTitle className="text-lg">{title}</CardTitle>
            </div>
        </CardHeader>
    )
}

function Field({
    label,
    htmlFor,
    required,
    hint,
    children,
    className,
}: {
    label: string
    htmlFor?: string
    required?: boolean
    hint?: string
    children: React.ReactNode
    className?: string
}) {
    return (
        <div className={cn("flex flex-col gap-1.5", className)}>
            <Label htmlFor={htmlFor} className="gap-1">
                {label}
                {required ? <span className="text-destructive">*</span> : null}
            </Label>
            {children}
            {hint ? (
                <p className="text-xs text-muted-foreground">{hint}</p>
            ) : null}
        </div>
    )
}

export default function CreateJobPage() {
    return (
        <div className="mx-auto flex w-full max-w-4xl flex-col gap-6">
            {/* Page header */}
            <div className="flex flex-col gap-1.5">
                <Link
                    href="/recruiter"
                    className="inline-flex w-fit items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
                >
                    <ArrowLeftIcon className="size-4" />
                    Back to jobs
                </Link>
                <h1 className="font-heading text-2xl font-semibold tracking-tight">
                    Create Job
                </h1>
                <p className="text-sm text-muted-foreground">
                    Fill in the details below to publish a new job posting.
                </p>
            </div>

            {/* Section 1 — Job Details */}
            <Card className="rounded-2xl">
                <SectionHeading step={1} title="Job Details" />
                <CardContent className="flex flex-col gap-4">
                    <Field label="Job title" htmlFor="job-title">
                        <Input
                            id="job-title"
                            defaultValue="My New Job"
                            placeholder="e.g. Senior Frontend Developer"
                            className="h-10"
                        />
                    </Field>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Company name" htmlFor="company-name">
                            <div className="relative">
                                <Building2Icon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="company-name"
                                    defaultValue="Tom tom company"
                                    placeholder="e.g. Acme Inc."
                                    className="h-10 pl-9"
                                />
                            </div>
                        </Field>

                        <Field label="Job category" htmlFor="job-category">
                            <Select
                                items={JOB_CATEGORIES}
                                defaultValue="engineering-tech"
                            >
                                <SelectTrigger
                                    id="job-category"
                                    className="data-[size=default]:h-10 w-full"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(JOB_CATEGORIES).map(
                                        ([value, label]) => (
                                            <SelectItem
                                                key={value}
                                                value={value}
                                            >
                                                {label}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>

                    <Field label="Job type">
                        <ToggleGroup
                            defaultValue={["full-time"]}
                            className="w-full grid grid-cols-2 gap-2 sm:grid-cols-4"
                        >
                            {JOB_TYPES.map((type) => (
                                <ToggleGroupItem
                                    key={type.value}
                                    value={type.value}
                                    variant="outline"
                                    className="h-10 w-full aria-pressed:border-brand aria-pressed:bg-brand/10 aria-pressed:hover:bg-brand/15"
                                >
                                    {type.label}
                                </ToggleGroupItem>
                            ))}
                        </ToggleGroup>
                    </Field>
                </CardContent>
            </Card>

            {/* Section 2 — Location, Compensation & Timeline */}
            <Card className="rounded-2xl">
                <SectionHeading
                    step={2}
                    title="Location, Compensation & Timeline"
                />
                <CardContent className="flex flex-col gap-4">
                    <div className="flex items-center justify-between gap-4 rounded-xl border border-border bg-muted/40 p-4">
                        <div className="flex flex-col gap-1">
                            <p className="text-sm font-medium">
                                Remote work allowed
                            </p>
                            <p className="text-xs text-muted-foreground">
                                Enable worldwide or distributed candidate
                                applications
                            </p>
                        </div>
                        <Switch
                            defaultChecked
                            aria-label="Remote work allowed"
                            className="shrink-0"
                        />
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field
                            label="Job location"
                            htmlFor="job-location"
                            required
                            hint="Required"
                        >
                            <div className="relative">
                                <MapPinIcon className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                                <Input
                                    id="job-location"
                                    defaultValue="Dhaka"
                                    placeholder="e.g. Dhaka"
                                    className="h-10 pl-9"
                                />
                            </div>
                        </Field>

                        <Field
                            label="Application deadline"
                            htmlFor="deadline"
                        >
                            <Input
                                id="deadline"
                                type="date"
                                defaultValue="2026-04-12"
                                className="h-10 [color-scheme:light] dark:[color-scheme:dark]"
                            />
                        </Field>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        <Field label="Min salary / rate" htmlFor="min-salary">
                            <Input
                                id="min-salary"
                                type="number"
                                defaultValue={19000}
                                placeholder="e.g. 19000"
                                className="h-10"
                            />
                        </Field>

                        <Field label="Max salary / rate" htmlFor="max-salary">
                            <Input
                                id="max-salary"
                                type="number"
                                defaultValue={25000}
                                placeholder="e.g. 25000"
                                className="h-10"
                            />
                        </Field>

                        <Field
                            label="Frequency"
                            htmlFor="salary-frequency"
                            className="sm:col-span-2 lg:col-span-1"
                        >
                            <Select
                                items={SALARY_FREQUENCIES}
                                defaultValue="month"
                            >
                                <SelectTrigger
                                    id="salary-frequency"
                                    className="data-[size=default]:h-10 w-full"
                                >
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    {Object.entries(SALARY_FREQUENCIES).map(
                                        ([value, label]) => (
                                            <SelectItem
                                                key={value}
                                                value={value}
                                            >
                                                {label}
                                            </SelectItem>
                                        ),
                                    )}
                                </SelectContent>
                            </Select>
                        </Field>
                    </div>
                </CardContent>
            </Card>

            {/* Section 3 — Responsibilities & Requirements */}
            <Card className="rounded-2xl">
                <SectionHeading
                    step={3}
                    title="Responsibilities & Requirements"
                />
                <CardContent className="flex flex-col gap-4">
                    <Field
                        label="Key responsibilities"
                        htmlFor="responsibilities"
                        hint="Use one line per responsibility."
                    >
                        <Textarea
                            id="responsibilities"
                            placeholder={
                                "• Lead the design and delivery of new product features\n• Collaborate with design and backend teams\n• Review code and mentor junior engineers"
                            }
                            className="min-h-32"
                        />
                    </Field>

                    <Field
                        label="Minimum requirements"
                        htmlFor="requirements"
                        hint="Use one line per requirement."
                    >
                        <Textarea
                            id="requirements"
                            placeholder={
                                "• 4+ years of professional software development\n• Strong proficiency in React and TypeScript\n• Experience with modern CSS and accessibility"
                            }
                            className="min-h-32"
                        />
                    </Field>
                </CardContent>
            </Card>

            {/* Actions */}
            <div className="flex flex-col-reverse gap-2 sm:flex-row sm:justify-end">
                <Button
                    type="button"
                    variant="outline"
                    className="h-10 w-full sm:w-auto sm:px-6"
                >
                    Save as draft
                </Button>
                <Button
                    type="button"
                    className="h-10 w-full bg-brand text-brand-foreground hover:bg-brand/90 sm:w-auto sm:px-6"
                >
                    Publish job
                </Button>
            </div>
        </div>
    )
}
