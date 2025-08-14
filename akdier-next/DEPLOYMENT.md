# Vercel Deployment Guide

## Steps to Deploy to Vercel:

1. **Make sure you're in the correct directory:**
   ```bash
   cd /Users/sevaraibragimova/Desktop/akdier/akdier-next
   ```

2. **Install Vercel CLI (if not already installed):**
   ```bash
   npm install -g vercel
   ```

3. **Deploy to Vercel:**
   ```bash
   vercel
   ```

4. **Follow the prompts:**
   - Set up and deploy? → Yes
   - Which scope? → Select your account
   - Link to existing project? → No
   - What's your project's name? → akdier-next (or any name you prefer)
   - In which directory is your code located? → ./ (current directory)

5. **Alternative: Deploy via GitHub:**
   - Push your code to GitHub
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect it's a Next.js project

## Important Notes:

- Make sure you're deploying from the `akdier-next` directory, NOT the parent `akdier` directory
- The `vercel.json` file is already configured for proper deployment
- The build should work correctly as tested locally

## Troubleshooting:

If you still get 404 errors:
1. Check that you're deploying from the correct directory
2. Ensure all files are committed to git
3. Check the Vercel deployment logs for any build errors
