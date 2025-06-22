# Otaku Ghor - GitHub Setup Script (PowerShell)
Write-Host "🚀 Otaku Ghor - GitHub Setup Script" -ForegroundColor Cyan
Write-Host "===================================" -ForegroundColor Cyan
Write-Host ""

# Check if Git is installed
try {
    $gitVersion = git --version 2>$null
    Write-Host "✅ Git is installed: $gitVersion" -ForegroundColor Green
} catch {
    Write-Host "❌ Git is not installed or not in PATH" -ForegroundColor Red
    Write-Host "Please install Git first:" -ForegroundColor Yellow
    Write-Host "1. Go to https://git-scm.com/download/win" -ForegroundColor Yellow
    Write-Host "2. Download and install Git for Windows" -ForegroundColor Yellow
    Write-Host "3. Restart your terminal and run this script again" -ForegroundColor Yellow
    Read-Host "Press Enter to exit"
    exit 1
}

Write-Host ""

try {
    # Initialize Git repository
    Write-Host "📁 Initializing Git repository..." -ForegroundColor Blue
    git init
    
    # Add all files
    Write-Host "📦 Adding all files to Git..." -ForegroundColor Blue
    git add .
    
    # Create initial commit
    Write-Host "💾 Creating initial commit..." -ForegroundColor Blue
    git commit -m "Initial commit: Otaku Ghor anime store with dynamic notifications"
    
    # Add remote repository
    Write-Host "🔗 Adding GitHub remote repository..." -ForegroundColor Blue
    git remote add origin https://github.com/darksodere/admin.git
    
    # Set main branch
    Write-Host "🌿 Setting main branch..." -ForegroundColor Blue
    git branch -M main
    
    # Push to GitHub
    Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Blue
    git push -u origin main
    
    Write-Host ""
    Write-Host "✅ SUCCESS! Your project has been pushed to GitHub!" -ForegroundColor Green
    Write-Host "🌐 Repository URL: https://github.com/darksodere/admin" -ForegroundColor Cyan
    Write-Host ""
    Write-Host "Next steps:" -ForegroundColor Yellow
    Write-Host "1. Go to https://render.com" -ForegroundColor White
    Write-Host "2. Create a new Web Service" -ForegroundColor White
    Write-Host "3. Connect your GitHub repository" -ForegroundColor White
    Write-Host "4. Use build command: npm run build" -ForegroundColor White
    Write-Host "5. Use start command: npm start" -ForegroundColor White
    Write-Host "6. Add the required environment variables" -ForegroundColor White
    Write-Host ""
    Write-Host "📖 See DEPLOYMENT_GUIDE.md for detailed deployment instructions" -ForegroundColor Cyan
    
} catch {
    Write-Host ""
    Write-Host "❌ Push failed. This might be because:" -ForegroundColor Red
    Write-Host "1. The repository doesn't exist on GitHub yet" -ForegroundColor Yellow
    Write-Host "2. You need to authenticate with GitHub" -ForegroundColor Yellow
    Write-Host "3. You need to create the repository first" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "Please:" -ForegroundColor Yellow
    Write-Host "1. Go to https://github.com/darksodere" -ForegroundColor White
    Write-Host "2. Create a new repository named 'admin'" -ForegroundColor White
    Write-Host "3. Run this script again" -ForegroundColor White
    Write-Host ""
    Write-Host "Error details: $($_.Exception.Message)" -ForegroundColor Red
}

Write-Host ""
Read-Host "Press Enter to exit"