// components/PageLayout.js
import React, {useContext, useMemo} from 'react';
import {StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { ThemeContext } from '../../src/context/ThemeContext';

const PageLayout = ({children}) => {
  const {isDark} = useContext(ThemeContext);

  const gradientColors = useMemo(
    () => (isDark ? ['#300B73', '#090215'] : ['#381874', '#150534']),
    [isDark],
  );

  return (
    <LinearGradient
      colors={gradientColors}
      locations={[0, 0.7]}
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
