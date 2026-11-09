export default function AuthenticationLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <main className="mx-auto w-full max-w-7xl px-4 pb-16">{children}</main>
}
