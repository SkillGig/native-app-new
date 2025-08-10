import React, {useEffect} from 'react';
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
