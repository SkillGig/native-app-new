import React from 'react';
import Navigation from './Navigation';
import {ThemeProvider} from './src/context/ThemeContext';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import useUserStore from './src/store/useUserStore';
import Snackbar from './components/Snackbar';

const App = () => {
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
