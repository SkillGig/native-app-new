#!/bin/bash

# Lato Font Setup Script for React Native
# This script helps set up Lato fonts in your React Native project

echo "🔤 Setting up Lato fonts for React Native..."

# Create fonts directory if it doesn't exist
if [ ! -d "assets/fonts" ]; then
    mkdir -p assets/fonts
    echo "✅ Created assets/fonts directory"
else
    echo "📁 assets/fonts directory already exists"
fi

# Check if font files exist
FONT_FILES=(
    "Lato-Thin.ttf"
    "Lato-ThinItalic.ttf"
    "Lato-Light.ttf"
    "Lato-LightItalic.ttf"
    "Lato-Regular.ttf"
    "Lato-Italic.ttf"
    "Lato-Medium.ttf"
    "Lato-MediumItalic.ttf"
    "Lato-SemiBold.ttf"
    "Lato-SemiBoldItalic.ttf"
    "Lato-Bold.ttf"
    "Lato-BoldItalic.ttf"
    "Lato-ExtraBold.ttf"
    "Lato-ExtraBoldItalic.ttf"
    "Lato-Black.ttf"
    "Lato-BlackItalic.ttf"
)

MISSING_FONTS=()
for font in "${FONT_FILES[@]}"; do
    if [ ! -f "assets/fonts/$font" ]; then
        MISSING_FONTS+=("$font")
    fi
done

if [ ${#MISSING_FONTS[@]} -gt 0 ]; then
    echo "⚠️  Missing font files:"
    for font in "${MISSING_FONTS[@]}"; do
        echo "   - $font"
    done
    echo ""
    echo "📥 Please download Lato fonts from:"
    echo "   https://fonts.google.com/specimen/Lato"
    echo ""
    echo "📂 Place the .ttf files in the assets/fonts/ directory"
    echo ""
    echo "🔄 After adding fonts, run:"
    echo "   npx react-native-asset"
    echo "   or"
    echo "   npx react-native link"
    echo ""
    echo "🧹 Then clean and rebuild:"
    echo "   cd android && ./gradlew clean && cd .."
    echo "   yarn android"
    exit 1
else
    echo "✅ All Lato font files are present!"
fi

# Link fonts
echo "🔗 Linking fonts..."
if command -v npx >/dev/null 2>&1; then
    if npx react-native-asset; then
        echo "✅ Fonts linked successfully with react-native-asset"
    elif npx react-native link; then
        echo "✅ Fonts linked successfully with react-native link"
    else
        echo "⚠️  Font linking failed. You may need to link manually."
    fi
else
    echo "⚠️  npx not found. Please install Node.js and npm."
fi

echo ""
echo "🎉 Lato font setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Clean and rebuild your app:"
echo "      cd android && ./gradlew clean && cd .."
echo "      yarn android"
echo ""
echo "   2. Import and use fonts in your components:"
echo "      import {LatoStyles, createLatoStyle} from './src/utils/fontUtils';"
echo ""
echo "   3. Apply Lato styles to your text components:"
echo "      <Text style={LatoStyles.bold}>Bold Text</Text>"
echo ""
echo "✨ Happy coding with Lato fonts!"
