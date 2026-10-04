# MONSTER FLAVOR LAB

## Goal
Build a responsive, museum-like flavor catalog at `/` with a charcoal-and-neon visual system, verified regional product data, and no commerce language or flows.

## Experience
- Create a compact top navigation and an immersive opening view with “MONSTER FLAVOR LAB” and “Explore the flavors. Discover the regions.”
- Present a searchable catalog with category filters for All, India, Asia, International, Ultra, Juice, and Original.
- Use premium product cards with bold can-like artwork, region/category labels, verification status, favorites, and “View flavor” actions.
- Add a persistent “My Flavor List” view stored only in the visitor’s browser.
- Open an accessible flavor detail dialog with name, region, flavor, category, verified information, and a link to the exact official regional source.
- Make selection change the surrounding color glow and gently emphasize the selected product, with restrained fruit/liquid ambience and reduced-motion support.
- Include the supplied independent-catalog disclaimer, availability notice, official regional links, and trademark/image ownership notice.

## Verified content approach
- Include only products confirmed on official Monster Energy regional websites.
- Treat a product’s region as the official website where it was verified, not as evidence of import or retail availability in India.
- Do not imply that internationally listed products can be bought in India.
- Use concise flavor descriptions grounded in official product copy and link every record to its official source.

## Technical details
- Keep this as a fast single-route catalog with semantic sections and in-page navigation.
- Define the full visual system in `src/styles.css` using semantic OKLCH tokens, a condensed display face, and reusable motion utilities.
- Implement the catalog as focused React components and typed local product data.
- Use the existing dialog and button primitives for accessible controls; use localStorage only after hydration for favorites.
- Add route-specific title, description, Open Graph, and Twitter metadata.
- Verify filtering, searching, favorites, dialog behavior, keyboard focus, mobile/desktop layout, reduced motion, and preview health.
