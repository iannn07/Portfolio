import { Button } from "@/components/ui/button"
import Link from "next/link"

function Homepage() {
  return (
    <div className="min-h-screen dark:bg-black">
      Homepage!
      <Link href={"/projects"}>
        <Button>Click me!</Button>
      </Link>
    </div>
  )
}

export default Homepage
