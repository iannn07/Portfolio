# Product Vision

> Part of the AI Software Factory — Design OS Layer
> Populated by /foundation:discover.
> More detailed than product-mission.md — covers user journeys and feature areas.

---

## Product Summary

A personal portfolio for Pristian Budi Dharmawan, a Software Engineer. The site presents his professional identity through a single, scroll-driven landing page with cinematic animations — designed to leave a strong impression on recruiters and collaborators at first visit.

---

## User Personas

### Persona 1: Recruiter

- **Context:** Reviewing dozens of candidates; opens the link from a job application or LinkedIn
- **Goals:** Quickly assess seniority, tech stack fit, and professionalism within 60 seconds
- **Pain points:** Most portfolios are text-heavy, hard to skim, or feel outdated

### Persona 2: Hiring Manager / Tech Lead

- **Context:** Already passed initial screening; doing a deeper review before an interview
- **Goals:** Understand real project depth, technical decisions, and problem-solving approach
- **Pain points:** Shallow project descriptions with no context on contribution or impact

### Persona 3: Developer Peer

- **Context:** Met at a meetup or online; curious about tools and tech choices
- **Goals:** See what stack Pristian uses, explore shared interests
- **Pain points:** Portfolios that list technologies without any evidence of real use

---

## Core User Journeys

### Journey 1: Quick scan (Recruiter)

```
Land on page → Hero section (name, title, intro) → Scroll to Experiences → 
Scroll to Projects → Find CV link → Exit or contact
```

### Journey 2: Deep review (Hiring Manager)

```
Land on page → Read intro / philosophy section → Scroll through all 8 sections →
Inspect project details → Review tech stack → Download CV
```

### Journey 3: Tech curiosity (Peer)

```
Land on page → Scroll to Tech Stack section → Browse projects →
Check social / GitHub links
```

---

## Feature Areas

These map to data files in `src/contents/` and sections in `src/app/(pages)/home/(sections)/`.

| Feature area   | Content file          | Description                                      |
| -------------- | --------------------- | ------------------------------------------------ |
| Hero / Intro   | Descriptions.tsx      | Name, title, and opening bio                     |
| Philosophy     | Philosophies.tsx      | Personal engineering principles                  |
| Experiences    | Experiences.tsx       | Career timeline with roles and companies         |
| Projects       | Projects.tsx          | Showcase of selected work with descriptions      |
| Tech Stack     | Stacks.tsx            | Technologies grouped by category                 |
| Navigation     | jumpSections.ts       | Sidebar jump links to each section               |

---

## Design Principles

1. **Motion with purpose** — animations communicate structure and guide attention, not decorate
2. **Dark and refined** — dark background (`#232323`) with light accent (`#ecebf3`); premium feel
3. **Content first** — layout and hierarchy serve the content; nothing competes with the text
4. **Mobile-ready** — every section is designed and tested at mobile breakpoints first
