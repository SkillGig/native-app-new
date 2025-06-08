import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Dimensions,
  Image,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import useSnackbarStore from '../src/store/useSnackbarStore';
import images from '../assets/images';

const {width: screenWidth} = Dimensions.get('window');

const SNACKBAR_GRADIENTS = {
  success: ['#F8F3FE', '#54DDAF'], // Background-Light-Normal to Success-Light
  info: ['#F8F3FE', '#FBDD8E'], // Background-Light-Normal to Alert-Light (warning)
  error: ['#F8F3FE', '#FF9A94'], // Background-Light-Normal to Error-Light
};

const SNACKBAR_ICONS = {
  info: (
    <Image
      source={images.SNACKBARINFO}
      style={{width: 20, height: 20, marginRight: 8}}
      resizeMode="contain"
    />
  ),
  success: (
    <Image
      source={images.SNACKBARSUCCESS}
      style={{width: 20, height: 20, marginRight: 8}}
      resizeMode="contain"
    />
  ),
  error: (
    <Image
      source={images.SNACKBARERROR}
      style={{width: 20, height: 20, marginRight: 8}}
      resizeMode="contain"
    />
  ),
};

const Snackbar = () => {
  const {message, type, isVisible, hideSnackbar} = useSnackbarStore();
  const translateY = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    if (isVisible) {
      Animated.spring(translateY, {
        toValue: 0,
        useNativeDriver: true,
      }).start();
      const timer = setTimeout(() => {
        hideSnackbar();
      }, 5000);
      return () => clearTimeout(timer);
    } else {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  }, [isVisible, hideSnackbar, translateY]);

  if (!isVisible) return null;

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY}]}]}
      pointerEvents="box-none">
      <LinearGradient
        colors={SNACKBAR_GRADIENTS[type] || SNACKBAR_GRADIENTS.info}
        start={{x: 0, y: 0}}
        end={{x: 1, y: 1}}
        style={StyleSheet.flatten([
          styles.snackbar,
          type === 'success' && styles.successSnackbar,
          type === 'info' && styles.infoSnackbar,
          type === 'error' && styles.errorSnackbar,
        ])}>
        {SNACKBAR_ICONS[type]}
        <Text style={styles.text} numberOfLines={2} ellipsizeMode="tail">
          {message}
        </Text>
        <TouchableOpacity
          onPress={hideSnackbar}
          style={styles.closeBtn}
          hitSlop={{top: 10, bottom: 10, left: 10, right: 10}}>
          <Text style={{color: '#090215', fontSize: 18, fontWeight: 'bold'}}>
            ×
          </Text>
        </TouchableOpacity>
      </LinearGradient>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 48,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 9999,
    elevation: 20,
    pointerEvents: 'box-none',
  },
  snackbar: {
    flexDirection: 'row',
    alignItems: 'center',
    minHeight: 44,
    maxWidth: screenWidth - 32,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 12,
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: 'transparent',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
  },
  successSnackbar: {
    borderColor: '#00A430', // Success-Normal
    shadowColor: 'rgba(0,161,65,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 12,
  },
  infoSnackbar: {
    borderColor: '#E6AA00', // Alert-Normal
    shadowColor: 'rgba(221,172,0,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 12,
  },
  errorSnackbar: {
    borderColor: '#F10026', // Error-Normal
    shadowColor: 'rgba(221,38,50,0.5)',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 12,
  },
  text: {
    flex: 1,
    color: '#222',
    fontSize: 15,
    fontWeight: '500',
    marginRight: 8,
  },
  closeBtn: {
    marginLeft: 8,
    padding: 2,
  },
});

export default Snackbar;
