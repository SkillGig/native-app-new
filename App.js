import React, {useEffect} from 'react';
import {Text, TextInput, PixelRatio, Dimensions} from 'react-native';
import {FONT_FAMILY} from './styles/FontStyles';

// Enhanced font scaling override with Lato font family
const originalTextRender = Text.render;
const originalTextInputRender = TextInput.render;

Text.render = function (...args) {
  const origin = originalTextRender.call(this, ...args);
  return React.cloneElement(origin, {
    allowFontScaling: false,
    maxFontSizeMultiplier: 1,
    style: [{fontFamily: FONT_FAMILY.regular}, origin.props.style],
    ...origin.props,
  });
};

TextInput.render = function (...args) {
  const origin = originalTextInputRender.call(this, ...args);
  return React.cloneElement(origin, {
    allowFontScaling: false,
    maxFontSizeMultiplier: 1,
    style: [{fontFamily: FONT_FAMILY.regular}, origin.props.style],
    ...origin.props,
  });
};

Text.defaultProps = {
  ...(Text.defaultProps || {}),
  allowFontScaling: false,
  maxFontSizeMultiplier: 1,
  style: {fontFamily: FONT_FAMILY.regular},
};

TextInput.defaultProps = {
  ...(TextInput.defaultProps || {}),
  allowFontScaling: false,
  maxFontSizeMultiplier: 1,
  style: {fontFamily: FONT_FAMILY.regular},
};

// Debug font scaling
console.log('Font Scale:', PixelRatio.getFontScale());
console.log('Screen Scale:', PixelRatio.get());
console.log('Dimensions:', Dimensions.get('window'));
Dimensions.addEventListener('change', ({window, screen}) => {
  console.log('Dimensions changed:', {
    fontScale: PixelRatio.getFontScale(),
    window,
    screen,
  });
});
import Navigation from './Navigation';
import {ThemeProvider} from './src/context/ThemeContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import useUserStore from './src/store/useUserStore';
import Snackbar from './components/Snackbar';
import {
  registerForegroundNotificationHandler,
  registerBackgroundNotificationHandler,
  registerNotificationOpenedHandler,
  checkInitialNotification,
  createAndroidNotificationChannel,
} from './src/api/notificationHandler';

const App = () => {
  // Register FCM notification handlers (must be outside conditional)
  useEffect(() => {
    createAndroidNotificationChannel();
    registerForegroundNotificationHandler();
    registerBackgroundNotificationHandler();
    registerNotificationOpenedHandler(remoteMessage => {
      // Handle navigation or logic when notification is tapped (background)
      console.log('Notification opened from background:', remoteMessage);
    });
    checkInitialNotification(remoteMessage => {
      // Handle navigation or logic when notification is tapped (killed)
      console.log('Notification opened from quit state:', remoteMessage);
    });
  }, []);

  // Wait for zustand persist hydration
  const hasHydrated = useUserStore.persist?.hasHydrated?.();
  console.log(
    'hasHydrated:',
    hasHydrated,
    'userStore:',
    useUserStore.getState(),
  );
  if (!hasHydrated) {
    return null; // or show a splash/loading
  }

  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <ThemeProvider>
        <BottomSheetModalProvider>
          <Navigation />
          <Snackbar />
        </BottomSheetModalProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
};

export default App;
