import { Separator } from '@/components/ui/separator'
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

function HomeSection4() {
  const container = useRef(null)

  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start end', 'end start'],
  })

  const expandSeparator = useTransform(scrollYProgress, [0, 0.25], [0, 100])
  const separatorDynamicWidth = useTransform(expandSeparator, (v) => `${v}%`)

  const scale = useTransform(scrollYProgress, [0.1, 0.3], [0.4, 1])
  const slideBox = useTransform(scrollYProgress, [0.1, 0.3], [150, 0])
  const showPatronus = useTransform(scrollYProgress, [0.1, 0.3], [0, 1])

  return (
    <div ref={container} className="flex min-h-screen w-full flex-col gap-5">
      <div className="flex w-full flex-col justify-center gap-2">
        <h1 className="text-heading-1 font-bold">Expecto Patronum!</h1>
        <motion.div
          style={{ width: separatorDynamicWidth }}
          className="max-w-full"
        >
          <Separator className="bg-background" />
        </motion.div>
      </div>

      <h1>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla viverra
        magna sed nulla pretium, nec blandit tortor venenatis. Ut id risus non
        felis luctus tempor eu vitae nibh. Sed vulputate cursus sagittis. Etiam
        eget ornare augue. Morbi arcu velit, varius a dapibus in, molestie at
        risus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices
        posuere cubilia curae; Nulla semper ante at lectus tempus, et egestas
        orci blandit. Aliquam at arcu quis orci pellentesque cursus. Sed
        sagittis, nibh ut pretium iaculis, ipsum sem sollicitudin ligula,
        consectetur sollicitudin quam ex quis sem. Nullam vel urna iaculis,
        lobortis neque eu, hendrerit diam. Integer sit amet lectus nibh. Donec
        vel massa massa. Donec gravida turpis ac purus scelerisque, cursus
        pharetra velit aliquet. Proin suscipit dolor sed lectus eleifend, eu
        elementum eros dictum. Aenean mauris tortor, mollis a dui eget, pretium
        posuere turpis. Nam lectus orci, cursus sit amet bibendum vel,
        ullamcorper ac orci. Praesent feugiat faucibus est, ut rhoncus est
        lobortis sit amet. Ut porta nisl ultrices odio consectetur ultricies.
        Curabitur augue libero, bibendum eget eros ut, finibus varius enim.
        Phasellus vel porttitor tellus. Duis sed neque maximus, rhoncus erat sit
        amet, porta dui. Suspendisse malesuada augue ac lacus blandit, et
        iaculis metus condimentum. Cras vel lacinia tellus, non volutpat lacus.
        Praesent vel gravida ante. Phasellus purus neque, congue fringilla
        rhoncus et, tempus vel justo. Cras condimentum arcu sit amet tristique
        interdum. Nulla ullamcorper in purus fermentum porta. Ut id elit
        sodales, sodales diam sed, finibus lorem. Aenean sit amet congue tortor,
        eu tincidunt tellus. Aliquam sagittis justo in tortor porta vestibulum.
        Mauris lorem massa, fringilla vitae lobortis sit amet, venenatis in
        mauris. In tincidunt sagittis urna, vitae bibendum ligula laoreet non.
        Integer fringilla, sapien ac mollis fermentum, lacus dolor pellentesque
        massa, vitae ultricies justo tellus in magna. Nam nec ornare felis, ac
        venenatis dui. Morbi eu eros sem.
      </h1>

      <motion.div
        className="grid h-full w-full grid-cols-3 gap-5 rounded-3xl border border-background bg-background-secondary p-5 text-background md:gap-10 md:p-10"
        style={{
          scale,
          y: slideBox,
          opacity: showPatronus,
        }}
      >
        <div className="rounded-xl border border-background bg-primary p-5 md:p-10">
          Start with WHY?
        </div>
        <div className="rounded-xl border border-background bg-primary p-5 md:p-10">
          Negative Space Programming
        </div>
        <div className="rounded-xl border border-background bg-primary p-5 md:p-10">
          Scalable • Maintainable • Robust • Fast
        </div>
      </motion.div>
    </div>
  )
}

export default HomeSection4
