import Link from 'next/link'

interface ContactsProps {
  link: string
  inactiveIcon: React.ReactNode
  activeIcon: React.ReactNode
}

function Contacts({ link, inactiveIcon, activeIcon }: ContactsProps) {
  return (
    <Link
      href={link}
      target="_blank"
      className="group relative transition-all duration-300 hover:scale-125 active:scale-[0.95]"
    >
      <div className="group-hover:hidden">{inactiveIcon}</div>
      <div className="hidden group-hover:block">{activeIcon}</div>
    </Link>
  )
}

export default Contacts
