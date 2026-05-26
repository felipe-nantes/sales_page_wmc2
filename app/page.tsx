import { HeroSection } from '@/components/sections/HeroSection'
import { ProblemSolutionSection } from '@/components/sections/ProblemSolutionSection'
import { CurriculumSection } from '@/components/sections/CurriculumSection'

export default function Home() {
  return (
    <main>
      <HeroSection />
      <ProblemSolutionSection />
      <CurriculumSection />
    </main>
  )
}
