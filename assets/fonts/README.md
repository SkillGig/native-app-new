# Lato Font Setup

To complete the Lato font setup, please download the Lato font files from Google Fonts:

1. Go to: https://fonts.google.com/specimen/Lato
2. Download the font family
3. Extract and copy the following .ttf files to this directory:

- Lato-Thin.ttf (100)
- Lato-ThinItalic.ttf (100 italic)
- Lato-Light.ttf (300)
- Lato-LightItalic.ttf (300 italic)
- Lato-Regular.ttf (400)
- Lato-Italic.ttf (400 italic)
- Lato-Medium.ttf (500)
- Lato-MediumItalic.ttf (500 italic)
- Lato-SemiBold.ttf (600)
- Lato-SemiBoldItalic.ttf (600 italic)
- Lato-Bold.ttf (700)
- Lato-BoldItalic.ttf (700 italic)
- Lato-ExtraBold.ttf (800)
- Lato-ExtraBoldItalic.ttf (800 italic)
- Lato-Black.ttf (900)
- Lato-BlackItalic.ttf (900 italic)

After adding the font files, run:

```bash
npx react-native-asset
```

Or for newer versions:

```bash
npx react-native link
```

Then clean and rebuild your app:

```bash
cd android && ./gradlew clean && cd ..
yarn android
```
