---
'astro': patch
---

Fixes a build error when using the Container API with the Cloudflare adapter

When using `experimental_AstroContainer` in a prerendered page with `@astrojs/cloudflare`, the build would fail with a Rolldown error about unresolvable `satteri` WASM imports. This happened because the Cloudflare adapter's workerd environment uses `browser` resolve conditions, which caused `satteri` to resolve to its WASM browser entry point with missing dependencies.

The default markdown processor (`satteri`) is now loaded via dynamic import during config resolution instead of through a static import in the config schema, preventing it from being pulled into the prerender bundle.
