# 🔤 Lato Font Configuration Guide

This guide explains how to set up and use Lato fonts throughout your React Native application.

## 📦 Font Files Setup

### Step 1: Download Lato Fonts

1. Visit [Google Fonts - Lato](https://fonts.google.com/specimen/Lato)
2. Click "Download family"
3. Extract the ZIP file

### Step 2: Add Font Files

Copy the following `.ttf` files to `assets/fonts/`:

```
assets/fonts/
├── Lato-Thin.ttf (100)
├── Lato-ThinItalic.ttf (100 italic)
├── Lato-Light.ttf (300)
├── Lato-LightItalic.ttf (300 italic)
├── Lato-Regular.ttf (400)
├── Lato-Italic.ttf (400 italic)
├── Lato-Medium.ttf (500)
├── Lato-MediumItalic.ttf (500 italic)
├── Lato-SemiBold.ttf (600)
├── Lato-SemiBoldItalic.ttf (600 italic)
├── Lato-Bold.ttf (700)
├── Lato-BoldItalic.ttf (700 italic)
├── Lato-ExtraBold.ttf (800)
├── Lato-ExtraBoldItalic.ttf (800 italic)
├── Lato-Black.ttf (900)
└── Lato-BlackItalic.ttf (900 italic)
```

### Step 3: Link Fonts

Run one of these commands:

```bash
# Preferred method
npx react-native-asset

# Alternative method
npx react-native link
```

### Step 4: Clean and Rebuild

```bash
# Clean build
cd android && ./gradlew clean && cd ..

# Rebuild app
yarn android
```

## 🛠️ Configuration Files

The following files have been configured for Lato fonts:

### `react-native.config.js`

```javascript
module.exports = {
  assets: ['./assets/fonts/'],
  // ... other config
};
```

### `styles/FontStyles.js`

- Updated with Lato font family mappings
- Font weight to font family helper functions
- Consistent font styling across the app

### `App.js`

- Global font configuration
- Default Lato font applied to all Text and TextInput components
- Font scaling disabled for consistent UI

### `src/utils/fontUtils.js`

- Utility functions for font handling
- Pre-configured Lato styles
- Helper functions for custom font styles

## 📝 Usage Examples

### Using Pre-defined Styles

```jsx
import React from 'react';
import {Text} from 'react-native';
import {LatoStyles} from '../src/utils/fontUtils';

const MyComponent = () => (
  <View>
    <Text style={LatoStyles.bold}>Bold Text</Text>
    <Text style={LatoStyles.regular}>Regular Text</Text>
    <Text style={LatoStyles.light}>Light Text</Text>
    <Text style={LatoStyles.italic}>Italic Text</Text>
  </View>
);
```

### Using Custom Styles

```jsx
import React from 'react';
import {Text} from 'react-native';
import {createLatoStyle} from '../src/utils/fontUtils';

const MyComponent = () => (
  <Text
    style={createLatoStyle({
      fontWeight: '600',
      fontSize: 18,
      color: '#333',
    })}>
    Custom Lato Text
  </Text>
);
```

### Using Font Styles Helper

```jsx
import React from 'react';
import {Text} from 'react-native';
import {getFontStyles} from '../styles/FontStyles';

const MyComponent = () => {
  const fstyles = getFontStyles();

  return <Text style={fstyles.boldSixteen}>Styled with FontStyles</Text>;
};
```

## 🎨 Available Font Weights

| Weight | Font Family    | Usage                  |
| ------ | -------------- | ---------------------- |
| 100    | Lato-Thin      | `LatoStyles.thin`      |
| 300    | Lato-Light     | `LatoStyles.light`     |
| 400    | Lato-Regular   | `LatoStyles.regular`   |
| 500    | Lato-Medium    | `LatoStyles.medium`    |
| 600    | Lato-SemiBold  | `LatoStyles.semiBold`  |
| 700    | Lato-Bold      | `LatoStyles.bold`      |
| 800    | Lato-ExtraBold | `LatoStyles.extraBold` |
| 900    | Lato-Black     | `LatoStyles.black`     |

## 🔧 Automatic Setup Script

Use the setup script for automated configuration:

```bash
chmod +x scripts/setup-lato-fonts.sh
./scripts/setup-lato-fonts.sh
```

## ✅ Verification

After setup, all text in your app will use Lato fonts by default. You can verify this by:

1. Running the app on a device/emulator
2. Checking that text renders with the Lato font family
3. Using the `LatoFontExample` component to test all font weights

## 🐛 Troubleshooting

### Fonts not showing up?

1. Ensure all font files are in `assets/fonts/`
2. Run font linking command again
3. Clean and rebuild the app
4. Check that font filenames match exactly

### Build issues?

1. Clear Metro cache: `npx react-native start --reset-cache`
2. Clean Android build: `cd android && ./gradlew clean`
3. Reinstall app completely

### Font weights not working?

1. Verify font files include all weight variations
2. Check font family names in `styles/FontStyles.js`
3. Ensure font linking was successful

## 📱 Platform Notes

### Android

- Fonts are automatically bundled with the app
- No additional configuration needed after linking

### iOS

- Fonts are added to the Xcode project
- Font names might need adjustment in iOS builds
- Check `Info.plist` for font entries after linking

## 🎯 Best Practices

1. **Consistency**: Use predefined font styles from `FontStyles.js`
2. **Performance**: Font files are bundled, no performance impact
3. **Maintenance**: Update font configurations in one place
4. **Fallbacks**: System fonts will be used if Lato fonts fail to load

---

✨ **Your app now has beautiful, consistent Lato typography throughout!**
