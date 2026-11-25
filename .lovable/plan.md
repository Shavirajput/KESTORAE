# Complete the Kestorae storefront

## Scope
- Evolve the current preview into a polished, connected storefront experience using the approved Kestorae brand system and supplied room imagery.
- Add a small, clearly illustrative catalogue with product cards, collection and room browsing, useful search results, and product detail pages.
- Make adding items, changing quantities, and removing items work across navigation; keep checkout and payment clearly inactive because no real store or payment service is connected.
- Replace generic placeholders on the journal, brand, customer-care, delivery, returns, privacy, and terms pages with designed, useful preview content.
- Preserve every existing URL, use the shared storefront shell, and ensure each content page has specific metadata.
- Verify the key browsing-to-bag journey, route tests, and desktop/mobile layouts.

## Technical details
- Keep TanStack file-based routes and the current design tokens; put shared Kestorae UI in `src/components/storefront/`.
- Keep catalogue entries illustrative and avoid presenting fictional prices, product facts, delivery terms, or policies as verified offers.
- Use an in-memory shared bag for this visual prototype; do not add accounts, backend storage, or payment processing.
- Add one routing or catalogue rule test alongside the existing tests and run it.
