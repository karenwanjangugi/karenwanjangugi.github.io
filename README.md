# Karen's Nine Worlds

A playful software engineering portfolio you explore like a game. The same content lives in nine hand-drawn worlds, each in its own cartoon style, and visitors can hop between them with the world picker.

| World | Style |
|---|---|
| Deep Dive | Clay animation, underwater |
| Sakura Café | Shoujo anime |
| The Karen Show | Retro pop art (kitsch) |
| Wet Paint | Graffiti and street art |
| The Midnight Library | Gothic, luxurious vampiric |
| Karen's Notebook | Black-and-white doodle |
| The Illuminated Codex | Medieval manuscript |
| Karen Quest | 16-bit pixel art |
| KarenOS 2000 | Y2K cyber-glam |

## Features

- A guide avatar that travels down the page and comments on each section
- A crew of five characters per world, one for each thing I do
- Five hidden collectibles per world, each unlocking a different prize
- Textures on characters and pages done with SVG filters, no image files
- A shareable link for each world: add `#anthro`, `#kawaii`, `#kitsch`, `#graffiti`, `#gothic`, `#doodle`, `#medieval`, `#pixel` or `#y2k` to the URL
- Works on phones, and respects "reduce motion" settings

## Project structure

```
index.html        Page structure
css/styles.css    World themes, layout and animations
js/content.js     Your content: stack, roles, projects, "How I build" steps
js/worlds.js      Each world's name, labels, guide lines and fonts
js/art.js         Art engine: styles, faces, characters, avatars, scenery
js/prizes.js      The prize each world awards
js/cast.js        Each world's five characters, names and catchphrases
js/app.js         World switching, scrolling effects, collectibles, contact form
```

To update your projects, stack or roles, edit `js/content.js` only. Every world picks up the changes.

## Run it locally

No build step or dependencies. Open `index.html` in a browser, or serve the folder:

```
python3 -m http.server 8000
```

Then visit http://localhost:8000.

## Publish with GitHub Pages

1. Push this repository to GitHub.
2. Open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, pick `main` and `/ (root)`, then save.
4. Your site appears at `https://<your-username>.github.io/<repository-name>/` within a minute or two.

## Credits

Built by Karen in Nairobi. Fonts from Google Fonts. All characters and illustrations are original SVG artwork drawn in code.
