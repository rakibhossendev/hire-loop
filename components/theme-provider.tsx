"use client"

import * as React from "react"
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes"

function ForceDark() {
  const { setTheme } = useTheme()

  React.useEffect(() => {
    setTheme("dark")
  }, [setTheme])

  return null
}

function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="dark"
      disableTransitionOnChange
      {...props}
    >
      <ForceDark />
      {children}
    </NextThemesProvider>
  )
}

export { ThemeProvider }
