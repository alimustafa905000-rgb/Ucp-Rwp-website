# UCP Rawalpindi — React Website

This is your 8-page site (Home, About, Societies, Campus Info, Notice Board,
E-Magazine, Projects, Contact) rebuilt as a single React app with the same
layout, sections and content as the original HTML pages — now with routing,
reusable components, and scroll animations powered by React.

## Getting started

```bash
npm install
npm run dev
```

Then open the printed local URL (usually `http://localhost:5173`).

To build for production:

```bash
npm run build
```

This outputs a static site into `dist/` that you can deploy anywhere
(Netlify, Vercel, GitHub Pages, your own server, etc).

## Adding your images & logo

Nothing in the code needs to change. Just drop your image files into the
`public/images` folder (and your magazine PDF into `public/files`) using the
exact file names listed in **`public/images/README.md`**. Until you add a
file, a neutral placeholder is shown automatically so nothing looks broken.

## Project structure

```
src/
  components/     Navbar, Footer, Layout (shared across every page)
  hooks/          scroll progress, reveal-on-scroll, animated counters
  data/           societiesData.js — edit this to change clubs/team members
  pages/          one folder per page, each with its own .jsx + .module.css
  styles/         global.css — shared colors, fonts, base styles
public/
  images/         put your photos & logos here (see images/README.md)
  files/          put your magazine PDF here
```

Each page keeps its own CSS in a `*.module.css` file (CSS Modules), so
styling from one page can never accidentally leak into another — exactly
like the original standalone HTML files, just organized for React.

## Notes

- Routing uses `react-router-dom` — the nav bar highlights the active page
  automatically, no manual "active" classes needed.
- The video-upload card on the Home page, the club/society detail view, the
  E-Magazine reader, the project filter tabs, and the contact form are all
  wired up with real React state (not just static markup).
- Societies data (names, descriptions, team members) lives in
  `src/data/societiesData.js` — edit that file to add or update a club.
