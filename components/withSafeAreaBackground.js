import React from 'react';
import {View, StatusBar} from 'react-native';
import {SafeAreaProvider} from 'react-native-safe-area-context';

const APP_BACKGROUND_COLOR = '#300B73';

/**
 * Inner component that handles basic safe area setup
 */
const SafeAreaBackground = ({children}) => {
  return (
    <>
      {/* Status bar configuration */}
      <StatusBar
        barStyle="light-content"
        backgroundColor={APP_BACKGROUND_COLOR}
        translucent={true}
      />

      {/* Basic background color for extreme edges */}
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: APP_BACKGROUND_COLOR,
        }}
      />

      {/* Content container - no padding here, let PageWrapper handle it */}
      <View style={{flex: 1}}>{children}</View>
    </>
  );
};

/**
 * Higher-Order Component that provides Instagram-like safe area background effect
 * Creates seamless full-screen experience with app background color in safe areas
 */
const withSafeAreaBackground = WrappedComponent => {
  return props => {
    return (
      <SafeAreaProvider>
        <SafeAreaBackground>
          <WrappedComponent {...props} />
        </SafeAreaBackground>
      </SafeAreaProvider>
    );
  };
};

export default withSafeAreaBackground;
