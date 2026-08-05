import { defineCloudflareConfig } from "@opennextjs/cloudflare";
import staticAssets from "@opennextjs/cloudflare/overrides/incremental-cache/kv-incremental-cache";

export default defineCloudflareConfig({
  incrementalCache: staticAssets,
});