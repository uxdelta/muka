# 🚫 GitHub Actions Email Notifications - Fix Guide

## Why You're Getting These Emails

You're receiving GitHub Actions failure notifications because I set up automatic workflows that:

1. **Build Design Tokens** - Automatically rebuilds CSS when you change tokens
2. **Deploy Storybook** - Automatically deploys Storybook to GitHub Pages

These workflows are failing because:
- GitHub Pages isn't enabled in your repository
- The workflows need proper permissions
- The automation might not be what you want

## 🔧 Quick Fix Options

### Option 1: Disable Automation (Recommended if you don't want it)

```bash
# Disable all GitHub Actions automation
npm run disable:automation
```

This will:
- ✅ Stop all automation workflows
- ✅ Stop receiving failure emails
- ✅ Keep your local development unchanged

### Option 2: Fix the Automation (If you want it to work)

```bash
# Enable GitHub Pages in your repository
# Go to: Settings → Pages → Source: "GitHub Actions"
```

Then the workflows will work properly and deploy your Storybook automatically.

### Option 3: Manual Control

```bash
# Disable automation
npm run disable:automation

# When you want to rebuild tokens manually:
npm run build:tokens

# When you want to deploy Storybook manually:
npm run build-storybook
# Then manually deploy the storybook-static folder
```

## 🎯 What I Fixed

1. **Added proper permissions** to workflows
2. **Removed problematic CNAME** configuration
3. **Created disable/enable scripts** for easy control
4. **Fixed workflow configurations** to prevent failures

## 📧 Stop Email Notifications

### Method 1: Disable Workflows
```bash
npm run disable:automation
```

### Method 2: GitHub Notification Settings
1. Go to GitHub → Settings → Notifications
2. Under "Actions", uncheck "Email"
3. Or go to your repository → Settings → Notifications → Unsubscribe

### Method 3: Repository Settings
1. Go to your repository → Settings → Actions
2. Disable "Allow all actions and reusable workflows"

## 🚀 If You Want Automation Working

1. **Enable GitHub Pages:**
   - Repository Settings → Pages
   - Source: "GitHub Actions"
   - Save

2. **Re-enable workflows:**
   ```bash
   npm run enable:automation
   ```

3. **Test with a small change:**
   ```bash
   # Make a small token change
   echo '{"test": "value"}' >> tokens/test.json
   git add . && git commit -m "test automation" && git push
   ```

## 🎨 Your Design System Status

- ✅ **Indigo colors are working** in Storybook
- ✅ **Local development works** perfectly
- ✅ **Token building works** manually
- ❌ **Automation is failing** (but can be fixed or disabled)

## 💡 Recommendation

If you don't need automatic deployment, I recommend:

```bash
npm run disable:automation
```

This gives you:
- ✅ No more failure emails
- ✅ Full control over when things happen
- ✅ Same great design system functionality
- ✅ Manual token building when needed

You can always re-enable automation later with `npm run enable:automation` if you change your mind.
