import { heroTagline } from '@/contents/Descriptions'

export default function HeroSection() {
  return (
    <section id="hero">
      <div className="hero-grid-lines" aria-hidden="true" />

      <div className="hero-content">
        <div className="hero-label">
          Software Engineer · Agentic AI Builder · Jakarta, ID
        </div>
        <h1 className="hero-name">
          <span className="hero-name-line">PRISTIAN</span>
          <span className="hero-name-line">BUDI</span>
          <span className="hero-name-line">DHARMAWAN</span>
        </h1>
        <div className="hero-alias">
          alias <em>Gunawan</em>
        </div>
      </div>

      <div className="hero-bottom">
        <p
          className="hero-tagline"
          dangerouslySetInnerHTML={{ __html: heroTagline }}
        />
        <div className="hero-meta">
          <a
            href="https://github.com/iannn07"
            target="_blank"
            rel="noopener noreferrer"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/pristian-budi-dharmawan/"
            target="_blank"
            rel="noopener noreferrer"
          >
            LinkedIn
          </a>
          <a href="mailto:pristian.dharmawan@gmail.com">Email</a>
          <span className="hero-index">PT Kalbe Farma — Software Engineer</span>
        </div>
      </div>
    </section>
  )
}
