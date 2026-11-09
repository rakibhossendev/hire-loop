"use client"

import { Menu, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import logo from "@/app/assets/logo.png"
import { useSession } from "@/lib/auth-client"
import { UserProfile } from "./UserProfile"

const navLinks = [
  { label: "Browse Jobs", href: "/browse-jobs" },
  { label: "Company", href: "#" },
  { label: "Pricing", href: "#" },
]

function NavLinks({ className = "" }: { className?: string }) {
  return (
    <>
      <nav className={className}>
        {navLinks.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <span className="hidden h-5 w-px bg-border md:block" aria-hidden="true" />
    </>
  )
}

function AuthArea({ onNavigate }: { onNavigate?: () => void }) {
  const { data: session } = useSession()
  const user = session?.user

  if (user) {
    return <UserProfile user={user} />
  }

  return (
    <>
      <Link
        href="/sign-in"
        onClick={onNavigate}
        className="text-sm font-medium text-brand hover:underline"
      >
        Sign In
      </Link>
      <Button
        size="lg"
        nativeButton={false}
        render={<Link href="/sign-up" onClick={onNavigate} />}
        className="bg-brand text-brand-foreground hover:bg-brand/90"
      >
        Get Started
      </Button>
    </>
  )
}

export function Navbar() {
  const [ open, setOpen ] = useState(false);
  const { data: session } = useSession();

  return (
    <header className="mx-auto mt-4 w-full max-w-7xl px-4">
      <div className="flex items-center justify-between rounded-xl border border-border bg-card px-6 py-3">
        <Link href="/" className="flex items-center" aria-label="hireloop home">
          <Image
            src={logo}
            alt="hireloop"
            width={154}
            height={44}
            priority
            className="h-8 w-auto md:h-9"
          />
        </Link>

        <div className="hidden items-center gap-5 md:flex">
          <NavLinks className="flex items-center gap-6" />
          <div className="flex items-center gap-4">
            <AuthArea />
          </div>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex size-9 items-center justify-center rounded-lg text-foreground transition-colors hover:bg-muted md:hidden"
        >
          {open ? (
            <X className="size-5" aria-hidden="true" />
          ) : (
            <Menu className="size-5" aria-hidden="true" />
          )}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="mt-2 flex flex-col gap-4 rounded-xl border border-border bg-card px-6 py-4 md:hidden"
        >
          <nav className="flex flex-col gap-3">
            {
              session?.user &&
              <Link href={`/${session?.user.role}`} className="text-sm text-muted-foreground transition-colors hover:text-foreground">Dashboard</Link>

            }
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                className="text-sm text-muted-foreground transition-colors hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <span className="h-px w-full bg-border" aria-hidden="true" />
          <div className="flex items-center justify-between gap-4">
            <AuthArea onNavigate={() => setOpen(false)} />
          </div>
        </div>
      )}
    </header>
  )
}
