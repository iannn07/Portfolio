import HomepageClient from './HomepageClient'
import { getSocialLinks } from '@/actions/social-links'

export const dynamic = 'force-dynamic'

export default async function Page() {
  const { github, linkedin, email, resume } = await getSocialLinks()

  return (
    <HomepageClient
      github={github}
      linkedin={linkedin}
      email={email}
      resume={resume}
    />
  )
}
