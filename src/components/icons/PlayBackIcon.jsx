import { DarkMode, Gradient, LightMode } from '@/components/Icon'

export function PlayBackIcon({ id, color }) {
  return (
    <>
      <defs>
        <Gradient
          id={`${id}-gradient`}
          color={color}
          gradientTransform="matrix(0 21 -21 0 20 3)"
        />
        <Gradient
          id={`${id}-gradient-dark`}
          color={color}
          gradientTransform="matrix(0 22.75 -22.75 0 16 6.25)"
        />
      </defs>
      <LightMode>
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
        >
          <defs fill="#337ea9" />
          <path
            d="m56,18v28h-6v-11.22l-17.5,11.22h-3.5v-11.22l-17.5,11.22h-3.5v-28h3.5l17.5,11.22v-11.22h3.5l17.5,11.22v-11.22h6Z"
            fill="#337ea9"
          />
        </svg>
      </LightMode>
      <DarkMode fill={`url(#${id}-gradient-dark)`}>
        <svg
          width="100%"
          height="100%"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 64 64"
        >
          <defs fill="#337ea9" />
          <path
            d="m56,18v28h-6v-11.22l-17.5,11.22h-3.5v-11.22l-17.5,11.22h-3.5v-28h3.5l17.5,11.22v-11.22h3.5l17.5,11.22v-11.22h6Z"
            fill="#337ea9"
          />
        </svg>
      </DarkMode>
    </>
  )
}
