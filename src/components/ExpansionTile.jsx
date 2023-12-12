import { useState } from 'react'
import { Icon } from './Icon'

export function ExpansionTile({
  children,
  collapsedTitle,
  href,
  addAfter,
  link,
  target,
}) {
  const [isExpanded, setIsExpanded] = useState(false)

  let partAfterFor = ''
  let partBeforeFor = ''

  if (addAfter !== '') {
    const indexOfAddAfter = collapsedTitle.indexOf(addAfter)

    partBeforeFor = collapsedTitle.substring(
      0,
      indexOfAddAfter + addAfter.length
    )
    partAfterFor = collapsedTitle.substring(indexOfAddAfter + addAfter.length)
  }

  return (
    <div className="border border-x-white dark:border-x-slate-900 dark:border-y-slate-800">
      <div
        className="group flex cursor-pointer items-start gap-2 py-2"
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
      >
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <Icon icon="arrow" className="mt-1 h-4 w-4 rotate-180" />
          ) : (
            <Icon icon="arrow" className="mt-1 h-4 w-4 rotate-90" />
          )}
        </div>
        <div>
          {addAfter !== '' ? (
            <div>
              {partBeforeFor}{' '}
              <a href={href} target={target}>
                {link}
              </a>{' '}
              {partAfterFor}
            </div>
          ) : (
            collapsedTitle
          )}
        </div>
      </div>
      {isExpanded && children}
    </div>
  )
}
