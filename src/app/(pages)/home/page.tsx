import HomepageClient from './HomepageClient'

export default function Page() {
  const github = process.env.GITHUB_URL
  const linkedin = process.env.LINKEDIN_URL
  const email = process.env.EMAIL
  const resume = process.env.RESUME_URL

  console.dir({ github, linkedin, email, resume })

  return (
    <HomepageClient
      github={process.env.GITHUB_URL}
      linkedin={process.env.LINKEDIN_URL}
      email={process.env.EMAIL}
      resume={process.env.RESUME_URL}
    />
  )
}
