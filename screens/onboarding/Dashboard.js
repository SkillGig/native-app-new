import React, {useContext, useEffect, useRef} from 'react';
import {View, Switch, StyleSheet, Animated, Easing} from 'react-native';
// import { ThemeContext } from '../../context/ThemeContext';
// import { lightColors, darkColors } from '../../theme/colors';
import {ThemeContext} from '../../src/context/ThemeContext';
import {lightColors, darkColors} from '../../src/theme/color';

const Dashboard = () => {
  const {isDark, toggleTheme} = useContext(ThemeContext);

  const animation = useRef(new Animated.Value(isDark ? 1 : 0)).current;

  useEffect(() => {
    Animated.timing(animation, {
      toValue: isDark ? 1 : 0,
      duration: 400,
      useNativeDriver: false, // color interpolation needs false
      easing: Easing.inOut(Easing.ease),
    }).start();
  }, [isDark]);

  // Interpolate background and text color
  const backgroundColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [lightColors.background, darkColors.background],
  });

  const textColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [lightColors.text, darkColors.text],
  });

  const primaryColor = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [lightColors.primary, darkColors.primary],
  });

  return (
    <Animated.View style={[styles.container, {backgroundColor}]}>
      <Animated.Text style={[styles.title, {color: textColor}]}>
        Dashboard Screen
      </Animated.Text>

      <View style={styles.switchRow}>
        <Animated.Text style={{color: textColor, marginRight: 10}}>
          Dark Mode:
        </Animated.Text>
        <Switch
          value={isDark}
          onValueChange={toggleTheme}
          thumbColor={isDark ? darkColors.primary : lightColors.primary}
          trackColor={{false: '#767577', true: '#81b0ff'}}
        />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 30,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export default Dashboard;
