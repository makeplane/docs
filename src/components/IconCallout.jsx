import React from 'react'
import Image from 'next/image'

const IconCallout = ({ title, children, icon, image = false, className }) => {
  return (
    <div className="h-full py-4">
      <div
        className={`flex h-full gap-4 rounded-lg border-2  p-4 ${className}`}
      >
        <div>
          {image ? (
            <div className="h-6 w-6 flex-shrink-0">
              <Image src={icon} alt="icon" className="mt-1.5 h-6 w-6" />
            </div>
          ) : (
            <div className="relative -mt-1 mb-auto flex h-4 flex-shrink-0 text-2xl">
              {icon}
            </div>
          )}
        </div>
        <div>
          {title && <div className="text-lg font-semibold">{title}</div>}
          {children && (
            <div className={`-mb-2 text-gray-500  ${!title && '-mt-2'} `}>
              {children}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default IconCallout
