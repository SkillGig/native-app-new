import React, {useRef, useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Easing,
  TouchableOpacity,
} from 'react-native';
import Svg, {Line, G, Circle} from 'react-native-svg';
import images from '../assets/images';

// import {Ionicons} from '@expo/vector-icons;
// import images from '../assets/images';

const RADIUS = 130;
const STROKE_WIDTH = 12;
const CIRCUMFERENCE = radius => 2 * Math.PI * radius;

// Move Dot outside MeditationTimer and pass data as props
const Dot = ({rotateTransform, radius, strokeWidth}) => {
  const dotRadius = 12;
  const borderWidth = 6;
  return (
    <Animated.View
      style={{
        position: 'absolute',
        top: radius + strokeWidth,
        left: radius + strokeWidth,
        transform: [{ rotate: rotateTransform }],
      }}
    >
      <View
        style={{
          width: dotRadius * 2,
          height: dotRadius * 2,
          backgroundColor: '#fff',
          borderRadius: dotRadius,
          borderWidth: borderWidth,
          borderColor: '#BFA3F6',
          position: 'absolute',
          top: -radius - dotRadius,
          left: -dotRadius,
          shadowColor: '#BFA3F6',
          shadowOpacity: 0.25,
          shadowRadius: 8,
          elevation: 8,
        }}
      />
    </Animated.View>
  );
};

const MeditationTimer = ({
  duration = 1380, // 23:00 default
  type = 'Focus',
  isPlaying = false,
  onSettingsPress,
}) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const animationRef = useRef(null);
  const [remaining, setRemaining] = useState(duration);
  const [isRunning, setIsRunning] = useState(isPlaying);
  const [hasStarted, setHasStarted] = useState(false);
  const intervalRef = useRef(null);
  const progressRef = useRef(0);
  const dynamicStroke = hasStarted ? STROKE_WIDTH : STROKE_WIDTH / 2;

  useEffect(() => {
    if (isRunning) {
      if (!hasStarted) {
        setHasStarted(true);
        animatedValue.setValue(progressRef.current / duration); // Reset to current progress
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.08,
            duration: 180,
            useNativeDriver: true,
          }),
          Animated.spring(scaleAnim, {
            toValue: 1,
            friction: 4,
            useNativeDriver: true,
          }),
        ]).start(() => {
          animationRef.current = Animated.timing(animatedValue, {
            toValue: 1,
            duration: (duration - progressRef.current) * 1000,
            easing: Easing.linear,
            useNativeDriver: false,
          });
          animationRef.current.start();
        });
      } else {
        animationRef.current = Animated.timing(animatedValue, {
          toValue: 1,
          duration: (duration - progressRef.current) * 1000,
          easing: Easing.linear,
          useNativeDriver: false,
        });
        animationRef.current.start();
      }
      intervalRef.current = setInterval(() => {
        setRemaining(prev => {
          if (prev <= 1) {
            clearInterval(intervalRef.current);
            // Bounce when timer completes
            Animated.sequence([
              Animated.timing(scaleAnim, {
                toValue: 1.08,
                duration: 180,
                useNativeDriver: true,
              }),
              Animated.spring(scaleAnim, {
                toValue: 1,
                friction: 4,
                useNativeDriver: true,
              }),
            ]).start();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (animationRef.current) { animationRef.current.stop(); }
      clearInterval(intervalRef.current);
    }
    return () => {
      clearInterval(intervalRef.current);
      if (animationRef.current) { animationRef.current.stop(); }
    };
  }, [isRunning, duration, hasStarted, scaleAnim, animatedValue]);

  useEffect(() => {
    if (!isRunning && remaining === 0) {
      setHasStarted(false);
      animatedValue.setValue(0);
      progressRef.current = 0;
      setRemaining(duration);
    }
    // If timer is reset (duration changes), reset animatedValue
    if (remaining === duration) {
      animatedValue.setValue(0);
      progressRef.current = 0;
    }
  }, [isRunning, remaining, duration, animatedValue]);

  // Fix: Only addListener once
  useEffect(() => {
    const listener = animatedValue.addListener(({ value }) => {
      progressRef.current = value * duration;
    });
    return () => {
      animatedValue.removeListener(listener);
    };
  }, [animatedValue, duration]);

  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [CIRCUMFERENCE(RADIUS), 0],
    extrapolate: 'clamp',
  });

  const rotateTransform = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const AnimatedCircle = Animated.createAnimatedComponent(Circle);
  const AnimatedView = Animated.View;

  const formatTime = sec => {
    const m = Math.floor(sec / 60)
      .toString()
      .padStart(2, '0');
    const s = (sec % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const markerLines = [];
  for (let i = 0; i < 60; i++) {
    const theta = (2 * Math.PI * i) / 60;
    const isMajor = i % 5 === 0;
    const lineLength = isMajor ? 10 : 5;
    const distance = RADIUS - STROKE_WIDTH / 2 - lineLength - 5;
    const x1 = RADIUS + STROKE_WIDTH + distance * Math.cos(theta - Math.PI / 2);
    const y1 = RADIUS + STROKE_WIDTH + distance * Math.sin(theta - Math.PI / 2);
    const x2 =
      RADIUS +
      STROKE_WIDTH +
      (distance + lineLength) * Math.cos(theta - Math.PI / 2);
    const y2 =
      RADIUS +
      STROKE_WIDTH +
      (distance + lineLength) * Math.sin(theta - Math.PI / 2);
    markerLines.push(
      <Line
        key={i}
        x1={x1}
        y1={y1}
        x2={x2}
        y2={y2}
        stroke="#fff"
        strokeWidth={2}
        opacity={isMajor ? 0.18 : 0.09}
      />,
    );
  }

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, width: '100%', alignItems: 'center', justifyContent: 'center' }}>
        <Animated.View style={{ transform: [{ scale: scaleAnim }], marginTop: 24 }}>
          <Svg
            height={2 * (RADIUS + STROKE_WIDTH)}
            width={2 * (RADIUS + STROKE_WIDTH)}
            style={{ alignSelf: 'center' }}
          >
            <G
              rotation="-90"
              originX={RADIUS + STROKE_WIDTH}
              originY={RADIUS + STROKE_WIDTH}
            >
              <Circle
                stroke="#fff"
                cx={RADIUS + STROKE_WIDTH}
                cy={RADIUS + STROKE_WIDTH}
                r={RADIUS}
                strokeWidth={dynamicStroke}
                fill="none"
                opacity={0.13}
              />
              <AnimatedCircle
                stroke="#BFA3F6"
                cx={RADIUS + STROKE_WIDTH}
                cy={RADIUS + STROKE_WIDTH}
                r={RADIUS}
                strokeWidth={dynamicStroke}
                strokeDasharray={`${CIRCUMFERENCE(RADIUS)}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                fill="none"
                opacity={1}
              />
              {markerLines}
            </G>
          </Svg>
          {isRunning && (
            <Dot rotateTransform={rotateTransform} radius={RADIUS} strokeWidth={STROKE_WIDTH} />
          )}
          <View style={styles.centerContent}>
            <View style={styles.timerIconWrap}>
              <Animated.Image
                source={images.LAPTOP}
                style={{
                  width: 44,
                  height: 44,
                  opacity: 1,
                  alignSelf: 'center',
                  marginBottom: 8,
                }}
                resizeMode="contain"
              />
            </View>
            <Text style={styles.time}>{formatTime(remaining)}</Text>
            <Text style={styles.label}>{type}</Text>
          </View>
        </Animated.View>
      </View>
      <View style={styles.controlsRow}>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setIsRunning(false)}
        >
          {/* <Ionicons name="play-back" size={24} color="#BFA3F6" /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.controlBtn, isRunning ? styles.pauseBtn : styles.playBtn]}
          onPress={() => setIsRunning((prev) => !prev)}
        >
          {/* <Ionicons name={isRunning ? 'pause' : 'play'} size={28} color={isRunning ? '#BFA3F6' : '#fff'} /> */}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.controlBtn}
          onPress={() => setIsRunning(false)}
        >
          {/* <Ionicons name="play-forward" size={24} color="#BFA3F6" /> */}
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        style={styles.settingsBtn}
        onPress={onSettingsPress}
      >
        {/* <Ionicons name="settings" size={20} color="#BFA3F6" style={{marginRight: 8}} /> */}
        <Text style={styles.settingsText}>Settings</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  timeRemaining: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: RADIUS - 40,
    left: RADIUS - 40,
  },
  timeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  settingsButton: {
    marginTop: 20,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#007bff',
  },
  settingsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
  controlsRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 16,
  },
  controlBtn: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#BFA3F6',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  pauseBtn: {
    backgroundColor: '#FF6B6B',
  },
  playBtn: {
    backgroundColor: '#4CAF50',
  },
  settingsBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 16,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    backgroundColor: '#007bff',
  },
  timerIconWrap: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
    shadowColor: '#BFA3F6',
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 8,
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  time: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#333',
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
});

export default MeditationTimer;
