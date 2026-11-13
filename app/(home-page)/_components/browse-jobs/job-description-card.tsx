import { CircleDollarSign, Laptop, Plane, ShieldCheck } from "lucide-react"

import type { JobDetailType } from "@/Typescript/main"

const BENEFIT_ICONS = [ShieldCheck, CircleDollarSign, Laptop, Plane]

function toLines(value: string | undefined): string[] {
  return (value ?? "")
    .split("\n")
    .map((line) => line.replace(/^[-•*\s]+/, "").trim())
    .filter(Boolean)
}

function Section({
  title,
  children,
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div>
      <h2 className="text-base font-semibold text-foreground">{title}</h2>
      <div className="mt-3">{children}</div>
    </div>
  )
}

export function JobDescriptionCard({ job }: { job: JobDetailType }) {
  const description = job.description ?? job.responsibilities
  const responsibilities = toLines(job.responsibilities)
  const requirements = toLines(job.requirements)
  const benefits = job.benefits ?? []

  return (
    <article className="flex flex-col gap-6 rounded-xl border border-border bg-card p-5 sm:p-6">
      <Section title="Job Description">
        <p className="text-sm leading-6 text-muted-foreground">{description}</p>
      </Section>

      {responsibilities.length > 0 && (
        <Section title="Responsibilities">
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
            {responsibilities.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {requirements.length > 0 && (
        <Section title="Requirements">
          {job.requirementTags && job.requirementTags.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              {job.requirementTags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex h-6 items-center rounded-md border border-border bg-muted/50 px-2 text-xs font-medium text-muted-foreground"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <ul className="flex list-disc flex-col gap-2 pl-5 text-sm text-muted-foreground">
            {requirements.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </Section>
      )}

      {benefits.length > 0 && (
        <Section title="Benefits">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {benefits.map((benefit, index) => {
              const Icon = BENEFIT_ICONS[index % BENEFIT_ICONS.length]

              return (
                <div
                  key={benefit}
                  className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5"
                >
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand/10 text-brand">
                    <Icon className="size-4" aria-hidden="true" />
                  </span>
                  <span className="text-sm text-foreground">{benefit}</span>
                </div>
              )
            })}
          </div>
        </Section>
      )}
    </article>
  )
}
