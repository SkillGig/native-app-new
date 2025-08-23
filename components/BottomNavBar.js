import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Animated,
} from 'react-native';
import images from '../assets/images';
import { normalizeHeight } from './Responsivescreen';

const BottomNavBar = ({ focused, img, focusedImg, pagename }) => {
  // animated values
  // const opacity = useRef(new Animated.Value(focused ? 1 : 0.5)).current;
  const labelY = useRef(new Animated.Value(focused ? 24 : 8)).current;
  const glowY = useRef(new Animated.Value(focused ? 0 : 16)).current;
  const iconWH = useRef(new Animated.Value(focused ? 32 : 20)).current;

  useEffect(() => {
    Animated.parallel([
      // Animated.timing(opacity, {
      //   toValue: focused ? 1 : 0.5,
      //   duration: 220,
      //   useNativeDriver: true,
      // }),
      Animated.timing(labelY, {
        toValue: focused ? 24 : 8,
        duration: focused ? 700 : 220,
        useNativeDriver: true,
      }),
      Animated.timing(glowY, {
        toValue: focused ? 0 : 0,
        duration: focused ? 700 : 220,
        useNativeDriver: true,
      }),
      Animated.timing(iconWH, {
        toValue: focused ? 32 : 24,
        duration: 220,
        useNativeDriver: false,
      }),
    ]).start();
  }, [focused]);

  return (
    <View style={styles.container}>
      <View style={{}}> 
      <Animated.View style={[styles.iconCircle,]}>
        <Animated.Image
          source={focused ? focusedImg : img}
          style={[styles.icon, { width: iconWH, height: iconWH }]}
          resizeMode="contain"
        />
      </Animated.View>
     {!focused &&pagename && <Animated.View style={{ transform: [{ translateY: labelY }] }}>
        <Text style={[styles.label, focused && styles.activeLabel]}>
          {pagename}
        </Text>
      </Animated.View>}
      <View style={{}}>
      {focused && (
        <Animated.View
          style={{
            position: 'absolute',
            bottom: 0,
            alignItems: 'center',
            transform: [{ translateY: glowY }],
          }}>
          <Image source={images.NAVITEMGLOW} style={styles.glowDot} />

        </Animated.View>
      )}
      </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    height: normalizeHeight(64),
    position:"absolute",
    left:20,
  },
  iconCircle: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    // tintColor: '#BFA3F6',
    marginBottom:normalizeHeight(6),
    resizeMode:"contain"
  },
  label: {
    fontSize: 10,
    color: '#BFA3F6',
    fontWeight: '500',
    marginTop: -8,
    letterSpacing: 0.1,
    textAlign: 'center',
  },
  activeLabel: {
    color: '#fff',
    fontWeight: '600',
  },
  glowDot: {
    width: 24,
    height: 12,
    position: 'absolute',
    justifyContent:"center",
    left:4,
    bottom:-14
    // resizeMode:"contain"
  },
});

export default BottomNavBar;
