# Personal Photography Portfolio

A minimalist, accessible photography portfolio built with semantic HTML5, SCSS, and vanilla JavaScript. Deployed via GitHub Pages.

**Lighthouse scores:** Performance 100 · Accessibility 100 · Best Practices 100 · SEO 100

## Features

- Fully responsive (mobile-first), works down to small phone screens
- Accessible lightbox gallery: keyboard navigation (Tab/Shift+Tab focus trap, Arrow keys, Escape to close), visible focus rings, ARIA roles
- WCAG AA color contrast throughout (verified with Lighthouse)
- `prefers-reduced-motion` respected
- No build tools required to run — just HTML/CSS/JS

## Project structure

```
photo-portfolio/
├── index.html          # Gallery / homepage
├── about.html          # About page
├── contact.html         # Contact page (static demo form)
├── 404.html             # Custom 404 page
├── css/
│   ├── style.scss      # SCSS source — edit this
│   └── style.css       # Compiled CSS — what the browser actually loads
├── js/
│   └── main.js          # Lightbox logic
└── images/
    ├── placeholder-01.svg ... placeholder-06.svg   # Replace these with real photos
    └── favicon.svg
```

## Replacing the placeholder photos

1. Add your real photos into the `images/` folder (e.g. `photo-01.jpg`, `photo-02.jpg`...). Recommended sizes: roughly 1200px on the long edge, exported as `.jpg` at ~80% quality to keep file sizes small.
2. In `index.html`, find each `<img>` tag and update:
   - `src="images/placeholder-01.svg"` → `src="images/photo-01.jpg"`
   - The `alt` text — **this is important for accessibility**. Replace the placeholder description with a real, concise description of what's actually in the photo (e.g. `alt="Empty tram platform at dusk, Canberra"`), not just the filename.
3. Update the `<figcaption>` title/date/location text for each photo.
4. If you have more or fewer than 6 photos, copy/remove `<li class="gallery-item">` blocks as needed. Add `gallery-item--tall` to the `<li>` class if a photo is portrait-orientation, for visual variety in the grid.

## Editing styles

Edit `css/style.scss`, not `css/style.css` directly — the `.css` file is generated output and will be overwritten next time you compile.

To compile after editing (requires Node.js):

```bash
npm install -g sass
sass css/style.scss css/style.css --no-source-map
```

Re-run this command every time you change `style.scss`, before committing or deploying.

## Deploying to GitHub Pages (step by step)

These steps assume you already have a GitHub account and Git installed locally. If you're not sure, see the "First-time setup" notes at the bottom.

### 1. Create a new repository on GitHub

1. Go to [github.com/new](https://github.com/new)
2. Repository name: something like `photo-portfolio` (this will become part of your URL)
3. Set it to **Public** (GitHub Pages requires a public repo on free accounts)
4. Do **not** initialize with a README (you already have one) — leave "Add a README file" unchecked
5. Click **Create repository**

### 2. Push this project to GitHub

Open a terminal, navigate into this project folder, then run:

```bash
cd path/to/photo-portfolio
git init
git add .
git commit -m "Initial commit: photography portfolio"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/YOUR-REPO.git
git push -u origin main
```

Replace `YOUR-USERNAME` and `YOUR-REPO` with your actual GitHub username and the repository name you chose in Step 1.

### 3. Turn on GitHub Pages

1. On your repository's GitHub page, click **Settings** (top right of the repo)
2. In the left sidebar, click **Pages**
3. Under **Build and deployment** → **Source**, select **Deploy from a branch**
4. Under **Branch**, select `main` and folder `/ (root)`, then click **Save**
5. Wait 1-2 minutes. Refresh the page — GitHub will show a green banner with your live URL, typically:
   ```
   https://YOUR-USERNAME.github.io/YOUR-REPO/
   ```

### 4. Update the placeholder links in the code

Before (or after) deploying, search the project for `YOUR-USERNAME/YOUR-REPO` (it appears in the footer of each HTML page as a "View source on GitHub" link) and replace it with your actual repo URL. Re-commit and push:

```bash
git add .
git commit -m "Update repo links"
git push
```

GitHub Pages will automatically redeploy within a minute or two of every push to `main`.

### 5. Add the link to your CV / resume

Once live, use the URL from Step 3, e.g.:

```
Personal Photography Portfolio | yourusername.github.io/photo-portfolio    2026
```

---

### First-time setup (if you've never used Git/GitHub before)

1. Install Git: [git-scm.com/downloads](https://git-scm.com/downloads)
2. Create a GitHub account: [github.com/join](https://github.com/join)
3. Configure Git locally (one-time, in any terminal):
   ```bash
   git config --global user.name "Your Name"
   git config --global user.email "your-email@example.com"
   ```
4. You may be prompted to authenticate when you `git push` for the first time — GitHub will guide you through creating a Personal Access Token or signing in via browser.

## Accessibility notes (for reference / interview talking points)

- Semantic landmarks: `<header>`, `<main>`, `<footer>`, `<nav>` with `aria-label`
- Skip-to-content link for keyboard/screen-reader users
- All interactive elements (gallery thumbnails, lightbox controls, form fields) are real `<button>`/`<input>` elements, not divs with click handlers
- Lightbox is a proper `role="dialog"` with `aria-modal`, full keyboard focus trap, and returns focus to the triggering thumbnail on close
- Color contrast verified at WCAG AA (4.5:1+) via Lighthouse audit
- `prefers-reduced-motion` media query disables transitions for users who request it
- Images use `loading="lazy"` and explicit `width`/`height` to prevent layout shift
