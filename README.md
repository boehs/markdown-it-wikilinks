# Markdown-It Wikilinks

[![Build Status](https://travis-ci.org/jsepia/markdown-it-wikilinks.svg?branch=master)](https://travis-ci.org/jsepia/markdown-it-wikilinks) [![Coverage Status](https://coveralls.io/repos/github/jsepia/markdown-it-wikilinks/badge.svg?branch=master)](https://coveralls.io/github/jsepia/markdown-it-wikilinks?branch=master)

Renders [Wikimedia-style links](https://www.mediawiki.org/wiki/Help:Links#Internal_links) in [markdown-it](https://github.com/markdown-it/markdown-it). This is useful for making Markdown-based wikis.

## Usage

Install this into your project:

```bash
npm --save install markdown-it-wikilinks
```

...and *use* it:

```js
<<<<<<< Updated upstream
const wikilinks = require('markdown-it-wikilinks')(options)
=======
const wikilinks = require('@gardeners/markdown-it-wikilinks')(options)
>>>>>>> Stashed changes
const md = require('markdown-it')()
    .use(wikilinks)
    .render('Click [[Wiki Links|here]] to learn about [[/Wiki]] links.')
```

**Output:**

```html
<p>Click <a href="./Wiki_Links.html">here</a> to learn about <a href="/Wiki.html">Wiki</a> links.</p>
```

## Options

### `linkPattern`

**Default:** `/\[\[([^|]+?)(\|([\s\S]+?))?\]\]/`

The regex to use when matching WikiLinks.

```js
// Allow exclamation marks to be used.
const html = require('markdown-it')()
<<<<<<< Updated upstream
  .use(require('markdown-it-wikilinks')({ linkPattern: /\[\[([\w\s/!]+)(\|([\w\s/!]+))?\]\]/ }))
=======
  .use(require('@gardeners/markdown-it-wikilinks')({ linkPattern: /\[\[([\w\s/!]+)(\|([\w\s/!]+))?\]\]/ }))
>>>>>>> Stashed changes
  .render('[[Slate!]]')
  // <p><a href="./Slate!.html">Slate!</a></p>
```

<<<<<<< Updated upstream
=======
### `imagePattern`

**Default:** undefined

The common regex for images is `/!\[\[([^]+?)\]\]/` (note the inclusion of ! at the start).

### `assetPrefix`

**Default:** ''

A prefix for image urls, normally `/assets/`


>>>>>>> Stashed changes
### `baseURL`

**Default:** `/`

The base URL for absolute wiki links.

```js
const html = require('markdown-it')()
<<<<<<< Updated upstream
  .use(require('markdown-it-wikilinks')({ baseURL: '/wiki/' }))
=======
  .use(require('@gardeners/markdown-it-wikilinks')({ baseURL: '/wiki/' }))
>>>>>>> Stashed changes
  .render('[[/Main Page]]')
  // <p><a href="/wiki/Main_Page.html">Main Page</a></p>
```

### `relativeBaseURL`

**Default:** `./`

The base URL for relative wiki links.

```js
const html = require('markdown-it')()
<<<<<<< Updated upstream
  .use(require('markdown-it-wikilinks')({ relativeBaseURL: '#', suffix: '' }))
=======
  .use(require('@gardeners/markdown-it-wikilinks')({ relativeBaseURL: '#', suffix: '' }))
>>>>>>> Stashed changes
  .render('[[Main Page]]')
  // <p><a href="#Main_Page">Main Page</a></p>
```

### `makeAllLinksAbsolute`

**Default:** `false`

Render all wiki links as absolute links.

### `uriSuffix`

**Default:** `.html`

Append this suffix to every URL.

```js
const html = require('markdown-it')()
<<<<<<< Updated upstream
  .use(require('markdown-it-wikilinks')({ uriSuffix: '.php' }))
=======
  .use(require('@gardeners/markdown-it-wikilinks')({ uriSuffix: '.php' }))
>>>>>>> Stashed changes
  .render('[[Main Page]]')
  // <p><a href="./Main_Page.php">Main Page</a></p>
```

### `htmlAttributes`

**Default:** `{}`

An object containing HTML attributes to be applied to every link.

```js
const attrs = {
  'class': 'wikilink',
  'rel': 'nofollow'
}
const html = require('markdown-it')()
<<<<<<< Updated upstream
  .use(require('markdown-it-wikilinks')({ htmlAttributes: attrs }))
=======
  .use(require('@gardeners/markdown-it-wikilinks')({ htmlAttributes: attrs }))
>>>>>>> Stashed changes
  .render('[[Main Page]]')
  // <p><a href="./Main_Page.html" class="wikilink" rel="nofollow">Main Page</a></p>
```

### `generatePageNameFromLabel`

Unless otherwise specified, the labels of the links are used as the targets. This means that a non-[piped](https://meta.wikimedia.org/wiki/Help:Piped_link) link such as `[[Slate]]` will point to the `Slate` page on your website.

But say you wanted a little more flexibility - like being able to have `[[Slate]]`, `[[slate]]`, `[[SLATE]]` and `[[Slate!]]` to all point to the same page. Well, you can do this by providing your own custom `generatePageNameFromLabel` function.

#### Example

```js
const _ = require('lodash')

function myCustomPageNameGenerator(label) {
  return label.split('/').map(function(pathSegment) {
    // clean up unwanted characters, normalize case and capitalize the first letter
    pathSegment = _.deburr(pathSegment)
    pathSegment = pathSegment.replace(/[^\w\s]/g, '')

    // normalize case
    pathSegment = _.capitalize(pathSegment.toLowerCase())

    return pathSegment
  })
}

const html = require('markdown-it')()
<<<<<<< Updated upstream
  .use(require('markdown-it-wikilinks')({ generatePageNameFromLabel: myCustomPageNameGenerator }))
=======
  .use(require('@gardeners/mardkwon-it-wikilinks')({ generatePageNameFromLabel: myCustomPageNameGenerator }))
>>>>>>> Stashed changes
  .render('Vive la [[révolution!]] VIVE LA [[RÉVOLUTION!!!]]')
  // <p>Vive la <a href="./Revolution.html">révolution!</a> VIVE LA <a href="./Revolution.html">RÉVOLUTION!!!</a></p>
```

Please note that the `generatePageNameFromLabel` function does not get applied for [piped links](https://meta.wikimedia.org/wiki/Help:Piped_link) such as `[[/Misc/Cats/Slate|kitty]]` since those already come with a target.

### `postProcessPageName`

A transform applied to every page name. You can override it just like `generatePageNameFromLabel` (see above).

The default transform does the following things:

- trim surrounding whitespace
- [sanitize](https://github.com/parshap/node-sanitize-filename) the string
- replace spaces with underscores

### `postProcessLabel`

A transform applied to every link label. You can override it just like `generatePageNameFromLabel` (see above).

All the default transform does is trim surrounding whitespace.

### `includeWikilinks`

**Default:** `false`

Include wikilink delimiters (`[[`, `]]`) in output

- **false**: Do not include delimiters in output
- **"inner"**: Include delimiters inside the link
- **"outer"**: Wrap the link with delimiters

## TODO

- Unit test options
- Add examples to `postProcessPageName` and `postProcessLabel`

## Credits

Based on [markdown-it-ins](https://github.com/markdown-it/markdown-it-ins) by Vitaly Puzrin, Alex Kocharin.
<<<<<<< Updated upstream
=======

### Differences with [`markdown-it-obsidian`](https://www.npmjs.com/package/markdown-it-obsidian)

- Wikistyle images via that fork
- `markdown-it-obsidian` checks that the page exists before linking, `@gardeners/markdown-it-wikilinks` does not
>>>>>>> Stashed changes
