import NavBar from '@/components/nav/NavBar'
import CustomCursor from '@/components/cursor/CustomCursor'
import Footer from '@/components/footer/Footer'
import HeroSection from './(sections)/HeroSection'
import MarqueeStrip from './(sections)/MarqueeStrip'
import AboutSection from './(sections)/AboutSection'
import FeaturedWorkSection from './(sections)/FeaturedWorkSection'
import ProjectsGridSection from './(sections)/ProjectsGridSection'
import ExperienceSection from './(sections)/ExperienceSection'
import PassionsSection from './(sections)/PassionsSection'
import SkillsSection from './(sections)/SkillsSection'
import ContactSection from './(sections)/ContactSection'

export default function Homepage() {
  return (
    <>
      <CustomCursor />
      <NavBar />
      <main>
        <HeroSection />
        <MarqueeStrip />
        <AboutSection />
        <FeaturedWorkSection />
        <ProjectsGridSection />
        <ExperienceSection />
        <PassionsSection />
        <SkillsSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  )
}
