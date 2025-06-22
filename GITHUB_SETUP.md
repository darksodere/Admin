# 🚀 GitHub Setup Guide for Otaku Ghor

## Step 1: Install Git

### Option A: Download Git for Windows
1. Go to https://git-scm.com/download/win
2. Download and install Git for Windows
3. During installation, choose "Git from the command line and also from 3rd-party software"
4. Restart your terminal/command prompt

### Option B: Install via Chocolatey (if you have it)
```powershell
choco install git
```

### Option C: Install via Winget
```powershell
winget install --id Git.Git -e --source winget
```

## Step 2: Configure Git (First Time Setup)

Open Command Prompt or PowerShell and run:

```bash
git config --global user.name "darksodere"
git config --global user.email "your-email@example.com"
```

## Step 3: Create GitHub Repository

1. Go to https://github.com
2. Sign in to your account (username: darksodere)
3. Click the "+" icon in the top right corner
4. Select "New repository"
5. Set repository name: **admin**
6. Set description: "Otaku Ghor - Anime Store Application"
7. Make it **Public** (or Private if you prefer)
8. **DO NOT** initialize with README, .gitignore, or license (we already have these)
9. Click "Create repository"

## Step 4: Push Your Project to GitHub

After installing Git, run these commands in your project directory:

```bash
# Navigate to your project directory
cd "c:\Users\W.C\Documents\otakughor"

# Initialize Git repository
git init

# Add all files to staging
git add .

# Create initial commit
git commit -m "Initial commit: Otaku Ghor anime store with dynamic notifications"

# Add GitHub remote repository
git remote add origin https://github.com/darksodere/admin.git

# Set main branch
git branch -M main

# Push to GitHub
git push -u origin main
```

## Step 5: Verify Upload

1. Go to https://github.com/darksodere/admin
2. You should see all your project files
3. Check that the README.md displays properly

## Alternative: GitHub Desktop (Easier Option)

If you prefer a GUI:

1. Download GitHub Desktop: https://desktop.github.com/
2. Install and sign in with your GitHub account
3. Click "Add an Existing Repository from your Hard Drive"
4. Select your project folder: `c:\Users\W.C\Documents\otakughor`
5. Publish to GitHub with repository name "admin"

## Step 6: Deploy to Render

Once your code is on GitHub:

1. Go to https://render.com
2. Sign up/Sign in
3. Click "New +" → "Web Service"
4. Connect your GitHub account
5. Select the "admin" repository
6. Use these settings:
   ```
   Name: otaku-ghor
   Environment: Node
   Build Command: npm run build
   Start Command: npm start
   ```
7. Add environment variables:
   ```
   NODE_ENV=production
   JWT_SECRET=otaku-ghor-super-secret-jwt-key-2024
   JWT_REFRESH_SECRET=otaku-ghor-refresh-secret-2024
   DATABASE_TYPE=json
   CLOUD_NAME=dighwjhdz
   CLOUD_API_KEY=817644997542614
   CLOUD_API_SECRET=Hf8EhIXPRtrehiJXoNOmyH0EX3I
   ```
8. Click "Create Web Service"

## 🎉 Success!

Your Otaku Ghor anime store will be live at:
`https://otaku-ghor.onrender.com` (or similar URL)

## 📝 Quick Commands Reference

```bash
# Check Git status
git status

# Add files
git add .

# Commit changes
git commit -m "Your commit message"

# Push changes
git push

# Pull latest changes
git pull

# Check remote repositories
git remote -v
```

## 🔧 Troubleshooting

### If Git commands don't work:
1. Restart your terminal after installing Git
2. Make sure Git is in your PATH
3. Try using Git Bash instead of Command Prompt

### If push fails:
1. Make sure you created the repository on GitHub first
2. Check your internet connection
3. Verify the repository URL is correct
4. You might need to authenticate with GitHub

### Authentication:
- GitHub may ask for your username and password
- For better security, use a Personal Access Token instead of password
- Go to GitHub Settings → Developer settings → Personal access tokens

## 🌟 Your Project Features

Once deployed, your anime store will have:
- ✅ Beautiful anime-themed UI
- ✅ Dynamic notification system (no more static "3"!)
- ✅ Product management
- ✅ Admin dashboard
- ✅ Shopping cart
- ✅ Responsive design
- ✅ JSON database (no MongoDB needed)
- ✅ Real-time updates

Happy coding! 🌸✨