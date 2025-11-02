#!/bin/bash

echo "🚀 Pushing changes to GitHub..."

# Clean up any Git lock files
rm -f .git/index.lock 2>/dev/null

# Add any new changes
git add .

# Check if there are changes to commit
if git diff --staged --quiet; then
    echo "📝 No new changes to commit"
else
    echo "📝 Committing new changes..."
    git commit -m "Update portfolio: $(date '+%Y-%m-%d %H:%M')"
fi

# Push to GitHub
echo "⬆️  Pushing to GitHub repository..."
git push origin branch

echo "✅ Successfully pushed to GitHub!"
echo "🔗 View at: https://github.com/ASC41/VisualPortfolio"