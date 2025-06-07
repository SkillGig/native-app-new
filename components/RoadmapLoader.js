import React from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../assets/images';

const RoadmapLoader = () => {
  return (
    <LinearGradient colors={['#180037', '#260964']} style={styles.gradient}>
      <View style={styles.centerGlow}>
        <View style={styles.glowContainer}>
          <Image
            source={images.ROADMAPLOADINGSTARS}
            style={styles.starsImage}
            resizeMode="contain"
          />
        </View>
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.heading}>Magic is happening</Text>
        <Text style={styles.subheading}>
          {'We are matching your responses to\nthe best roadmap for you.'}
        </Text>
      </View>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 24,
    backgroundColor: '#180037',
  },
  centerGlow: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 40,
  },
  glowContainer: {
    width: 180,
    height: 180,
    borderRadius: 90,
    backgroundColor: 'rgba(120, 80, 200, 0.18)',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#B88AF3',
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 0},
    shadowRadius: 60,
    elevation: 12,
    position: 'relative',
  },
  starsImage: {
    width: 120,
    height: 120,
    alignSelf: 'center',
  },
  textContainer: {
    marginTop: 40,
    alignItems: 'center',
  },
  heading: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    letterSpacing: 0.5,
  },
  subheading: {
    color: '#FFF',
    fontSize: 15,
    textAlign: 'center',
    opacity: 0.8,
    lineHeight: 22,
    fontWeight: '500',
    maxWidth: 260,
  },
});

export default RoadmapLoader;
