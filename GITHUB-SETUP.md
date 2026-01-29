# GitHub Setup Instructions

## Step 1: Create a GitHub Account (if needed)
1. Go to [github.com](https://github.com)
2. Click "Sign up"
3. Follow the prompts to create your account

---

## Step 2: Create a New Repository

1. Click the **+** icon in the top right → **New repository**
2. Fill in:
   - **Repository name**: `heydrew-prototype` (or whatever you prefer)
   - **Description**: "HeyDrew Tax Strategy Assistant Mobile Prototype"
   - **Public** or **Private** (your choice)
   - ✅ Check "Add a README file" — **NO, uncheck this** (we have our own)
3. Click **Create repository**

---

## Step 3: Upload Files

### Option A: Upload via GitHub Web Interface (Easiest)

1. On your new repo page, click **"uploading an existing file"** link
2. Drag and drop ALL files from the downloaded folder:
   - `index.html`
   - `README.md`
   - `.gitignore`
   - `assets/` folder (with both images)
3. Add commit message: "Initial prototype upload"
4. Click **Commit changes**

### Option B: Upload via Git Command Line

```bash
# Navigate to your downloaded folder
cd heydrew-prototype

# Initialize git
git init

# Add all files
git add .

# Commit
git commit -m "Initial prototype upload"

# Add your GitHub repo as remote (replace with your URL)
git remote add origin https://github.com/YOUR-USERNAME/heydrew-prototype.git

# Push to GitHub
git branch -M main
git push -u origin main
```

---

## Step 4: Enable GitHub Pages (Free Hosting!)

1. Go to your repository on GitHub
2. Click **Settings** (gear icon)
3. Scroll down to **Pages** in the left sidebar
4. Under "Source", select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**
6. Wait 1-2 minutes, then refresh
7. You'll see: **"Your site is live at https://username.github.io/heydrew-prototype"**

---

## Step 5: Share Your Prototype!

Your live URL will be:
```
https://YOUR-USERNAME.github.io/heydrew-prototype
```

Share this link with anyone to let them try the prototype!

---

## Updating the Prototype

### Via Web Interface:
1. Navigate to `index.html` in your repo
2. Click the pencil icon (Edit)
3. Make changes
4. Click **Commit changes**
5. GitHub Pages auto-updates in ~1 minute

### Via Git:
```bash
# Make your changes locally
git add .
git commit -m "Description of changes"
git push
```

---

## Troubleshooting

### "Page not found" on GitHub Pages
- Wait 2-3 minutes after enabling Pages
- Make sure the file is named exactly `index.html` (lowercase)
- Check Settings → Pages to confirm it's enabled

### Images not showing
- Make sure the `assets/` folder was uploaded
- File names are case-sensitive on GitHub

### Changes not appearing
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Wait 1-2 minutes for GitHub Pages to rebuild

---

## Quick Reference

| Task | How |
|------|-----|
| View locally | Open `index.html` in browser |
| Deploy | Settings → Pages → main branch |
| Edit | Click file → pencil icon → commit |
| Share | `https://username.github.io/repo-name` |

---

Questions? The README.md has more details about the prototype features and customization options.
