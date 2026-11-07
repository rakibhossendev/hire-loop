"use client"

import Image from "next/image"

import { Button } from "@/components/ui/button"
import { signOut } from "@/lib/auth-client"

function Avatar({ src, name }: { src?: string | null; name: string }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={`${name}'s profile picture`}
        width={32}
        height={32}
        className="size-8 rounded-full border border-border object-cover"
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-8 items-center justify-center rounded-full bg-brand/10 text-sm font-semibold text-brand"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

export function UserProfile({
  user,
}: {
  user: { name: string; image?: string | null }
}) {
  async function handleSignOut() {
    await signOut()
  }

  return (
    <div className="flex w-full flex-wrap items-center justify-between gap-3 md:w-auto md:justify-start md:gap-4">
      <div className="flex min-w-0 items-center gap-2.5">
        <Avatar src={user.image} name={user.name} />
        <span className="max-w-40 truncate text-sm text-muted-foreground">
          Welcome,{" "}
          <span className="font-medium text-foreground">{user.name}</span>
        </span>
      </div>
      <Button variant="outline" size="lg" onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  )
}
