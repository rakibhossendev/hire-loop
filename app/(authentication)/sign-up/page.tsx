"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import {
  PasswordField,
  RoleField,
  TextField,
  type Role,
} from "@/app/(authentication)/_components/auth-fields"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { signUp } from "@/lib/auth-client"

type FieldKey = "name" | "email" | "image" | "password" | "confirm" | "role"

const initialValues = {
  name: "",
  email: "",
  image: "",
  password: "",
  confirm: "",
  role: "seeker" as Role,
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
  const [pending, setPending] = useState(false)

  function update<K extends keyof typeof initialValues>(
    key: K,
    value: (typeof initialValues)[K]
  ) {
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
        role: values.role,
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
      <Card className="w-full max-w-md rounded-2xl">
        <CardHeader>
          <h1 className="text-2xl font-bold tracking-tight">
            Create your account
          </h1>
          <CardDescription>
            Join HireLoop and start landing your next role.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} noValidate className="space-y-4">
            {formError && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {formError}
              </p>
            )}

            <TextField
              label="Full name"
              id="name"
              autoComplete="name"
              placeholder="John Doe"
              value={values.name}
              onChange={(value) => update("name", value)}
              error={errors.name}
            />

            <TextField
              label="Email"
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              value={values.email}
              onChange={(value) => update("email", value)}
              error={errors.email}
            />

            <TextField
              label="Image URL"
              id="image"
              type="url"
              placeholder="https://example.com/avatar.png"
              value={values.image}
              onChange={(value) => update("image", value)}
              error={errors.image}
            />

            <RoleField
              value={values.role}
              onChange={(value) => update("role", value)}
              error={errors.role}
            />

            <PasswordField
              label="Password"
              id="password"
              autoComplete="new-password"
              placeholder="At least 8 characters"
              value={values.password}
              onChange={(value) => update("password", value)}
              error={errors.password}
            />

            <PasswordField
              label="Retype password"
              id="confirm"
              autoComplete="new-password"
              placeholder="Repeat your password"
              value={values.confirm}
              onChange={(value) => update("confirm", value)}
              error={errors.confirm}
            />

            <Button
              type="submit"
              size="lg"
              disabled={pending}
              className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {pending ? "Creating account..." : "Create Account"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center gap-1 border-t bg-transparent text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href="/sign-in"
            className="font-medium text-brand hover:underline"
          >
            Sign In
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
