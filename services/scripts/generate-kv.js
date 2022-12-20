#!/usr/bin/env zx
import fs from "fs";

const existingKvs = JSON.parse((await $`wrangler kv:namespace list`).toString())
const idRegex = /\bid =\s+(.*)"/g;
const previewRegex = /\bpreview_id =\s+(.*)"/g;
const kvRegex = /\bkv_namespaces\s+=\s+\[(.|)*\]/g

let kvs = [
  { name: "HUBCACHE", ns: "worker-HUBCACHE", prop: "id", regex: idRegex, id: null },
  { name: "HUBCACHE", ns: "worker-HUBCACHE_preview", prop: "preview_id", regex: previewRegex, id: null },
  { name: "BOOKMARK", ns: "worker-BOOKMARK", prop: "id", regex: idRegex, id: null },
  { name: "BOOKMARK", ns: "worker-BOOKMARK_preview", prop: "preview_id", regex: previewRegex, id: null },
]

async function createOrUseNs(mutableNsObj){
  let {
    name,
    ns,
    prop,
    regex,
  } = mutableNsObj
  const existingKv = existingKvs.find((entry) => entry.title === ns)
  if(existingKv){
    mutableNsObj.id = `${prop} = "${existingKv.id}"`
  } else {
    const prod = await $`wrangler kv:namespace create "${name}" ${prop === "id" ? "" : "--preview"}`
    mutableNsObj.id = prod.toString().match(regex)[0]
  }
}

async function appendToml(path, regex, text){
  const wranglerText = fs.readFileSync(path, "utf8");
  fs.writeFileSync(
    path,
    wranglerText.replaceAll(
      regex,
      text
    )
  );
}

for (const kv of kvs) {
  await createOrUseNs(kv)
}
const [cacheId, cachePreviewId, bookmarkId, bookmarkPreviewId] = [kvs[0].id, kvs[1].id, kvs[2].id, kvs[3].id];
appendToml("./services/cache/wrangler.toml", kvRegex, `kv_namespaces = [{binding = "HUBCACHE", ${cacheId}, ${cachePreviewId}}]`)
appendToml("./services/bookmark/wrangler.toml", kvRegex, `kv_namespaces = [{binding = "BOOKMARK", ${bookmarkId}, ${bookmarkPreviewId}}]`)