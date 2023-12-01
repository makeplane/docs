const pages = [
  '',
  '/quick-start',
  '/self-hosting',
  '/docker-compose',
  '/kubernetes',
  '/workspaces',
  '/projects',
  '/issues',
  '/cycles',
  '/modules',
  '/pages',
  '/integrations/about',
  '/integrations/github',
  '/integrations/slack',
  '/importers/github',
  '/importers/jira',
  '/apis/introduction',
  '/apis/project',
  '/apis/state',
  '/apis/label',
  '/apis/links',
  '/apis/issue-attachment',
  '/apis/issue',
  '/apis/issue-activity',
  '/apis/issue-comment',
  '/apis/module',
  '/apis/module-issue',
  '/apis/cycle',
  '/apis/cycle-issue',
  '/apis/inbox-issue',
  '/webhooks/introduction',
]

const Sitemap = () => {}

export default Sitemap

export async function getServerSideProps({ res }) {
  const baseUrl = process.env.BASE_URL || 'https://example.com'
  const pagesSitemap = pages
    .map((page) => {
      return `
        <url>
          <loc>${baseUrl}${page}</loc>
        </url>
      `
    })
    .join('')

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${pagesSitemap}
    </urlset>
  `

  res.setHeader('Content-Type', 'text/xml')
  res.write(sitemap)
  res.end()

  return { props: {} }
}
