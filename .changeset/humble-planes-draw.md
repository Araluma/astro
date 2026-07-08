---
'astro': patch
---

Fixes content collections `reference()` silently accepting invalid entry IDs. Invalid references (e.g., using a filename like `John-Doe` when the actual entry ID is `john-doe`) now log an error during content syncing.
