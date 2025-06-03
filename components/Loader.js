// components/CommonLoader.js
import React from 'react';
import {StyleSheet, View, Modal} from 'react-native';
import LottieView from 'lottie-react-native';

const Loader = ({visible = true}) => {
  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      statusBarTranslucent>
      <View style={styles.overlay}>
        <LottieView
          source={require('../assets/animations/loader.json')}
          autoPlay
          loop
          style={styles.lottie}
        />
      </View>
    </Modal>
  );
};

export default Loader;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  lottie: {
    height: 100,
    width: 100,
  },
});
