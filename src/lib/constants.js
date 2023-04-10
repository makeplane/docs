const REPO = 'makeplane/docs'
const BRANCH = 'master'

export function githubEdit(file) {
  return `https://github.com/${REPO}/edit/${BRANCH}/src/pages/${file}`
}
