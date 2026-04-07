# Personal Portfolio — Jekyll Version

GitHub Pages builds this automatically — no build step needed on your end. Just push and it's live.

## How to update your content

| What you want to change | File to edit |
|-------------------------|--------------|
| Name, bio, subtitle, email, social links | `_config.yml` |
| Work experience | `_data/experience.yml` |
| Projects | `_data/projects.yml` |
| Education | `_data/education.yml` |
| Skills | `_data/skills.yml` |

Every file uses plain YAML — just edit the text values. Order in the file = order on the page.

### Add a new job
Open `_data/experience.yml` and copy-paste a block:
```yaml
- role: "Your Role"
  company: "Company Name"
  period: "Month Year – Month Year"
  description: >
    What you did. Can span multiple lines.
  tags: [Python, React, AWS]
```

### Feature / unfeature a project
Set `featured: true` or `featured: false` in `_data/projects.yml`.

### Add your photo
1. Copy your photo to `assets/img/photo.jpg`
2. In `index.html`, find the `<!-- TO USE YOUR OWN PHOTO -->` comment:
   - Delete the `<div class="profile-photo-placeholder">` line
   - Uncomment the `<img ...>` line above it

## Deploy to GitHub Pages

```bash
# First time
git init
git add .
git commit -m "initial portfolio"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

Then: **Settings → Pages → Source → main branch → Save**

Your site will be live at `https://yourusername.github.io` within ~60 seconds.

## Preview locally (optional)

Requires Ruby + Bundler:
```bash
bundle install
bundle exec jekyll serve
# open http://localhost:4000
```
