@echo off
echo 🚀 Otaku Ghor - GitHub Setup Script (Repository: Admin)
echo =====================================================
echo.

REM Check if Git is installed
git --version >nul 2>&1
if %errorlevel% neq 0 (
    echo ❌ Git is not installed or not in PATH
    echo Please install Git first:
    echo 1. Go to https://git-scm.com/download/win
    echo 2. Download and install Git for Windows
    echo 3. Restart your terminal and run this script again
    pause
    exit /b 1
)

echo ✅ Git is installed
echo.

REM Initialize Git repository
echo 📁 Initializing Git repository...
git init

REM Add all files
echo 📦 Adding all files to Git...
git add .

REM Create initial commit
echo 💾 Creating initial commit...
git commit -m "Initial commit: Otaku Ghor anime store with dynamic notifications and admin panel"

REM Add remote repository (Repository name: Admin)
echo 🔗 Adding GitHub remote repository (Admin)...
git remote add origin https://github.com/darksodere/Admin.git

REM Set main branch
echo 🌿 Setting main branch...
git branch -M main

REM Push to GitHub
echo 🚀 Pushing to GitHub...
git push -u origin main

if %errorlevel% equ 0 (
    echo.
    echo ✅ SUCCESS! Your project has been pushed to GitHub!
    echo 🌐 Repository URL: https://github.com/darksodere/Admin
    echo.
    echo 📊 Admin Panel Access:
    echo Username: 01944281278
    echo Password: fahim007
    echo Admin URL: http://localhost:3000/admin/login
    echo.
    echo Next steps for Render deployment:
    echo 1. Go to https://render.com
    echo 2. Create a new Web Service
    echo 3. Connect your GitHub repository: darksodere/Admin
    echo 4. Use build command: npm run build
    echo 5. Use start command: npm start
    echo 6. Add the required environment variables
    echo.
    echo 📖 See DEPLOYMENT_GUIDE.md for detailed deployment instructions
) else (
    echo.
    echo ❌ Push failed. This might be because:
    echo 1. The repository doesn't exist on GitHub yet
    echo 2. You need to authenticate with GitHub
    echo 3. You need to create the repository first
    echo.
    echo Please:
    echo 1. Go to https://github.com/darksodere
    echo 2. Create a new repository named "Admin"
    echo 3. Run this script again
)

echo.
pause