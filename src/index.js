const path = require('path')
const visit = require('unist-util-visit')
const jscodeshift = require('jscodeshift')

/**
 *
 * Remark plugin running a jscodeshift transform function on
 * javascript codeblocks.
 *
 * @param {Object} options - Options passed to the plugin
 * @param {string} options.transform - jscodeshift transform filepath
 */
const remarkJscodeshift = options => {
  const transform = require(path.join(process.cwd(), options.transform))
  return transformer

  function transformer(tree, file) {
    visit(tree, 'code', visitor)

    function visitor(node) {
      if (
        node.lang !== 'js' &&
        node.lang !== 'jsx' &&
        node.lang !== 'javascript'
      ) {
        return
      }
      const file = { source: node.value }
      const api = { jscodeshift }
      const newSource = transform(file, api)
      if (newSource !== null) {
        node.value = newSource
      }
    }
  }
}

module.exports = remarkJscodeshift
