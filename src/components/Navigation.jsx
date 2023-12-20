import Link from 'next/link'
import { useRouter } from 'next/router'
import clsx from 'clsx'

const Renderlinks = (props) => {
  let router = useRouter()
  const { href, title } = props
  return (
    <Link
      href={href}
      className={clsx(
        'block w-full pl-3.5 before:pointer-events-none before:absolute before:-left-1 before:top-[12.5px] before:h-1.5 before:w-1.5 before:-translate-y-1/2 before:rounded-full',
        href === router.pathname
          ? 'font-semibold text-sky-500 before:bg-sky-500'
          : 'text-slate-500 before:hidden before:bg-slate-300 hover:text-slate-600 hover:before:block dark:text-slate-400 dark:before:bg-slate-700 dark:hover:text-slate-300'
      )}
    >
      {title}
    </Link>
  )
}

const NestedLinks = (props) => {
  const { links } = props
  
  return (
    <ul
      role="list"
      className="space-y-2 border-l ml-2 border-slate-100 dark:border-slate-800 lg:mt-4 lg:space-y-4 lg:border-slate-200"
    >
      {links.map((link) => (
        <li key={link.href} className="relative">
          <Renderlinks href={link.href} title={link.title} />
          {link.links && link.links.length > 0 && (
            <ul
              role="list"
              className="border-l-1 !ml-4 mt-2 space-y-2 border-slate-100 dark:border-slate-800 lg:space-y-4 lg:border-slate-200"
            >
              <NestedLinks links={link.links} />
            </ul>
          )}
        </li>
      ))}
    </ul>
  )
}

export function Navigation({ navigation, className }) {
  let router = useRouter()

  return (
    <nav className={clsx('text-base lg:text-sm', className)}>
      <ul role="list" className="space-y-9">
        {navigation.map((section) => (
          <li key={section.title}>
            <h2 className="font-display font-medium text-slate-900 dark:text-white">
              {section.title === 'Self-hosting' ? (
                <Link href={section.href}>
                  <div className={clsx(section.href === router.pathname ? 'text-sky-500 before:bg-sky-500' : '')}>{section.title}</div>
                </Link>
              ) : (
                section.title
              )}
            </h2>
            <NestedLinks links={section.links} />
          </li>
        ))}
      </ul>
    </nav>
  )
}
