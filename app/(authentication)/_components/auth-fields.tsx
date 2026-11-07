"use client"

import { Eye, EyeOff } from "lucide-react"
import { useState } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>
}

type TextFieldProps = {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  error?: string
  type?: string
  autoComplete?: string
  placeholder?: string
}

function TextField({
  label,
  id,
  value,
  onChange,
  error,
  type = "text",
  autoComplete,
  placeholder,
}: TextFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input
        id={id}
        type={type}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className="h-9"
      />
      <FieldError message={error} />
    </div>
  )
}

type PasswordFieldProps = {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  error?: string
  autoComplete?: string
  placeholder?: string
}

function PasswordField({
  label,
  id,
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}: PasswordFieldProps) {
  const [visible, setVisible] = useState(false)

  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          autoComplete={autoComplete}
          placeholder={placeholder}
          className="h-9 pr-10"
        />
        <button
          type="button"
          onClick={() => setVisible((shown) => !shown)}
          aria-label={visible ? "Hide password" : "Show password"}
          className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {visible ? (
            <EyeOff className="size-4" aria-hidden="true" />
          ) : (
            <Eye className="size-4" aria-hidden="true" />
          )}
        </button>
      </div>
      <FieldError message={error} />
    </div>
  )
}

type Role = "seeker" | "recruiter"

const roleOptions: { value: Role; label: string; description: string }[] = [
  {
    value: "seeker",
    label: "Job Seeker",
    description: "Find and land your next role",
  },
  {
    value: "recruiter",
    label: "Recruiter",
    description: "Hire top talent fast",
  },
]

function RoleField({
  value,
  onChange,
  error,
}: {
  value: Role
  onChange: (value: Role) => void
  error?: string
}) {
  return (
    <fieldset className="space-y-1.5">
      <legend className="text-sm font-medium text-foreground">Role</legend>
      <RadioGroup
        value={value}
        onValueChange={(selected) => onChange(selected as Role)}
        className="grid grid-cols-2 gap-2"
      >
        {roleOptions.map((role) => (
          <Label
            key={role.value}
            className="flex cursor-pointer items-start gap-2.5 rounded-lg border border-border p-3 transition-colors has-[data-checked]:border-brand has-[data-checked]:bg-brand/5"
          >
            <RadioGroupItem value={role.value} className="mt-0.5" />
            <span className="flex flex-col gap-0.5">
              <span className="text-sm font-medium text-foreground">
                {role.label}
              </span>
              <span className="text-xs text-muted-foreground">
                {role.description}
              </span>
            </span>
          </Label>
        ))}
      </RadioGroup>
      <FieldError message={error} />
    </fieldset>
  )
}

export { FieldError, PasswordField, RoleField, TextField }
export type { Role }
