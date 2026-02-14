# Plesk Git Deployment Setup

## Overview

This project uses Plesk Git integration for automatic deployment. When you push to the `main` branch, Plesk automatically pulls the changes, builds the project, and deploys it.

## Setup Steps

### 1. Add Git Repository in Plesk

1. Log into **Plesk**
2. Go to **Websites & Domains** → **Git**
3. Click **Add Repository**
4. Configure:
   - **Repository URL**: `https://github.com/ArisAna/arisan-frontend.git`
   - **Repository name**: `arisan-frontend`
   - **Branch**: `main`
   - **Repository directory**: `/var/www/vhosts/arisan.gr/arisangr/repository`
   - **Deployment mode**: **Automatic** (deploy on push)

### 2. Configure Deployment Script

In Plesk Git settings:

1. Enable **"Run script after repository pull"**
2. Script path: `deploy.sh`
3. The script will:
   - Install npm dependencies
   - Build the Next.js app
   - Copy `out/` folder to `httpdocs/`

### 3. Set Environment Variables

In Plesk → **Node.js** settings, add:

```
NEXT_PUBLIC_RAILWAY_API_URL=https://api.arisan.gr/api
```

### 4. Initial Deployment

After setup, trigger first deployment:

1. In Plesk Git, click **Pull Updates**
2. Monitor the deployment log
3. Check `https://arisan.gr` for changes

## Workflow

```
Local changes → Git commit → Git push → Plesk auto-pulls →
Runs deploy.sh → Builds project → Copies to httpdocs → Live!
```

## Benefits

- ✅ No FTP needed
- ✅ Automatic on push
- ✅ Build happens on server
- ✅ Version controlled
- ✅ Deployment logs in Plesk

## Troubleshooting

### Build fails
- Check Plesk deployment logs
- Verify Node.js version (need 20+)
- Check environment variables are set

### Changes don't appear
- Clear browser cache (Ctrl + Shift + R)
- Purge Cloudflare cache
- Check deployment log for errors

---

## Migration from FTP Deployment

Previous deployment used GitHub Actions + FTP. This has been replaced with Plesk Git for better reliability.

The old workflow file is saved as `.github/workflows/deploy.yml.disabled` for reference.
