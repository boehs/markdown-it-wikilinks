'use strict'

const Plugin = require('markdown-it-regexp')
const extend = require('extend')
const sanitize = require('sanitize-filename')

module.exports = (options) => {

  const defaults = {
    linkPattern: /\[\[([^|]+?)(\|([\s\S]+?))?\]\]/,
    baseURL: '/',
    relativeBaseURL: './',
    makeAllLinksAbsolute: false,
    uriSuffix: '.html',
    htmlAttributes: {
    },
    generatePageNameFromLabel: (label) => {
      return label
    },
    postProcessPageName: (pageName) => {
      pageName = pageName.trim()
      pageName = pageName.split('/').map(sanitize).join('/')
      pageName = pageName.replace(/\s+/, '_')
      return pageName
    },
    postProcessLabel: (label) => {
      label = label.trim()
      return label
    },
<<<<<<< Updated upstream
    includeWikilinks: false
=======
    includeWikilinks: false,
    assetPrefix: ''
>>>>>>> Stashed changes
  }

  options = extend(true, defaults, options)

  function isAbsolute(pageName) {
    return options.makeAllLinksAbsolute || pageName.charCodeAt(0) === 0x2F/* / */
  }

  function removeInitialSlashes(str) {
    return str.replace(/^\/+/g, '')
  }

  return Plugin(
<<<<<<< Updated upstream
    options.linkPattern,
=======
    new RegExp(options.imagePattern ? `(${options.imagePattern.source})|(${options.linkPattern.source})` : options.linkPattern.source),
>>>>>>> Stashed changes
    (match, utils) => {
      let label = ''
      let pageName = ''
      let href = ''
      let htmlAttrs = []
      let htmlAttrsString = ''
<<<<<<< Updated upstream
=======
            
      if (options.imagePattern?.test(match)) {
        match = match[0].match(options.imagePattern)
        return `<img src="${options.assetPrefix}${match[1]}"></img>`
      }
      
      match = match[0].match(options.linkPattern)
      
>>>>>>> Stashed changes
      const isSplit = !!match[3]
      if (isSplit) {
        label = match[3]
        pageName = match[1]
      }
      else {
        label = match[1]
        pageName = options.generatePageNameFromLabel(label)
      }

      label = options.postProcessLabel(label)
      pageName = options.postProcessPageName(pageName)

      // make sure none of the values are empty
      if (!label || !pageName) {
        return match.input
      }

      if (isAbsolute(pageName)) {
        pageName = removeInitialSlashes(pageName)
        href = options.baseURL + pageName + options.uriSuffix
      }
      else {
        href = options.relativeBaseURL + pageName + options.uriSuffix
      }
      href = utils.escape(href)

      htmlAttrs.push(`href="${href}"`)
      for (let attrName in options.htmlAttributes) {
        const attrValue = options.htmlAttributes[attrName]
        htmlAttrs.push(`${attrName}="${attrValue}"`)
      }
      htmlAttrsString = htmlAttrs.join(' ')
      
      switch (options.includeWikilinks) {
        case 'inner': return `<a ${htmlAttrsString}>[[${label}]]</a>`
        case 'outer': return `[[<a ${htmlAttrsString}>${label}</a>]]`
        case false: return `<a ${htmlAttrsString}>${label}</a>`
        default: {
          if (typeof options.includeWikilinks == 'string' &&
          ['inner', 'outer'].includes(options.includeWikilinks.toLowerCase()))
          throw new Error('Invalid casing on `includeWikilinks`. Ensure value is lowercase')
          else throw new Error(`Unknown value "${options.includeWikilinks}" for \`includeWikilinks\``)
        }
      }
    }
  )
}
