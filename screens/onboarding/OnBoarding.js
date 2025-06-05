import React, {useRef, useState, useEffect, useCallback} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  TouchableOpacity,
  Animated,
  SafeAreaView,
} from 'react-native';
import PageLayout from './PageLayout';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';
import useUserStore from '../../src/store/useUserStore';

const {height} = Dimensions.get('window');

const slides = [
  {
    key: '1',
    title: 'Upskill and Shine',
    subtitle: 'Level up your skills & become a future-ready engineer!',
    image: require('../../assets/images/OnOne.png'),
  },
  {
    key: '2',
    title: 'Excel your subjects !',
    subtitle: 'Learn from the best, follow a roadmap, & crush your goals',
    image: require('../../assets/images/OnTwo.png'),
  },
  {
    key: '3',
    title: 'Earn & Flex!',
    subtitle:
      'Earn badges, flex your achievements & stand out in the tech game!',
    image: require('../../assets/images/OnThree.png'),
  },
];

const FADE_DURATION = 400;
const SLIDE_DURATION = 3000; // 3 seconds per slide

// AnimatedDot component for animated width
const DOT_WIDTH = 32;
const ACTIVE_DOT_WIDTH = 50;
const DOT_ANIMATION_DURATION = 300;
const AnimatedDot = ({active, style}) => {
  const widthAnim = useRef(
    new Animated.Value(active ? ACTIVE_DOT_WIDTH : DOT_WIDTH),
  ).current;
  useEffect(() => {
    Animated.timing(widthAnim, {
      toValue: active ? ACTIVE_DOT_WIDTH : DOT_WIDTH,
      duration: DOT_ANIMATION_DURATION,
      useNativeDriver: false,
    }).start();
  }, [active, widthAnim]);
  return <Animated.View style={[style, {width: widthAnim}]} />;
};

const OnboardingScreen = ({navigation}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [showLottie, setShowLottie] = useState(true);
  const [redirecting, setRedirecting] = useState(false);
  const fadeAnim = useRef(new Animated.Value(1)).current;
  const translateYAnim = useRef(new Animated.Value(0)).current;
  const authToken = useUserStore(state => state.user.authToken);
  const refreshToken = useUserStore(state => state.user.refreshToken);

  useEffect(() => {
    // If tokens exist, show Lottie and redirect to Home after 3s
    // if (authToken && refreshToken) {
    //   setShowLottie(true);
    //   setRedirecting(true);
    //   const timeout = setTimeout(() => {
    //     navigation.reset({index: 0, routes: [{name: 'MainDash'}]});
    //   }, 2000);
    //   return () => clearTimeout(timeout);
    // } else {
    const lottieTimeout = setTimeout(() => setShowLottie(false), 3000);
    return () => clearTimeout(lottieTimeout);
    // }
  }, [authToken, refreshToken, navigation]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!animating && !showLottie) {
        handleNext();
      }
    }, SLIDE_DURATION);
    return () => clearInterval(interval);
  }, [currentIndex, animating, handleNext, showLottie]);

  const handleNext = useCallback(() => {
    if (animating) {
      return;
    }
    setAnimating(true);
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }),
      Animated.timing(translateYAnim, {
        toValue: -40,
        duration: FADE_DURATION,
        useNativeDriver: true,
      }),
    ]).start(() => {
      const nextIndex = (currentIndex + 1) % slides.length;
      setCurrentIndex(nextIndex);
      // Reset values before animating in
      fadeAnim.setValue(0);
      translateYAnim.setValue(40);
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: FADE_DURATION,
          useNativeDriver: true,
        }),
        Animated.timing(translateYAnim, {
          toValue: 0,
          duration: FADE_DURATION,
          useNativeDriver: true,
        }),
      ]).start(() => setAnimating(false));
    });
  }, [animating, currentIndex, fadeAnim, translateYAnim]);

  const handleContinue = () => {
    navigation.navigate('Login');
  };

  const hasHydrated = useUserStore.persist?.hasHydrated?.();

  if (!hasHydrated) {
    return null;
  }

  return (
    <PageLayout hidePattern delayRedirectToHome>
      {showLottie ? (
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <LottieView
            source={require('../../assets/animations/loader.json')}
            autoPlay
            loop={false}
            style={{width: 300, height: 300}}
          />
        </View>
      ) : !redirecting ? (
        <>
          <View style={styles.topTextContainer}>
            <Text style={styles.topSubtext}>It's your,</Text>
            <Text style={styles.topText}>
              <Text style={styles.topTextBold}>Roadmap to Success</Text>
            </Text>
          </View>
          <View style={styles.slideContainer}>
            <Animated.View
              style={[
                styles.card,
                {
                  opacity: fadeAnim,
                  transform: [{translateY: translateYAnim}],
                },
              ]}>
              <LinearGradient
                colors={['#090215', '#090215']}
                start={{x: 0.5, y: 0}}
                end={{x: 0.5, y: 1}}
                style={styles.cardInnerGradient}
              />
              <View style={styles.cardContent}>
                <Image
                  source={slides[currentIndex].image}
                  style={styles.image}
                />
                <Text style={styles.slideTitle}>
                  {slides[currentIndex].title}
                </Text>
                <Text style={styles.slideSubtitle}>
                  {slides[currentIndex].subtitle}
                </Text>
              </View>
            </Animated.View>
          </View>
          <View style={styles.dotsContainer}>
            {slides.map((_, index) => (
              <AnimatedDot
                key={index}
                active={index === currentIndex}
                style={[styles.dot, index === currentIndex && styles.activeDot]}
              />
            ))}
          </View>
          <SafeAreaView style={styles.buttonContainer}>
            <TouchableOpacity
              style={styles.button}
              onPress={handleContinue}
              disabled={animating}>
              <Text style={styles.buttonText}>Continue</Text>
            </TouchableOpacity>
          </SafeAreaView>
        </>
      ) : null}
    </PageLayout>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 60,
    justifyContent: 'space-between',
  },
  topTextContainer: {
    alignItems: 'center',
    marginTop: 36,
    marginBottom: 8,
  },
  topSubtext: {
    fontSize: 16,
    color: '#8C8A8A',
    fontWeight: '400',
    marginBottom: 2,
    letterSpacing: 0.1,
  },
  topText: {
    fontSize: 20,
    color: '#F6F3FC',
    marginTop: 0,
    marginBottom: 0,
    letterSpacing: 0.2,
    fontWeight: '400',
  },
  topTextBold: {
    fontWeight: '700',
    color: '#FFF',
  },
  slideContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 0,
    position: 'relative',
    marginBottom: 0,
    // minHeight: height * 0.48 + 32, // ensure enough space for card and button
  },
  card: {
    backgroundColor: '#000',
    borderRadius: 32,
    alignItems: 'center',
    width: '92%',
    height: height * 0.7, // keep the same height as you have set
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.18,
    shadowRadius: 8,
    elevation: 8,
    overflow: 'hidden',
  },
  cardInnerGradient: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 32,
  },
  cardContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    width: '100%',
    paddingHorizontal: 0,
    paddingVertical: 0,
    zIndex: 1,
    marginTop: '10%',
  },
  image: {
    width: 104,
    height: 167,
    resizeMode: 'contain',
    marginBottom: 18,
    marginTop: 0,
  },
  slideTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FFF',
    marginBottom: 20,
    textAlign: 'center',
    width: '100%',
    letterSpacing: 0.1,
  },
  slideSubtitle: {
    fontSize: 16,
    color: '#D3C4EF',
    textAlign: 'center',
    paddingHorizontal: 24,
    width: '100%',
    fontWeight: '400',
    lineHeight: 22,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 0,
    marginBottom: 18,
    zIndex: 11,
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 100, // place just above the button
  },
  dot: {
    height: 6,
    width: 32,
    borderRadius: 3,
    backgroundColor: '#300B73',
    marginHorizontal: 8,
    opacity: 1,
  },
  activeDot: {
    backgroundColor: '#815FC4',
    opacity: 1,
  },
  buttonContainer: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 20,
    alignItems: 'center',
    paddingBottom: 32,
    width: '100%',
    backgroundColor: 'transparent',
    zIndex: 10,
  },
  button: {
    backgroundColor: '#815FC4',
    paddingVertical: 14,
    borderRadius: 12,
    width: '92%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.12,
    shadowRadius: 4,
    elevation: 2,
    marginBottom: 0,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: '700',
    fontSize: 17,
    letterSpacing: 0.1,
  },
});

export default OnboardingScreen;
