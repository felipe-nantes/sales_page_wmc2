import { HeroVSLScroll } from '@/components/sections/HeroVSLScroll'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { CurriculumSection } from '@/components/sections/CurriculumSection'
import { AuthorSection } from '@/components/sections/AuthorSection'
import { SocialProofSection } from '@/components/sections/SocialProofSection'
import { OfferSection } from '@/components/sections/OfferSection'

export default function Home() {
  return (
    <main>
      <HeroVSLScroll />
      <ProblemSolutionSection />
      <CurriculumSection />
      <AuthorSection />
      <SocialProofSection />
      <OfferSection />
    </main>
  )
}
