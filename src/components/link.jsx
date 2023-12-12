import clsx from 'clsx'

function Link({ children, href = '', target = '_self', heading }) {
  return (
    <a
      href={href}
      target={target}
      className={heading !== null && heading === true ? 'text-xl' : ''}
    >
      {children}
    </a>
  )
}

export default Link
