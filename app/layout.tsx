import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { Navbar } from "@/app/(home-page)/_components/Navbar/Navbar"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <Navbar />
          <main className="mx-auto w-full max-w-7xl px-4 pb-16">
            {children}
          </main>
        </ThemeProvider>
      </body>
    </html>
  )
}
