# Tembo Agro Exports

A single-page website for a Tanzanian agricultural commodities export business:
sunflower oil, cashew nuts, ICUMSA 45 sugar, sesame seeds and garlic.

## What's here

- **index.html** — the entire website in one self-contained file. All styling,
  scripts and product photos are embedded, so it works when opened directly in a
  browser or when hosted anywhere. Pages (Home, Products, About, Request Quote,
  Contact) switch in place; no build step or server is required.
- **images/** — the product photos as separate `.jpg` files, plus `manifest.json`.
  Kept for reference and for anyone who later wants a lighter version of the page
  that loads images from this folder instead of embedding them.

## View it locally

Just open `index.html` in any web browser (double-click it, or drag it into a
browser window).

## Publish it free with GitHub Pages

1. Push this repository to GitHub (see below).
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   choose the `main` branch and the `/ (root)` folder, then **Save**.
4. After a minute, your site is live at
   `https://Graig990.github.io/AGRO/`.

## Still to do before taking real orders

The Quote and Contact forms currently show a confirmation with a reference code,
but they do not yet send anywhere. Connect them to a form service (for example
Web3Forms or Formspree, both free) so submissions reach an inbox. Also replace
the placeholder email, phone and address on the Contact page and in the footer
with real details.

## Notes

- Product photos are embedded in `index.html`, which is why the file is a few
  megabytes. That is intentional — it guarantees the images display everywhere.
- The site is responsive and was checked on phone, tablet and desktop widths.
