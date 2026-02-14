# Deployment Guide

## Automated Git-Based Deployment

This project uses GitHub Actions to automatically build and deploy when you push to the `main` branch.

## Setup Instructions

### 1. Configure GitHub Secrets

Go to your GitHub repository → **Settings** → **Secrets and variables** → **Actions** → **New repository secret**

Add these secrets:

| Secret Name | Value | How to Find |
|-------------|-------|-------------|
| `FTP_SERVER` | Your Plesk FTP hostname | Plesk → Websites & Domains → FTP Access |
| `FTP_USERNAME` | Your FTP username | Plesk → Websites & Domains → FTP Access |
| `FTP_PASSWORD` | Your FTP password | Your Plesk FTP password |
| `NEXT_PUBLIC_RAILWAY_API_URL` | `https://api.arisan.gr/api` | Your Railway API URL |

### 2. Get Your Plesk FTP Details

1. Log into **Plesk**
2. Go to **Websites & Domains**
3. Click **FTP Access**
4. Note down:
   - **FTP Server**: Usually `ftp.arisan.gr` or your server IP
   - **Username**: Usually your domain name or custom username
   - **Password**: Your FTP password (create one if needed)

### 3. Workflow

Now, whenever you make changes:

```bash
# 1. Make your changes locally
# Edit files in app/page.tsx, components/, etc.

# 2. Commit and push to GitHub
git add .
git commit -m "Update homepage content"
git push origin main

# 3. GitHub Actions automatically:
#    - Builds your project (npm run build)
#    - Uploads the out/ folder to Plesk via FTP
#    - Your changes go live!
```

### 4. Monitor Deployments

- Go to your GitHub repository → **Actions** tab
- You'll see each deployment run
- Click on a run to see build logs and any errors

### 5. First Time Setup

After setting up GitHub secrets:

```bash
# Add the workflow file to git
git add .github/workflows/deploy.yml
git add DEPLOYMENT.md
git commit -m "Add automated deployment workflow"
git push origin main
```

---

## Alternative: Manual Deployment (Current Method)

If you prefer to keep manual deployment:

```bash
# 1. Build locally
npm run build

# 2. Upload out/ folder to Plesk
# Use FTP client or Plesk file manager
```

---

## Troubleshooting

### Deployment fails
- Check GitHub Actions logs for errors
- Verify FTP credentials in GitHub Secrets
- Ensure Plesk FTP access is enabled

### Changes not showing
- GitHub Actions completed successfully?
- Clear browser cache (Ctrl + Shift + R)
- Purge Cloudflare cache if using CDN

### Build fails
- Check that .env.production is committed to git
- Verify NEXT_PUBLIC_RAILWAY_API_URL secret is set

---

## Cache Management

After deploying, if changes don't show:

1. **Browser**: Hard refresh (Ctrl + Shift + R)
2. **Cloudflare**: Purge Everything in Cloudflare dashboard
3. **Plesk**: Ensure nginx/Apache cache is disabled for HTML files
