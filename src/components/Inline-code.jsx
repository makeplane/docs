import clsx from "clsx"

export function InlineCode({ children, textColor }) {
  let hexCode = '!text-[#FFFFFF]'
  if (textColor === 'grey') {
    hexCode = '!text-[#787774]'
  } else if (textColor === 'blue') {
    hexCode = '!text-[#337ea9]'
  } else if (textColor === 'red') {
    hexCode = '!text-[#EB5757]'
  }

  return (
    <code className={clsx("rounded bg-sky-50 px-2 py-1 font-bold dark:bg-slate-800/60", hexCode)}>
      {children}
    </code>
  )
}
