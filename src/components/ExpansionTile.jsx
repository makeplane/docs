import { useState } from 'react'
import { Icon } from './Icon'

export function ExpansionTile({ children, collapsedTitle }) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div className="border border-x-slate-900 border-y-slate-800">
      <div
        className="group flex cursor-pointer items-center gap-2   py-2"
        onClick={() => {
          setIsExpanded(!isExpanded)
        }}
      >
        <div className="flex items-center justify-center">
          {isExpanded ? (
            <Icon icon="arrow" className="h-4 w-4 rotate-180" />
          ) : (
            <Icon icon="arrow" className="h-4 w-4 rotate-90" />
          )}
        </div>

        <div>{collapsedTitle}</div>
      </div>
      {isExpanded && children}
    </div>
  )
}
