# 🔧 Troubleshooting GitHub Pages Deployment

## 📧 **Turn off workflow failure emails**

If you're getting email notifications every time the "Deploy Storybook" workflow fails:

1. Go to **GitHub → Settings → Notifications**  
   (or [github.com/settings/notifications](https://github.com/settings/notifications))
2. Under **System**, find **Actions**
3. Change the dropdown from **"Email"** or **"Only notify for failed workflows"** to:
   - **"On GitHub"** – only in-app notifications, no email, or  
   - **"Don't notify"** – no workflow notifications at all

You can also unwatch the repo or change **Watch** settings for this repository so you're not subscribed to Actions for it.

---

## 🚨 **Issue: https://uxdelta.github.io/muka/ is not working**

### Quick Fixes

#### 1. **Check GitHub Pages Settings**
- Go to: `https://github.com/uxdelta/muka/settings/pages`
- Ensure **Source** is set to **"GitHub Actions"**
- If it's set to "Deploy from a branch", change it to "GitHub Actions"

#### 2. **Check GitHub Actions Status**
- Go to: `https://github.com/uxdelta/muka/actions`
- Look for failed workflows (red X marks)
- Check the logs of any failed deployments

#### 3. **Manual Deployment Test**
```bash
# Test if Storybook builds locally
npm run build-storybook

# Check if storybook-static folder is created
ls -la storybook-static/
```

#### 4. **Force New Deployment**
```bash
# Make a small change to trigger deployment
echo '{"test": "deployment"}' >> tokens/test.json
git add . && git commit -m "force deployment" && git push origin main
```

## 🔍 **Common Issues & Solutions**

### Issue: "Page not found" or 404
**Cause:** GitHub Pages not enabled or wrong source
**Solution:**
1. Go to repository Settings → Pages
2. Source: Select "GitHub Actions"
3. Save settings

### Issue: Workflow fails with permission errors
**Cause:** Missing permissions or wrong deployment method
**Solution:** The workflow uses the official GitHub Pages actions (`upload-pages-artifact` + `deploy-pages`) with:
- **Build job:** checkout, npm ci, build tokens, build Storybook, upload `storybook-static/` as artifact
- **Deploy job:** `pages: write` and `id-token: write`, targets the `github-pages` environment

Ensure **Settings → Pages → Source** is set to **"GitHub Actions"** (not "Deploy from a branch").

### Issue: Storybook build fails
**Cause:** Missing dependencies or build errors
**Solution:**
```bash
# Test locally
npm ci
npm run build-storybook
```

### Issue: Deployment artifact not found
**Cause:** Build step failed or wrong path
**Solution:** Check that `storybook-static` folder exists after build

## 🚀 **Deploy Storybook workflow**

The workflow (`.github/workflows/deploy-storybook.yml`) uses the **official** GitHub Pages deployment:

- **Build job:** Checkout → Node 18 → `npm ci` → `npm run build:tokens` → `npm run build-storybook` → `actions/upload-pages-artifact` (path: `storybook-static/`)
- **Deploy job:** `actions/deploy-pages` with `pages: write` and `id-token: write`, targeting the `github-pages` environment

**Required:** In the repo, **Settings → Pages → Source** must be **"GitHub Actions"**. The `github-pages` environment is created automatically if it doesn't exist.

## 🎯 **Next Steps**

1. **Check GitHub Pages settings** (most common issue)
2. **Look at Actions tab** for any failed workflows
3. **Try manual deployment** if needed
4. **Check the new standalone workflow** for more reliable deployment

## 📞 **Still Not Working?**

If the issue persists:

1. **Check repository permissions** - Ensure you have admin access
2. **Verify GitHub Pages is available** - Some repositories have restrictions
3. **Check organization settings** - If it's an org repo, check org Pages settings
4. **Try a different branch** - Some repos have branch protection rules

## 🎉 **Expected Result**

Once working, you should see:
- ✅ Live Storybook at `https://uxdelta.github.io/muka/`
- ✅ Automatic updates when you push changes
- ✅ Green checkmarks in Actions tab
