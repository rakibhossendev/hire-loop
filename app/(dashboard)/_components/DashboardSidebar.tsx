"use client"

import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Briefcase,
  FileText,
  LayoutDashboard,
  Settings,
  type LucideIcon,
} from "lucide-react"

import logo from "@/app/assets/logo.png"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
  useSidebar,
} from "@/components/ui/sidebar"
import { Skeleton } from "@/components/ui/skeleton"
import { useSession } from "@/lib/auth-client"

type Role = "admin" | "seeker" | "recruiter"

type MenuItem = {
  name: string
  url: string
  icon: LucideIcon
}

const roleHomePage: Record<Role, string> = {
  admin: "/admin",
  recruiter: "/recruiter",
  seeker: "/seeker",
}

const secondaryMenuItems: MenuItem[] = [
  { name: "Manage Jobs", url: "/manage-jobs", icon: Briefcase },
  { name: "Applications", url: "/applications", icon: FileText },
  { name: "Settings", url: "/settings", icon: Settings },
]

function normalizeRole(value: unknown): Role {
  return value === "admin" || value === "recruiter" ? value : "seeker"
}

function getMenuItems(role: Role): MenuItem[] {
  return [
    { name: "Dashboard", url: roleHomePage[role], icon: LayoutDashboard },
    ...secondaryMenuItems,
  ]
}

function Avatar({ src, name }: { src?: string | null; name: string }) {
  if (src) {
    return (
      <Image
        src={src}
        alt={`${name}'s profile picture`}
        width={48}
        height={48}
        className="size-12 shrink-0 rounded-full border border-border object-cover"
      />
    )
  }

  return (
    <span
      aria-hidden="true"
      className="flex size-12 shrink-0 items-center justify-center rounded-full bg-brand/10 text-base font-semibold text-brand"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  )
}

function UserCard() {
  const { data: session, isPending } = useSession()

  if (isPending) {
    return (
      <div className="rounded-xl border border-border bg-card p-3">
        <div className="flex items-center gap-3">
          <Skeleton className="size-12 rounded-full" />
          <div className="min-w-0 flex-1 space-y-2">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-16" />
          </div>
        </div>
        <Skeleton className="mt-2 h-6 w-32 rounded-full" />
      </div>
    )
  }

  const user = session?.user

  if (!user) return null

  const role = normalizeRole(user.role)

  return (
    <div className="rounded-xl border border-border bg-card p-3">
      <div className="flex items-center gap-3">
        <Avatar src={user.image} name={user.name} />
        <div className="min-w-0 flex-1">
          <p className="truncate text-sm font-semibold text-foreground">
            {user.name}
          </p>
          <p className="truncate text-xs text-muted-foreground capitalize">
            {role}
          </p>
          <span className="mt-1.5 inline-flex items-center rounded-full border border-brand/60 bg-brand/40 px-2.5 py-1 text-xs font-medium text-brand-foreground">
            Premium account
          </span>
        </div>
      </div>
    </div>
  )
}

export function DashboardSidebar() {
  const { data: session } = useSession()
  const { isMobile, setOpenMobile } = useSidebar()
  const pathname = usePathname()

  const menuItems = getMenuItems(normalizeRole(session?.user?.role))

  return (
    <Sidebar>
      <SidebarHeader className="gap-4 p-3">
        <Link
          href="/"
          aria-label="HireLoop home"
          className="w-fit rounded-md outline-hidden focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image
            src={logo}
            alt="HireLoop"
            width={154}
            height={44}
            className="h-8 w-auto"
          />
        </Link>
        <UserCard />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu className="gap-1">
              {menuItems.map((item) => {
                const isActive = pathname === item.url

                return (
                  <SidebarMenuItem
                    key={item.name}
                    className={
                      isActive
                        ? "after:absolute after:top-1 after:bottom-1 after:-left-2 after:w-1 after:rounded-r-full after:bg-brand"
                        : undefined
                    }
                  >
                    <SidebarMenuButton
                      size="lg"
                      isActive={isActive}
                      className="text-sidebar-foreground/70"
                      render={
                        <Link
                          href={item.url}
                          onClick={() => setOpenMobile(false)}
                        />
                      }
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {!isMobile && <SidebarRail />}
    </Sidebar>
  )
}
