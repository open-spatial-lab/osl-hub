#!/usr/bin/env zx
await $`echo "Warning - this script will delete your existing KV stores. Deleting in 5 seconds..."; sleep 2;`
await $`sleep 1; echo "Deleting in 3"`
await $`sleep 1; echo 2`
await $`sleep 1; echo 1`

await $`wrangler kv:namespace delete --binding=HUBCACHE`
await $`wrangler kv:namespace delete --binding=HUBCACHE --preview`