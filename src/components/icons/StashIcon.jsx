import { DarkMode, Gradient, LightMode } from '@/components/Icon'

export function StashIcon({ id, color }) {
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
            d="m52,16v4c0,4.42-8.95,8-20,8s-20-3.58-20-8v-4c0-4.42,8.95-8,20-8s20,3.58,20,8Zm-20,30c-8.91,0-15.18-1.82-19.08-4.41-.6.76-.92,1.57-.92,2.41v4c0,4.42,8.95,8,20,8s20-3.58,20-8v-4c0-.84-.33-1.65-.92-2.41-3.9,2.58-10.17,4.41-19.08,4.41Zm0-14c-8.91,0-15.18-1.82-19.08-4.41-.6.76-.92,1.57-.92,2.41v4c0,4.42,8.95,8,20,8s20-3.58,20-8v-4c0-.84-.33-1.65-.92-2.41-3.9,2.58-10.17,4.41-19.08,4.41Z"
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
            d="m52,16v4c0,4.42-8.95,8-20,8s-20-3.58-20-8v-4c0-4.42,8.95-8,20-8s20,3.58,20,8Zm-20,30c-8.91,0-15.18-1.82-19.08-4.41-.6.76-.92,1.57-.92,2.41v4c0,4.42,8.95,8,20,8s20-3.58,20-8v-4c0-.84-.33-1.65-.92-2.41-3.9,2.58-10.17,4.41-19.08,4.41Zm0-14c-8.91,0-15.18-1.82-19.08-4.41-.6.76-.92,1.57-.92,2.41v4c0,4.42,8.95,8,20,8s20-3.58,20-8v-4c0-.84-.33-1.65-.92-2.41-3.9,2.58-10.17,4.41-19.08,4.41Z"
            fill="#337ea9"
          />
        </svg>
      </DarkMode>
    </>
  )
}
