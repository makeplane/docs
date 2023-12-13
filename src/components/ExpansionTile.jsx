import { useState } from 'react'
import { Icon } from './Icon'
import { InlineCode } from './Inline-code'

export function ExpansionTile({
  children,
  collapsedTitle,
  href,
  addAfter,
  target,
  textColor,
  content,
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
              {href === '' ? (
                <InlineCode textColor={textColor}>{content}</InlineCode>
              ) : (
                <a href={href} target={target}>
                  {content}
                </a>
              )}{' '}
              {partAfterFor}
            </div>
          ) : (
            collapsedTitle
          )}
        </div>
      </div>
      <div className="pl-6">{isExpanded && children}</div>
    </div>
  )
}
