import { motion } from 'framer-motion'
import Image from 'next/image'
import React from 'react'
import { stacks } from './Stacks'

function Skills() {
  return stacks.map((stack, index) => {
    const { category, items } = stack

    return (
      <motion.div
        key={index}
        className="flex w-full flex-col items-center justify-between gap-5 rounded-xl border border-primary p-5"
      >
        <h1 className="text-heading-6 md:text-heading-5">{category}</h1>
        <div className="flex flex-col items-center justify-center gap-5 md:flex-row">
          {items.map((item, index) => (
            <div key={index}>
              {typeof item === 'string' ? (
                <Image
                  src={item}
                  alt={item}
                  width={item === '/images/logo/figma.svg' ? 25 : 50}
                  height={item === '/images/logo/figma.svg' ? 25 : 50}
                />
              ) : (
                React.createElement(item, { size: 50, strokeWidth: 1 })
              )}
            </div>
          ))}
        </div>
      </motion.div>
    )
  })
}

export default Skills
