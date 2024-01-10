import { DarkMode, Gradient, LightMode } from '@/components/Icon'

export function CloudIcon({ id, color }) {
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
            d="m52,28.32v-.32c0-11.11-6.89-18-18-18-9.71,0-16.2,5.27-17.68,14.03-7.62.28-12.32,5.18-12.32,12.97s4.98,13,13,13h32c6.79,0,11-4.21,11-11,0-5.72-3-9.6-8-10.68Zm-23,14.92l-10-10,4.24-4.24,5.76,5.76,10.76-10.76,4.24,4.24-15,15Z"
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
            d="m52,28.32v-.32c0-11.11-6.89-18-18-18-9.71,0-16.2,5.27-17.68,14.03-7.62.28-12.32,5.18-12.32,12.97s4.98,13,13,13h32c6.79,0,11-4.21,11-11,0-5.72-3-9.6-8-10.68Zm-23,14.92l-10-10,4.24-4.24,5.76,5.76,10.76-10.76,4.24,4.24-15,15Z"
            fill="#337ea9"
          />
        </svg>
      </DarkMode>
    </>
  )
}
