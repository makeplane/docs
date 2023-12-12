import { DarkMode, Gradient, LightMode } from '@/components/Icon'

export function PeopleIcon({ id, color }) {
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
            d="m12,20c0-4.94,3.06-8,8-8s8,3.06,8,8-3.06,8-8,8-8-3.06-8-8Zm32,8c4.94,0,8-3.06,8-8s-3.06-8-8-8-8,3.06-8,8,3.06,8,8,8Zm-24,4c-9.87,0-16,6.13-16,16h32c0-9.87-6.13-16-16-16Zm24,0c-3.43,0-6.4.76-8.82,2.14,3.08,3.44,4.82,8.17,4.82,13.86h20c0-9.87-6.13-16-16-16Z"
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
            d="m12,20c0-4.94,3.06-8,8-8s8,3.06,8,8-3.06,8-8,8-8-3.06-8-8Zm32,8c4.94,0,8-3.06,8-8s-3.06-8-8-8-8,3.06-8,8,3.06,8,8,8Zm-24,4c-9.87,0-16,6.13-16,16h32c0-9.87-6.13-16-16-16Zm24,0c-3.43,0-6.4.76-8.82,2.14,3.08,3.44,4.82,8.17,4.82,13.86h20c0-9.87-6.13-16-16-16Z"
            fill="#337ea9"
          />
        </svg>
      </DarkMode>
    </>
  )
}
