import { ButtonHTMLAttributes, FC, ReactNode } from 'react'
import clsx from 'clsx'
import Link from 'next/link'

const styles = {
  primary:
    'rounded-full bg-sky-300 py-2 px-4 text-sm font-semibold text-slate-900 hover:bg-sky-200 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-300/50 active:bg-sky-500',
  secondary:
    'rounded-full bg-slate-800 py-2 px-4 text-sm font-medium text-white hover:bg-slate-700 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white/50 active:text-slate-400',
}

export type ButtonProps = {
  variant?: string
  href?: string
  className?: string
  children: ReactNode
} & ButtonHTMLAttributes<HTMLButtonElement>

export const Button: FC<ButtonProps> = (props) => {
  const { variant = 'primary', className, href, children, ...rest } = props

  const transformedClassName = clsx(styles[variant], className)

  return href ? (
    <Link href={href} className={transformedClassName}>
      {children}
    </Link>
  ) : (
    <button className={transformedClassName} {...rest}>
      {children}
    </button>
  )
}
