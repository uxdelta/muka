# 🚀 Quick Start: Automatic Token Rebuilding & Storybook Deployment

## ✅ **What's Ready**

Your automation is **fully configured** and ready to go! Here's what happens automatically:

### 🔄 **When You Push Token Changes**
1. **Build Design Tokens** workflow runs automatically
2. CSS files are rebuilt and committed
3. **Deploy Storybook** workflow triggers
4. Storybook is deployed to GitHub Pages
5. **Live Storybook updates** at `https://uxdelta.github.io/muka/`

## 🎯 **One-Time Setup Required**

### Enable GitHub Pages
1. Go to: `https://github.com/uxdelta/muka/settings/pages`
2. Source: Select **"GitHub Actions"**
3. Click **"Save"**

That's it! Your automation will work immediately.

## 🎨 **Your New Workflow**

### Before (Manual)
```bash
# Edit tokens
# npm run build:tokens
# npm run build-storybook
# Manual deployment
```

### Now (Automatic)
```bash
# Edit tokens
git add .
git commit -m "update brand colors"
git push origin main
# 🎉 Everything else happens automatically!
```

## 📊 **Monitor Your Automation**

### Check Workflow Status
- **Actions Tab:** `https://github.com/uxdelta/muka/actions`
- **Live Storybook:** `https://uxdelta.github.io/muka/`

### What to Look For
1. **"Build Design Tokens"** workflow runs when you push token changes
2. **"Deploy Storybook"** workflow runs after token building
3. **Green checkmarks** = Success
4. **Red X marks** = Issues (check logs)

## 🎉 **Benefits**

✅ **Zero Manual Steps** - Just push your changes  
✅ **Always Up-to-Date** - Storybook reflects latest tokens  
✅ **Team Collaboration** - Everyone gets changes instantly  
✅ **Consistent Process** - Same workflow every time  
✅ **Error Prevention** - Automated validation  

## 🚫 **Disable If Needed**

```bash
npm run disable:automation
```

## 🔄 **Re-enable Later**

```bash
npm run enable:automation
```

---

**Your design system is now fully automated! 🎨✨**

*Just enable GitHub Pages and you're ready to go!*
