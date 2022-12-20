#!/usr/bin/env zx
import fs from 'fs'

const idRegex = /\bid =\s+(.*)"/g
const previewRegex = /\bpreview_id =\s+(.*)"/g
const kvRegex = /\bkv_namespaces\s+=\s+\[(.|\n)*\]/g

const cacheProd = await $`wrangler kv:namespace create "HUBCACHE"`
const cacheDev = await $`wrangler kv:namespace create --preview "HUBCACHE"`

const cacheId = cacheProd.toString().match(idRegex)[0]
const cachePreviewId = cacheDev.toString().match(previewRegex)[0]
const cacheWranglerText = fs.readFileSync('./services/cache/wrangler.toml', 'utf8')
fs.writeFileSync('./services/cache/wrangler.toml', cacheWranglerText.replace(kvRegex, `kv_namespaces = [{binding = "HUBCACHE", ${cacheId}, ${cachePreviewId}}]`))

const bookmarkProd = await $`wrangler kv:namespace create "BOOKMARK"`
const bookmarkDev = await $`wrangler kv:namespace create --preview "BOOKMARK"`

const bookmarkId = bookmarkProd.toString().match(idRegex)[0]
const bookmarkPreviewId = bookmarkDev.toString().match(previewRegex)[0]
const bookmarkWranglerText = fs.readFileSync('./services/bookmark/wrangler.toml', 'utf8')
fs.writeFileSync('./services/bookmark/wrangler.toml', bookmarkWranglerText.replace(kvRegex, `kv_namespaces = [{
    binding = "BOOKMARK", ${bookmarkId}, ${bookmarkPreviewId}
}]`))
