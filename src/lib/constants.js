const REPO = 'makeplane/docs'
const BRANCH = 'master'

/**
 * @param file {string}
 */
export function githubEdit(file) {
  file = file.replace(/^\//, '');
  if (file === '.mdx') {
    file = 'index.mdx'
  }
  return `https://github.com/${REPO}/edit/${BRANCH}/src/pages/${file}`
}
