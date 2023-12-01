import { Callout } from '@/components/Callout'
import { QuickLink, QuickLinks } from '@/components/QuickLinks'
import { Col2 } from '@/components/Col2'
import { List } from '@/components/List'
import Link from '@/components/link'
import { BoldText } from '@/components/BoldText'
import { ExpansionTile } from '@/components/ExpansionTile'

const tags = {
  callout: {
    attributes: {
      title: { type: String },
      type: {
        type: String,
        default: 'note',
        matches: ['note', 'warning'],
        errorLevel: 'critical',
      },
    },
    render: Callout,
  },
  figure: {
    selfClosing: true,
    attributes: {
      src: { type: String },
      alt: { type: String },
      caption: { type: String },
    },
    render: ({ src, alt = '', caption }) => (
      <figure>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={src} alt={alt} />
        <figcaption>{caption}</figcaption>
      </figure>
    ),
  },
  'quick-links': {
    render: QuickLinks,
  },
  'quick-link': {
    selfClosing: true,
    render: QuickLink,
    attributes: {
      title: { type: String },
      description: { type: String },
      icon: { type: String },
      href: { type: String },
    },
  },
  'col-2': {
    render: Col2,
  },
  list: {
    render: List,
  },
  link: {
    attributes: {
      href: { type: String, default: '' },
      target: { type: String, default: '_self' },
    },
    render: Link,
  },
  'bold-text': {
    render: BoldText,
  },
  expansion: {
    attributes: {
      collapsedTitle: { type: String, default: '' },
    },
    render: ExpansionTile,
  },
}

export default tags
