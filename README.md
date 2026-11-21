# Sugarplum Events — Website

A responsive, multi-page static website concept for Sugarplum Events.

## Run locally
Open this folder in VS Code and use Live Server on `index.html`. The project uses static HTML, CSS and JavaScript. Google Fonts and illustrative photography load from third-party hosts, so an internet connection is required.

## Pages
- `index.html` — home
- `about.html` — brand story
- `services.html` — services overview
- `services/event-decor.html` — custom décor
- `services/party-rentals.html` — rentals
- `services/activities.html` — activities and experiences
- `gallery.html` — filterable inspiration gallery with lightbox
- `contact.html` — inquiry builder for Instagram

## Logo
The supplied circular logo is exported as a high-resolution transparent PNG at `images/logo/sugarplum-logo-cropped.png`. The white area outside the circular emblem is transparent. `favicon.png` is provided for browser tabs. The loader uses animated SVG rings with the transparent logo and wordmark.

## Photography — important
Images are illustrative third-party image references, not Sugarplum Events projects. They are hotlinked and depend on the source websites remaining available. Check image rights and obtain permission before commercial publication; replace with licensed or business-owned images where necessary. Original source URLs are recorded in `images/image-sources.json`.

## Editing
- Colours and typography: `css/style.css` at `:root`.
- Logo: replace files in `images/logo/`.
- Instagram URL: search for `https://www.instagram.com/sugarplum_events/`.
- Business copy and services: edit relevant HTML files.
- Gallery categories: edit `gallery.html`.
- Loader timing and behavior: `js/main.js` and `css/style.css`.

## Contact behavior
The form does not send data to a server. It prepares the entered information and copies it to the clipboard so visitors can paste it into an Instagram DM. It clearly explains this behavior.

## SEO / launch checklist
- Replace `https://www.example.com` in `sitemap.xml` and `robots.txt` with the real domain.
- Add the real canonical domain to each page.
- Configure Google Analytics with the business's own measurement ID.
- Verify the domain in Google Search Console and submit the sitemap.
- Confirm image permissions before publishing.
- Add only confirmed business contact details and service specifics.
- Replace illustrative images with approved Sugarplum Events portfolio photography.

## Editing the source code

All HTML, CSS, and JavaScript files are formatted with consistent indentation and line breaks. Shared site interactions are organized in `js/main.js`, and the main visual system and responsive overrides are in `css/style.css`.
