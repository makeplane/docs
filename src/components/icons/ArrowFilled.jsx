import { DarkMode, Gradient, LightMode } from '@/components/Icon'

export function ArrowIcon({ id, color }) {
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
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1303_45892)">
            <path
              d="M20.5359 6C22.0755 3.33333 25.9245 3.33333 27.4641 6L41.3205 30C42.8601 32.6667 40.9356 36 37.8564 36H10.1436C7.06439 36 5.13989 32.6667 6.67949 30L20.5359 6Z"
              fill="#1E1E1E"
            />
          </g>
          <defs>
            <clipPath id="clip0_1303_45892">
              <rect width="100%" height="100%" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </LightMode>
      <DarkMode fill={`url(#${id}-gradient-dark)`}>
        <svg
          width="100%"
          height="100%"
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g clip-path="url(#clip0_1303_45892)">
            <path
              d="M20.5359 6C22.0755 3.33333 25.9245 3.33333 27.4641 6L41.3205 30C42.8601 32.6667 40.9356 36 37.8564 36H10.1436C7.06439 36 5.13989 32.6667 6.67949 30L20.5359 6Z"
              fill="#94A3B8"
            />
          </g>
          <defs>
            <clipPath id="clip0_1303_45892">
              <rect width="100%" height="100%" fill="white" />
            </clipPath>
          </defs>
        </svg>
      </DarkMode>
    </>
  )
}
