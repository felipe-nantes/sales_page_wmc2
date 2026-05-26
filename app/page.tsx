import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { CurriculumSection } from '@/components/sections/CurriculumSection'
import { AuthorSection } from '@/components/sections/AuthorSection'
import { OfferSection } from '@/components/sections/OfferSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSolutionSection />
      <CurriculumSection />
      <AuthorSection />
      <OfferSection />
    </main>
  )
}
