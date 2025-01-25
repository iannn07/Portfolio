import Image from 'next/image'
import Link from 'next/link'

interface PhilosophyProps {
  title: string
  content: React.ReactNode
  badges: string[]
  start: number
  end: number
}

export const philosophies: PhilosophyProps[] = [
  {
    title: 'Start with Why?',
    content: (
      <div className="flex flex-col gap-2">
        <p>
          <span className="italic">&quot;We are here to give&quot;</span> -
          Simon Sinek
        </p>
        <p className="text-justify">
          In my professional experiences, I tend to leave some
          &quot;sparkles&quot; or legacies for others for long-lasting usage or
          similar. It also goes the same way when building several projects,
          writing code is just like writing a book, one of my principles as an
          SWE is my code should be readable, maintainable, scalable, and robust.
        </p>
        <p className="text-justify">
          Implementing this principle always helps me and my fellows to debug,
          re-use, and maintain. I believe these small details will have a
          tangible effect on others, especially another PIC who will maintain my
          code. Regardless of my developer life, I always aim to leave a legacy
          to others, whether tangible products or intangible products to others.
          And this is my Why.
        </p>
      </div>
    ),
    badges: ['Simon Sinek', 'Leadership', 'Continuous Learning', 'Innovation'],
    start: 0.4,
    end: 0.45,
  },
  {
    title: 'Negative Space Programming',
    content: (
      <div className="flex flex-col gap-5">
        <p className="text-justify">
          Since I watched the video from{' '}
          <span className="cursor-pointer text-background transition-all duration-300 hover:underline">
            <Link
              href="https://www.youtube.com/shorts/M-VU0fLjIUU"
              target="_blank"
              className="italic"
            >
              @theprimeagen
            </Link>
          </span>{' '}
          about Negative Space Programming, it has changed how I code as well.
          From &quot;If it works, it works&quot; to &quot;If this doesn&apos;t
          work, it should be either the source (API or DB responses) or my code
          is bad.&quot; Since then, I have tried implementing this philosophy in
          my code, which leads to four main things: scalable, maintainable,
          robust and fast.
        </p>

        <div className="flex flex-col justify-center gap-10 md:flex-row">
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <h1 className="text-center text-xl font-bold text-background md:text-left md:text-heading-6">
              Direct Usage of Raw Data
            </h1>
            <div className="h-28 w-28 text-center">
              <Image
                src="images/nsp/RP.svg"
                width={300}
                height={300}
                alt="Direct Usage"
                className="rounded-xl object-cover"
              />
            </div>
          </div>
          <div className="flex flex-col items-center gap-2 md:flex-row">
            <h1 className="text-center text-xl font-bold text-background md:text-left md:text-heading-6">
              Never Trust Any Raw Data
            </h1>
            <div className="h-28 w-28 text-center">
              <Image
                src="images/nsp/NSP.svg"
                width={400}
                height={400}
                alt="Direct Usage"
                className="rounded-xl object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    ),
    badges: [
      '@theprimeagen',
      'Engineering',
      'Problem Solving',
      'Early Error Detection',
    ],
    start: 0.6,
    end: 0.65,
  },
]
