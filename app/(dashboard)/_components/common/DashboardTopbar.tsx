"use client"

import Image from "next/image"
import Link from "next/link"

import logo from "@/app/assets/logo.png"
import { SidebarTrigger } from "@/components/ui/sidebar"

export function DashboardTopbar() {
  return (
    <header className="sticky top-0 z-20 flex h-14 shrink-0 items-center gap-3 border-b border-border bg-background/95 px-4 backdrop-blur md:px-6">
      <SidebarTrigger />
      <Link href="/" className="md:hidden" aria-label="HireLoop home">
        <Image
          src={logo}
          alt="HireLoop"
          width={154}
          height={44}
          className="h-7 w-auto"
        />
      </Link>
    </header>
  )
}
