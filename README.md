# Golden Seed Export

A multi-page, multilingual website for a Tanzanian agricultural commodities export
business: sunflower oil, cashew nuts, ICUMSA 45 sugar, sesame seeds and garlic.

## What's here

- **index.html, products.html, about.html, quote.html, contact.html** — the English
  site, each a real crawlable page (not a single-page app) for proper SEO.
- **es/, fr/, de/** — full Spanish, French and German translations of every page,
  with `hreflang` tags linking each language version together so Google can serve
  the right language to the right searcher.
- **assets/style.css, assets/app.js** — shared styles and behaviour (nav menu, form
  validation) used by every page in every language.
- **assets/photos.js** — embedded product photos (base64), shared by all pages so
  the image data isn't duplicated 20 times.
- **assets/carousel-builder.\*.js** — the home-page hero slideshow and product
  carousel, one per language since the copy inside is localized.
- **sitemap.xml / robots.txt** — list all 20 pages with hreflang alternates so
  search engines discover and correctly geo/language-target every version.
- **images/** — the product photos as separate `.jpg` files, plus `manifest.json`,
  kept for reference.

## View it locally

Open `index.html` in any web browser. Other pages and languages are normal links
(`products.html`, `es/index.html`, etc.) — no build step or server required.

## Publish it free with GitHub Pages

1. Push this repository to GitHub.
2. On GitHub, go to **Settings → Pages**.
3. Under **Build and deployment**, set **Source** to *Deploy from a branch*,
   choose the `main` branch and the `/ (root)` folder, then **Save**.
4. The `CNAME` file points the site at `goldenseedexport.com`; configure your DNS
   A/CNAME records to GitHub Pages for the custom domain to resolve.

## Still to do before taking real orders

The Quote and Contact forms currently show a confirmation with a reference code,
but they do not yet send anywhere. Connect them to a form service (for example
Web3Forms or Formspree, both free) so submissions reach an inbox. Also replace
the placeholder phone number on the Contact pages with a real one.

## Notes

- Product photos are embedded in `assets/photos.js` as base64, which is why that
  file is a few megabytes. That is intentional — it guarantees the images display
  everywhere without separate image requests.
- The site is responsive and was checked on phone, tablet and desktop widths.
- SEO: each page has a unique title/description, canonical URL, Open Graph tags,
  and either Organization or Product (ItemList) JSON-LD structured data.
