# 🔧 Troubleshooting GitHub Pages Deployment

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
**Cause:** Missing permissions
**Solution:** The workflow now includes proper permissions:
```yaml
permissions:
  contents: read
  pages: write
  id-token: write
```

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

## 🚀 **Updated Workflow**

I've created a more reliable deployment workflow:

### New Features:
- ✅ **Standalone deployment** - Doesn't depend on token workflow
- ✅ **Manual trigger** - Can be triggered manually if needed
- ✅ **Proper permissions** - Uses latest GitHub Pages actions
- ✅ **Environment protection** - Uses GitHub Pages environment
- ✅ **Token building included** - Builds tokens as part of deployment

### Files:
- `deploy-storybook.yml` - Updated with new actions
- `deploy-storybook-standalone.yml` - New standalone workflow

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
