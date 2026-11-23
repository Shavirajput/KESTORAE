# Kestorae storefront foundation

## Scope
- Build a responsive homepage foundation in the existing TanStack Start project, following the supplied Kestorae references.
- Add shared announcement, header/navigation, search, mobile menu, and footer elements, using the approved logo and selected product imagery.
- Create a concise homepage preview with room-led discovery; keep the remaining storefront routes as clear, reusable placeholders.
- Register the requested shop, collection, product, search, room, journal, support, cart, checkout, confirmation, and policy routes.
- Give each content route its own app-specific title, description, Open Graph and Twitter metadata.
- Add a routing test and check the storefront at mobile and desktop widths.

## Technical details
- Keep the existing TanStack file-based routing; do not replace it with React Router.
- Put shared storefront UI under `src/components/storefront/` and use the existing design tokens and button component.
- Use CDN pointers for the provided logo and chosen imagery.
- This step does not add real products, persistent cart, payments, or live checkout; unfinished routes remain clearly labeled previews.