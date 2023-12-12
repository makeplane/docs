import Link from 'next/link'

import { Icon } from '@/components/Icon'

export function Col2({ children }) {
  return (
    <div className="flex w-full gap-4 pt-0 align-top">
      <>{children}</>
    </div>
  )
}

