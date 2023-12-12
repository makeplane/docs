import { DarkMode, Gradient, LightMode } from '@/components/Icon'

export function ManIcon({ id, color }) {
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
            d="m27,12c0-3.09,1.91-5,5-5s5,1.91,5,5-1.91,5-5,5-5-1.91-5-5Zm23,13v-5H14v5h13v10l-7,21h6.32l5.68-17.03,5.68,17.03h6.32l-7-21v-10h13Z"
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
            d="m27,12c0-3.09,1.91-5,5-5s5,1.91,5,5-1.91,5-5,5-5-1.91-5-5Zm23,13v-5H14v5h13v10l-7,21h6.32l5.68-17.03,5.68,17.03h6.32l-7-21v-10h13Z"
            fill="#337ea9"
          />
        </svg>
      </DarkMode>
    </>
  )
}
