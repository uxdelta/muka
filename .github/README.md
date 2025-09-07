# 🤖 Design System Automation

This directory contains GitHub Actions workflows that automatically handle design token building and Storybook deployment.

## 📋 Workflows

### 1. Build Design Tokens (`build-tokens.yml`)

**Triggers:**
- Push to `main` branch
- Changes to `tokens/` directory
- Changes to `build/manifest.json`
- Changes to `scripts/build-tokens.js`

**What it does:**
1. Installs dependencies
2. Runs `node scripts/build-tokens.js`
3. Commits updated CSS files to `styles/`
4. Comments on pull requests with status

**Output:**
- Updated CSS files in `styles/` directory
- Automatic commit with message: "🤖 Auto-build: Update design tokens CSS files"

### 2. Deploy Storybook (`deploy-storybook.yml`)

**Triggers:**
- Push to `main` branch (when CSS/components change)
- Completion of "Build Design Tokens" workflow

**What it does:**
1. Installs dependencies
2. Runs `npm run build-storybook`
3. Deploys to GitHub Pages
4. Updates live Storybook documentation

**Output:**
- Live Storybook at GitHub Pages URL
- Automatic updates when tokens change

## 🚀 Quick Start

### Enable GitHub Pages
1. Go to repository Settings → Pages
2. Source: "GitHub Actions"
3. Save settings

### Test Automation
```bash
# Make a small token change
echo '{"color": {"test": {"500": {"$value": "#ff0000"}}}}' >> tokens/t1-primitives/color.json

# Commit and push
git add .
git commit -m "test automation"
git push

# Check Actions tab for workflow runs
```

## 🔧 Configuration

### Custom Domain (Optional)
Edit `deploy-storybook.yml`:
```yaml
cname: your-domain.com
```

### Workflow Permissions
The workflows use `GITHUB_TOKEN` with these permissions:
- `contents: write` - To commit CSS files
- `pages: write` - To deploy Storybook
- `pull-requests: write` - To comment on PRs

## 🐛 Troubleshooting

### Workflow Not Running
- Check repository has Actions enabled
- Verify file paths in workflow triggers
- Ensure you're pushing to `main` branch

### CSS Files Not Updating
- Check `scripts/build-tokens.js` runs successfully
- Verify token file syntax is valid JSON
- Check `build/manifest.json` configuration

### Storybook Not Deploying
- Enable GitHub Pages in repository settings
- Check Pages source is set to "GitHub Actions"
- Verify `npm run build-storybook` works locally

### Pre-commit Hooks Not Working
```bash
# Reinstall husky
npm uninstall husky
npm install --save-dev husky
npm run setup:automation
```

## 📊 Monitoring

### Check Workflow Status
1. Go to repository → Actions tab
2. View "Build Design Tokens" runs
3. Check "Deploy Storybook" runs

### View Live Storybook
- URL: `https://your-username.github.io/your-repo-name/`
- Updates automatically when tokens change

### Debug Logs
- Click on any workflow run
- Expand steps to see detailed logs
- Check for error messages

## 🎯 Benefits

✅ **No Manual Rebuilds** - Tokens update automatically  
✅ **Consistent Deployments** - Same process every time  
✅ **Team Collaboration** - Everyone gets latest tokens  
✅ **Documentation Always Current** - Storybook stays updated  
✅ **Error Prevention** - Automated validation and testing  

---

*This automation ensures your design system stays synchronized across all environments automatically.*
