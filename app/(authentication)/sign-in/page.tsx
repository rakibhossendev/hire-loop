"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

import {
  PasswordField,
  TextField,
} from "@/app/(authentication)/_components/auth-fields"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card"
import { signIn } from "@/lib/auth-client"

const initialValues = {
  email: "",
  password: "",
}

function validate(values: typeof initialValues) {
  const errors: { email?: string; password?: string } = {}

  if (!values.email.trim()) {
    errors.email = "Please enter your email"
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
    errors.email = "Please enter a valid email"
  }

  if (!values.password) {
    errors.password = "Please enter your password"
  }

  return errors
}

export default function SignInPage() {
  const router = useRouter()
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState<{
    email?: string
    password?: string
  }>({})
  const [formError, setFormError] = useState<string | null>(null)
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
      const { error } = await signIn.email({
        email: values.email.trim(),
        password: values.password,
      })

      if (error) {
        setFormError(error.message || "Sign in failed. Please try again.")
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
          <h1 className="text-2xl font-bold tracking-tight">Welcome back</h1>
          <CardDescription>Sign in to your HireLoop account.</CardDescription>
        </CardHeader>

        <CardContent>
          <form onSubmit={onSubmit} noValidate className="space-y-4">
            {formError && (
              <p className="rounded-lg border border-destructive/40 bg-destructive/10 px-3 py-2 text-sm text-destructive">
                {formError}
              </p>
            )}

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

            <PasswordField
              label="Password"
              id="password"
              autoComplete="current-password"
              placeholder="Your password"
              value={values.password}
              onChange={(value) => update("password", value)}
              error={errors.password}
            />

            <Button
              type="submit"
              size="lg"
              disabled={pending}
              className="w-full bg-brand text-brand-foreground hover:bg-brand/90"
            >
              {pending ? "Signing in..." : "Sign In"}
            </Button>
          </form>
        </CardContent>

        <CardFooter className="justify-center gap-1 border-t bg-transparent text-sm text-muted-foreground">
          Don&apos;t have an account?{" "}
          <Link
            href="/sign-up"
            className="font-medium text-brand hover:underline"
          >
            Sign Up
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}
