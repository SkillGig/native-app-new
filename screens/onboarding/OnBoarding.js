import React, {useRef, useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  Animated,
  TouchableOpacity,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const {width, height} = Dimensions.get('window');

const onboardingSlides = [
  {
    title: 'Upskill and Shine',
    description: 'Level up your skills & become a future-ready Engineer!',
  },
  {
    title: 'Build Real Skills',
    description: 'Work on real-world problems with industry experts.',
  },
  {
    title: 'Get Career Ready',
    description: 'Master what matters & crack your dream job.',
  },
];

const OnboardingCarousel = () => {
  const flatListRef = useRef(null);
  const scrollX = useRef(new Animated.Value(0)).current;
  const textTranslateY = useRef(new Animated.Value(0)).current;
  const textOpacity = useRef(new Animated.Value(1)).current;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const nextIndex = (currentIndex + 1) % onboardingSlides.length;
      scrollToIndex(nextIndex);
    }, 3000);

    return () => clearInterval(interval);
  }, [currentIndex]);

  const scrollToIndex = index => {
    flatListRef.current.scrollToIndex({animated: true, index: index});
  };

  const handleScroll = event => {
    const index = Math.round(event.nativeEvent.contentOffset.x / width);
    setCurrentIndex(index);

    const offsetX = event.nativeEvent.contentOffset.x;
    const animatedIndex = offsetX / width;

    const currentTextOpacity = scrollX.interpolate({
      inputRange: [
        (currentIndex - 1) * width,
        currentIndex * width,
        (currentIndex + 0.5) * width,
      ],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const currentTextTranslateY = scrollX.interpolate({
      inputRange: [
        (currentIndex - 1) * width,
        currentIndex * width,
        (currentIndex + 1) * width,
      ],
      outputRange: [50, 0, -50],
      extrapolate: 'clamp',
    });

    const nextTextOpacity = scrollX.interpolate({
      inputRange: [
        (currentIndex - 0.5) * width,
        currentIndex * width,
        (currentIndex + 1) * width,
      ],
      outputRange: [0, 1, 0],
      extrapolate: 'clamp',
    });

    const nextTextTranslateY = scrollX.interpolate({
      inputRange: [
        (currentIndex - 1) * width,
        currentIndex * width,
        (currentIndex + 1) * width,
      ],
      outputRange: [-50, 0, 50],
      extrapolate: 'clamp',
    });

    textOpacity.setValue(currentTextOpacity.__getValue());
    textTranslateY.setValue(currentTextTranslateY.__getValue());

    setPreviousIndex(index);
  };

  const renderItem = () => {
    return <View style={styles.page} />;
  };

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {onboardingSlides.map((_, i) => {
          const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
          const dotWidth = scrollX.interpolate({
            inputRange,
            outputRange: [8, 24, 8],
            extrapolate: 'clamp',
          });
          return (
            <Animated.View
              key={i}
              style={[
                styles.dot,
                {
                  width: dotWidth,
                },
              ]}
            />
          );
        })}
      </View>
    );
  };

  return (
    <LinearGradient colors={['#F6F3FC00', '#FFFFFF']} style={styles.container}>
      <Animated.FlatList
        ref={flatListRef}
        data={onboardingSlides}
        keyExtractor={(_, index) => index.toString()}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        renderItem={renderItem}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: scrollX}}}],
          {useNativeDriver: false, listener: handleScroll},
        )}
      />

      <Animated.View
        style={[
          styles.textContainerAnimated,
          {
            opacity: textOpacity,
            transform: [{translateY: textTranslateY}],
          },
        ]}>
        <Text style={styles.title}>{onboardingSlides[currentIndex].title}</Text>
        <Text style={styles.desc}>
          {onboardingSlides[currentIndex].description}
        </Text>
      </Animated.View>

      {renderDots()}
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Continue</Text>
      </TouchableOpacity>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  page: {
    width,
  },
  textContainerAnimated: {
    position: 'absolute',
    top: height * 0.4,
    left: 0,
    right: 0,
    paddingHorizontal: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5C27C0',
    marginBottom: 10,
    textAlign: 'center',
  },
  desc: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
    marginTop: height * 0.05,
  },
  dot: {
    height: 8,
    borderRadius: 4,
    backgroundColor: '#5C27C0',
    marginHorizontal: 4,
  },
  button: {
    backgroundColor: '#5C27C0',
    paddingVertical: 14,
    marginHorizontal: 50,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 40,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
  },
});

export default OnboardingCarousel;
