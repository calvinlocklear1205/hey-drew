# HeyDrew - Add Admin Dashboard to Existing Repo

## Task for Claude Code

Add the admin dashboard to the existing hey-drew repo. Both files are ready to go with working cross-links.

## Repo
https://github.com/calvinlocklear1205/hey-drew

## Files to Add/Replace

1. **`index.html`** - Updated client app with "View Admin →" link in the bottom bar
2. **`admin.html`** - New admin dashboard with "View Client App →" link in sidebar

## Commands

```bash
# Clone the repo
git clone https://github.com/calvinlocklear1205/hey-drew.git
cd hey-drew

# Copy the two files (index.html and admin.html) into the repo root
# They should replace/add to the existing files

# Commit and push
git add .
git commit -m "Add admin dashboard and cross-links"
git push
```

## Result

After deployment:
- **https://hey-drew.vercel.app** → Client app (with "View Admin →" button)
- **https://hey-drew.vercel.app/admin.html** → Admin dashboard (with "View Client App →" button)

## Links Already Configured

- Client → Admin: `./admin.html`
- Admin → Client: `./index.html`

No URL changes needed - relative paths work automatically!
