// components/PageLayout.js
import React, {useMemo} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const PageLayout = ({children}) => {
  const gradientColors = useMemo(() => ['#300B73', '#090215'], []);

  return (
    <LinearGradient
      colors={gradientColors}
      locations={[0, 0.4]}
      start={{x: 0, y: 0}}
      end={{x: 1, y: 1}}
      style={styles.page}>
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#300B73',
  },
});

export default PageLayout;
