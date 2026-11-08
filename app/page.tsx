import { HeroSection } from "@/app/(home-page)/_components/hero-section/hero-section"
import { Navbar } from "./(home-page)/_components/Navbar/Navbar"

export default function Page() {
  return (
    <main className="mx-auto w-full max-w-7xl px-4 pb-16">
      <Navbar />
      <HeroSection />
    </main>
  )
}
