import { Button } from '@/components/ui/button'
import Link from 'next/link'

function Homepage() {
  return (
    <div className="w-full">
      <div className="flex items-center justify-end">
        <Link href={'/projects'}>
          <Button>Click me!</Button>
        </Link>
      </div>
      <div className="h-20 w-full bg-zinc-500" />
    </div>
  )
}

export default Homepage
