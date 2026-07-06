---
'astro': patch
---

Fixes component `<script>` tags being silently dropped when slot content is consumed as a plain string by third-party head-management packages (e.g. `astro-capo`). Scripts rendered via `renderSlotToString()` are now included in the string output, ensuring they are not lost when the result is used outside Astro's internal rendering pipeline.
