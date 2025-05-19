import NewNavbar from '@/components/landing/Navbar'
import NewHero from './Hero'
import NewCTA from './CTA'
import ChamaTeamSection from '@/components/landing/ChamaTeamSection'
import ChamaIntroSection from '@/components/landing/ChamaIntroSection'
import ChamaFeatureSection from '@/components/landing/ChamaFeatureSection'
import ImageBannerSection from '@/components/landing/ImageBannerSection'

export default function NewLandingLayout() {
  return (
    <div>
      <NewNavbar />
      <main>
        <NewHero /> 
        <ChamaIntroSection />        {/* 👈 esto debe estar */}
        <ChamaTeamSection />
        <ChamaFeatureSection /> {/* 👈 nueva sección con los Chamas */}
        <ImageBannerSection /> 
        <NewCTA />
      </main>
    </div>
  )
}
