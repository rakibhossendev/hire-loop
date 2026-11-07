"use client"

import { Eye, EyeOff } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { signUp } from "@/lib/auth-client"

type FieldKey = "name" | "email" | "image" | "password" | "confirm"

const initialValues = {
  name: "",
  email: "",
  image: "",
  password: "",
  confirm: "",
}

const inputClass =
  "w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-ring focus:ring-2 focus:ring-ring/50"

function FieldError({ message }: { message?: string }) {
  if (!message) return null
  return <p className="mt-1.5 text-xs text-destructive">{message}</p>
}

function validate(values: typeof initialValues) {
  const errors: Partial<Record<FieldKey, string>> = {}

  if (!values.name.trim()) {
    errors.name = "Please enter your full name"
  }

  if (!values.email.trim()) {
    errors.email = "Please enter your email"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email"
  }

  if (!values.image.trim()) {
    errors.image = "Please enter an image URL"
  } else {
    try {
      const url = new URL(values.image.trim())
      if (!/^https?:$/.test(url.protocol)) throw new Error("bad protocol")
    } catch {
      errors.image = "Please enter a valid URL (https://...)"
    }
  }

  if (!values.password) {
    errors.password = "Please enter a password"
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters"
  }

  if (!values.confirm) {
    errors.confirm = "Please retype your password"
  } else if (values.confirm !== values.password) {
    errors.confirm = "Passwords do not match"
  }

  return errors
}

export default function SignUpPage() {
  const router = useRouter()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<Partial<Record<FieldKey, string>>>({})
  const [formError, setFormError] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirm, setShowConfirm] = useState(false)
  const [pending, setPending] = useState(false)

  function update(key: keyof typeof initialValues, value: string) {
    setValues((previous) => ({ ...previous, [key]: value }))
    setErrors((previous) => ({ ...previous, [key]: undefined }))
    setFormError(null)
  }

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setFormError(null)

    const nextErrors = validate(values)
    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors)
      return
    }

    setPending(true)
    try {
      const { error } = await signUp.email({
        name: values.name.trim(),
        email: values.email.trim(),
        password: values.password,
        image: values.image.trim(),
      })

      if (error) {
        setFormError(error.message || "Sign up failed. Please try again.")
        return
      }

      router.push("/")
    } catch {
      setFormError("Something went wrong. Please try again.")
    } finally {
      setPending(false)
    }
  }

  return (
    <div className="flex justify-center px-4 py-10">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-6 md:p-8">
        <h1 className="text-2xl font-bold tracking-tight">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Join HireLoop and start landing your next role.
        </p>

        <form onSubmit={onSubmit} noValidate className="mt-6 space-y-4">
          {formError && (
            <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {formError}
            </p>
          )}

          <div>
            <label
              htmlFor="name"
              className="text-sm font-medium text-foreground"
            >
              Full name
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              value={values.name}
              onChange={(event) => update("name", event.target.value)}
              placeholder="John Doe"
              className={`${inputClass} mt-1.5`}
            />
            <FieldError message={errors.name} />
          </div>

          <div>
            <label
              htmlFor="email"
              className="text-sm font-medium text-foreground"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={values.email}
              onChange={(event) => update("email", event.target.value)}
              placeholder="you@example.com"
              className={`${inputClass} mt-1.5`}
            />
            <FieldError message={errors.email} />
          </div>

          <div>
            <label
              htmlFor="image"
              className="text-sm font-medium text-foreground"
            >
              Image URL
            </label>
            <input
              id="image"
              type="url"
              value={values.image}
              onChange={(event) => update("image", event.target.value)}
              placeholder="https://example.com/avatar.png"
              className={`${inputClass} mt-1.5`}
            />
            <FieldError message={errors.image} />
          </div>

          <div>
            <label
              htmlFor="password"
              className="text-sm font-medium text-foreground"
            >
              Password
            </label>
            <div className="relative mt-1.5">
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="new-password"
                value={values.password}
                onChange={(event) => update("password", event.target.value)}
                placeholder="At least 8 characters"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((visible) => !visible)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {showPassword ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            <FieldError message={errors.password} />
          </div>

          <div>
            <label
              htmlFor="confirm"
              className="text-sm font-medium text-foreground"
            >
              Retype password
            </label>
            <div className="relative mt-1.5">
              <input
                id="confirm"
                type={showConfirm ? "text" : "password"}
                autoComplete="new-password"
                value={values.confirm}
                onChange={(event) => update("confirm", event.target.value)}
                placeholder="Repeat your password"
                className={`${inputClass} pr-10`}
              />
              <button
                type="button"
                onClick={() => setShowConfirm((visible) => !visible)}
                aria-label={showConfirm ? "Hide password" : "Show password"}
                className="absolute inset-y-0 right-0 flex w-10 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
              >
                {showConfirm ? (
                  <EyeOff className="size-4" aria-hidden="true" />
                ) : (
                  <Eye className="size-4" aria-hidden="true" />
                )}
              </button>
            </div>
            <FieldError message={errors.confirm} />
          </div>

          <Button
            type="submit"
            size="lg"
            disabled={pending}
            className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
          >
            {pending ? "Creating account..." : "Create Account"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link href="#" className="font-medium text-brand hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
