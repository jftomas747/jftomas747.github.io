# John Tomas Engineering Portfolio Hub

A deployment-ready static GitHub Pages site that connects these four project websites:

- B-2 Spirit Composite Model
- Autonomous Romi Robot
- QArm Tic-Tac-Toe Robot
- Composite Carrier

The site uses plain HTML, CSS, and JavaScript. There is no framework, package manager, or build step.

## Included interactions

- Responsive project constellation in the hero section
- Project filters by engineering discipline
- Expandable technical-summary dialog for every project
- Keyboard project launcher with `Command/Ctrl + K` or `/`
- Dark and light themes with saved preference
- Scroll reveal, progress indicator, active navigation, hover tilt, and back-to-top control
- Reduced-motion support and keyboard-accessible controls
- Social sharing image, web app icons, custom 404 page, and `.nojekyll`

## Recommended GitHub Pages deployment

This package is configured for the user site:

`https://jftomas747.github.io/`

1. Create a repository named exactly `jftomas747.github.io`, or open that repository if it already exists.
2. Put the **contents** of this folder at the root of the repository. `index.html` must be at the top level.
3. In the repository, open **Settings → Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/(root)` folder, then save.
6. After the Pages deployment finishes, open `https://jftomas747.github.io/`.

GitHub notes that publishing can take several minutes after a push. Official instructions:

- https://docs.github.com/en/pages/quickstart
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

### Command-line upload

After creating the repository on GitHub, run these commands from this folder:

```bash
git init
git add .
git commit -m "Add engineering portfolio hub"
git branch -M main
git remote add origin https://github.com/jftomas747/jftomas747.github.io.git
git push -u origin main
```

When updating an existing repository, clone it first, copy these files into the clone, then commit and push.

## Local preview

From this folder:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Main files

- `index.html` — content, structure, project cards, dialogs, SEO metadata
- `styles.css` — visual design, responsive layouts, themes, animation, accessibility states
- `script.js` — project data, filtering, dialogs, search launcher, theme, scroll behavior
- `assets/` — optimized project images, icons, favicon, and social card
- `404.html` — custom not-found page
- `site.webmanifest` — installable-site metadata
- `.nojekyll` — tells GitHub Pages to serve the static files directly

## Updating project text or links

Each card’s visible text is in `index.html`. The detailed modal summaries and command-palette search data are in the `projects` object at the top of `script.js`.

When adding another project:

1. Add a new card in the `projects-grid` section of `index.html`.
2. Add the corresponding project object in `script.js`.
3. Add a local optimized image under `assets/`.
4. Update the hero map or the project count if you want the new project featured there.

## Deploying under a project repository instead of the root user site

The relative asset paths will still work, but update these absolute URLs in `index.html`:

- `<link rel="canonical">`
- `og:url`
- `og:image`
- JSON-LD `url`

For example, a repository named `engineering-portfolio` would publish at:

`https://jftomas747.github.io/engineering-portfolio/`

## Image optimization

The delivered site uses WebP versions of the existing project images. The larger source downloads and the temporary image-building script are intentionally excluded from the final deployment package.
