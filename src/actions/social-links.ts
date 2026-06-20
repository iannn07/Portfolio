'use server'

export async function getSocialLinks() {
  return {
    github: process.env.GITHUB_URL,
    linkedin: process.env.LINKEDIN_URL,
    email: process.env.EMAIL,
    resume: process.env.RESUME_URL,
  }
}
