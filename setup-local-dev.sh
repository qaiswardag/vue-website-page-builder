#!/bin/bash

# Vue Website Page Builder - Local Development Setup Script

echo "🚀 Setting up Vue Website Page Builder for local development..."

# Build the library
echo "📦 Building the library..."
npm run build:lib

if [ $? -ne 0 ]; then
    echo "❌ Build failed. Please check the errors above."
    exit 1
fi

# Create npm link
echo "🔗 Creating npm link..."
npm link

if [ $? -ne 0 ]; then
    echo "❌ npm link failed. Please check the errors above."
    exit 1
fi

echo "✅ Setup complete!"
echo ""
echo "📋 Next steps:"
echo "1. Navigate to your Laravel project's resources/js directory"
echo "2. Run: npm link vue-website-page-builder"
echo "3. Add to your Laravel package.json dependencies:"
echo '   "vue-website-page-builder": "file:../../../vue-website-page-builder"'
echo "4. Run: npm install"
echo ""
echo "🔄 Development workflow:"
echo "- Make changes to the Vue page builder"
echo "- Run: npm run build:lib"
echo "- Restart your Laravel dev server"
echo ""
echo "📖 For detailed instructions, see LOCAL_DEVELOPMENT.md" 