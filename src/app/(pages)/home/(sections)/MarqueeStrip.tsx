const ITEMS = [
  'Full-Stack Engineering',
  'Agentic AI Development',
  'System Architecture',
  'Community Leadership',
  'ELT Data Pipelines',
  'AI Integration',
  'Open Source',
  'Software Engineering',
  'DevOps & Infra',
]

export default function MarqueeStrip() {
  const doubled = [...ITEMS, ...ITEMS]

  return (
    <div className="marquee-strip" aria-hidden="true">
      <div className="marquee-track">
        {doubled.map((item, i) => (
          <span key={i} className="marquee-item">
            {item}
            <span className="marquee-dot" />
          </span>
        ))}
      </div>
    </div>
  )
}
