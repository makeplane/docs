import React from 'react'
import Markdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function UrlEmbed({ url }) {
  const [text, setText] = React.useState(undefined)
  fetch(url)
    .then((response) => {
      return response.text()
    })
    .then((text) => {
      setText(text)
    })

  return (
    <div className="overflow-auto">
      <Markdown remarkPlugins={[remarkGfm]}>{text}</Markdown>
    </div>
  )
}
