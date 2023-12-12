function Link({ children, href = '', target = '_self' }) {
  console.log(href, target)
  return (
    <a href={href} target={target}>
      {children}
    </a>
  )
}

export default Link
