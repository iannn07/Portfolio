import HomepageClient from './HomepageClient'

export default function Page() {
  return (
    <HomepageClient
      github={process.env.GITHUB_URL}
      linkedin={process.env.LINKEDIN_URL}
      email={process.env.EMAIL}
      resume={process.env.RESUME_URL}
    />
  )
}
