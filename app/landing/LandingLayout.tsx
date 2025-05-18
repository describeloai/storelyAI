import NewNavbar from '@/components/landing/Navbar'
import NewHero from './Hero'
import NewCTA from './CTA'

export default function NewLandingLayout() {
  return (
    <div>
      <NewNavbar />
      <main>
        <NewHero />     {/* 👈 esto debe estar */}
        <NewCTA />
      </main>
    </div>
  )
}
