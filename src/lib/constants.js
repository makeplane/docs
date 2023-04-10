const REPO = 'makeplane/docs'
const BRANCH = 'master'

export function githubEdit(file) {
  if (file.startsWith('/')) {
    file = 'index.mdx'
  }
  return `https://github.com/${REPO}/edit/${BRANCH}/src/pages/${file}`
}
