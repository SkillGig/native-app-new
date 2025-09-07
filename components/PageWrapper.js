import React from 'react';
import {View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

/**
 * Page-level wrapper that provides gradient background + safe area handling
 * This creates seamless blending between safe areas and content
 */
const PageWrapper = ({
  children,
  gradientColors = ['#300B73', '#090215'],
  gradientLocations = [0, 0.4],
  gradientStart = {x: 0, y: 0},
  gradientEnd = {x: 1, y: 1},
  style,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <View style={[{flex: 1}, style]}>
      {/* Full-screen gradient background */}
      <LinearGradient
        colors={gradientColors}
        locations={gradientLocations}
        start={gradientStart}
        end={gradientEnd}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
        }}
      />

      {/* Content with safe area spacing */}
      <View
        style={{
          flex: 1,
          paddingTop: insets.top,
          paddingBottom: insets.bottom,
        }}>
        {children}
      </View>
    </View>
  );
};

export default PageWrapper;
