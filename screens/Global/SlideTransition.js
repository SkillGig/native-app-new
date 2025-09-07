import React, {useRef, useEffect} from 'react';
import {
  Animated,
  Dimensions,
  StyleSheet,
  View,
  BackHandler,
} from 'react-native';

const {width} = Dimensions.get('window');

const SlideTransition = ({visible, onClose, children, style}) => {
  const translateX = useRef(new Animated.Value(width)).current;
  const isMounted = useRef(false);

  useEffect(() => {
    if (visible) {
      Animated.timing(translateX, {
        toValue: 0,
        duration: 320,
        useNativeDriver: true,
      }).start();
    } else if (isMounted.current) {
      Animated.timing(translateX, {
        toValue: width,
        duration: 320,
        useNativeDriver: true,
      }).start(({finished}) => {
        if (finished && onClose) {
          onClose();
        }
      });
    }
    isMounted.current = true;
  }, [visible, translateX, onClose]);

  // Handle hardware back button
  useEffect(() => {
    const backAction = () => {
      if (visible && onClose) {
        onClose();
        return true; // Prevent default back button behavior
      }
      return false; // Allow default back button behavior
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction,
    );

    return () => backHandler.remove();
  }, [visible, onClose]);

  return (
    <Animated.View
      style={[
        styles.container,
        style,
        {transform: [{translateX}]},
        {position: 'absolute', top: 0, left: 0, width: '100%', height: '100%'},
        {zIndex: 100},
      ]}
      pointerEvents={visible ? 'auto' : 'none'}>
      <View style={{flex: 1}}>{children}</View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'transparent',
    flex: 1,
  },
});

export default SlideTransition;
