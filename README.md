# Personal Portfolio Website

Portfolio of Sukhleen Kaur, built with Jekyll and hosted on GitHub Pages.

## Editing content

Everything editable lives in two places:

- `_config.yml`: name, email, bio, social links, marquee text, rotating hero words
- `_data/`: projects, experience, education, skills (one yml file each)

The page layout itself is in `index.html`, styles in `assets/css/style.css`
(colors and fonts are CSS variables at the top), and small behaviors in
`assets/js/main.js`.

## Placeholder previews

The Aera and Tidemark cards use little animated CSS phone previews instead of
screenshots. To use real screenshots later, replace the `phone-mock` blocks in
`index.html` with an image tag, for example:

```html
<img src="assets/img/aera-screenshot.png" alt="Aera screenshot" class="tape" style="width:175px;margin:18px auto 4px" />
```

## Running locally

```
bundle install
bundle exec jekyll serve
```

Then open http://localhost:4000.
