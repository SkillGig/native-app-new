import React, {useState, useRef, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  SafeAreaView,
  Animated,
  Vibration,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import images from '../../assets/images';
import useUserStore from '../../src/store/useUserStore';
import Loader from '../../components/Loader';
import {fetchUserRoadmaps} from '../../src/api/userOnboardingAPIs';

const CareerGoalScreen = ({navigation, route}) => {
  const [selected, setSelected] = useState(null);
  const [showSplash, setShowSplash] = useState(true);
  const [apiResult, setApiResult] = useState(null); // Store API result

  const setTokens = useUserStore(state => state.setTokens);
  const setAvailableRoadmaps = useUserStore(
    state => state.setAvailableRoadmaps,
  );

  const authToken = useUserStore(state => state.user.authToken);
  const refreshToken = useUserStore(state => state.user.refreshToken);
  const isUserEnrolledToRoadmap = useUserStore(
    state => state.user.isUserEnrolledToRoadmap,
  );
  const availableRoadmaps = useUserStore(state => state.user.availableRoadmaps);

  const setIsUserEnrolledToRoadmap = useUserStore(
    state => state.setIsUserEnrolledToRoadmap,
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      // Set tokens from params (if present) before navigating
      if (
        route?.params?.authToken &&
        route?.params?.refreshToken &&
        route?.params?.availableRoadmaps.length > 0
      ) {
        setTokens({
          authToken: route.params.authToken,
          refreshToken: route.params.refreshToken,
        });
        setAvailableRoadmaps(route.params.availableRoadmaps);
      } else if (!authToken || !refreshToken) {
        navigation.replace('OnBoarding');
      }
    }, 3000); // 5 seconds

    return () => clearTimeout(timer); // cleanup on unmount
  }, [
    authToken,
    availableRoadmaps,
    navigation,
    refreshToken,
    route,
    setAvailableRoadmaps,
    setTokens,
  ]);

  // Animation refs
  const rocketAnim = useRef(new Animated.Value(0)).current; // translateY
  const textAnim = useRef(new Animated.Value(0)).current; // translateY
  const textOpacity = useRef(new Animated.Value(1)).current;
  const floatAnim = useRef();

  // Start API fetch as soon as splash starts
  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetchUserRoadmaps();
        if (!cancelled) {
          setApiResult(res);
        }
      } catch (e) {
        if (!cancelled) {
          setApiResult(null);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, []);

  // Splash and animation logic
  useEffect(() => {
    floatAnim.current = Animated.loop(
      Animated.sequence([
        Animated.timing(rocketAnim, {
          toValue: -20,
          duration: 700,
          useNativeDriver: true,
        }),
        Animated.timing(rocketAnim, {
          toValue: 0,
          duration: 700,
          useNativeDriver: true,
        }),
      ]),
      {iterations: 3},
    );
    floatAnim.current.start();

    // After 3s, stop float and play move-up
    const animTimer = setTimeout(() => {
      floatAnim.current && floatAnim.current.stop();
      Animated.parallel([
        Animated.timing(rocketAnim, {
          toValue: -1250, // move rocket up
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(textAnim, {
          toValue: 120, // move text down
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(textOpacity, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        // After move-up animation, decide what to do
        console.log(apiResult, 'API Result in CareerGoalScreen');
        const selectedRoadmaps = apiResult?.data?.selectedRoadmaps;
        if (selectedRoadmaps && selectedRoadmaps.length > 0) {
          setIsUserEnrolledToRoadmap(true);
          navigation.replace('MainDash');
        } else {
          setShowSplash(false); // Show options
        }
      });
    }, 3000);
    return () => {
      clearTimeout(animTimer);
      floatAnim.current && floatAnim.current.stop();
    };
  }, [
    rocketAnim,
    textAnim,
    textOpacity,
    apiResult,
    navigation,
    setIsUserEnrolledToRoadmap,
  ]);

  const handleSelectOption = item => {
    Vibration.vibrate(15); // Vibrate on option select
    setSelected(item);
  };

  const renderOption = ({item}) => {
    const isSelected = item === selected;
    return (
      <TouchableOpacity
        onPress={() => handleSelectOption(item)}
        style={[styles.optionButton, isSelected && styles.selectedOption]}
        activeOpacity={0.8}>
        <Text style={[styles.optionText, isSelected && styles.selectedText]}>
          {item}
        </Text>
        {isSelected && <Text style={styles.checkmark}>✓</Text>}
      </TouchableOpacity>
    );
  };

  // Determine if the submit button should be disabled
  const isSubmitButtonDisabled = selected === null;

  useEffect(() => {
    // If availableRoadmaps is empty, fetch user roadmaps
    if (!isUserEnrolledToRoadmap) {
      (async () => {
        try {
          const res = await fetchUserRoadmaps();
          const selectedRoadmaps = res?.data?.data?.selectedRoadmaps;
          if (selectedRoadmaps && selectedRoadmaps.length > 0) {
            navigation.replace('MainDash');
            return;
          }
          // Optionally set availableRoadmaps here if needed
        } catch (e) {
          // Optionally handle error
        }
      })();
    }
  }, [isUserEnrolledToRoadmap, navigation]);

  if (showSplash) {
    return (
      <LinearGradient
        colors={['#180037', '#260964']}
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Animated.Image
            source={images.ROCKET}
            style={{
              width: 200,
              height: 200,
              marginBottom: 32,
              transform: [{translateY: rocketAnim}],
            }}
            resizeMode="contain"
          />
          <Animated.View
            style={{
              alignItems: 'center',
              opacity: textOpacity,
              transform: [{translateY: textAnim}],
            }}>
            <Text
              style={{
                color: '#FFF',
                fontSize: 32,
                fontWeight: 'bold',
                textAlign: 'center',
                marginBottom: 12,
                letterSpacing: 1,
              }}>
              Almost there...!
            </Text>
            <Text
              style={{
                color: '#FFF',
                fontSize: 14,
                textAlign: 'center',
                lineHeight: 20,
                maxWidth: '50%',
                fontWeight: '600',
              }}>
              You&apos;re just one step away from unlocking your full potential.
            </Text>
          </Animated.View>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient colors={['#180037', '#260964']} style={styles.gradient}>
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.contentContainer}>
          <Text style={styles.subheading}>After you graduate</Text>
          <Text style={styles.heading}>What do you want to be?</Text>

          <FlatList
            data={[
              ...availableRoadmaps.map(roadmap => roadmap.value),
              "I don't know yet !",
            ]}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.optionsListContent}
            renderItem={renderOption}
          />

          <TouchableOpacity
            style={[
              styles.submitButton,
              isSubmitButtonDisabled && styles.disabledSubmitButton, // Apply disabled style
            ]}
            onPress={() => {
              if (selected === "I don't know yet !") {
                navigation.replace('RoadmapQuestionsFlow', {
                  fromCareerGoal: true,
                });
              } else {
                // get the selected roadmap id
                const selectedRoadmap = availableRoadmaps.find(
                  roadmap => roadmap.value === selected,
                );
                // call the API to set the career goal

                console.log(selectedRoadmap, 'the selected roadmap iiiissss');

                navigation.reset({
                  index: 0,
                  routes: [
                    {
                      name: 'MainDash',
                    },
                  ],
                });
              }
            }}
            activeOpacity={isSubmitButtonDisabled ? 1 : 0.8} // Prevent active opacity change when disabled
            disabled={isSubmitButtonDisabled} // Disable the button
          >
            <Text
              style={[
                styles.submitText,
                isSubmitButtonDisabled && styles.disabledSubmitText, // Apply disabled text style
              ]}>
              {selected === "I don't know yet !"
                ? 'Continue'
                : 'Set My Career Goal'}
            </Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </LinearGradient>
  );
};

export default CareerGoalScreen;

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  safeArea: {
    flex: 1,
    marginTop: 90, // Adjust based on your header height
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 20,
  },
  subheading: {
    color: '#B6A7CC',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 6,
  },
  heading: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
  },
  optionsListContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
  optionButton: {
    borderColor: '#7A59C6',
    borderWidth: 1,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: 24,
    marginVertical: 6,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  selectedOption: {
    backgroundColor: '#7A59C6',
    shadowColor: '#B88AF3',
    shadowOpacity: 0.7,
    shadowOffset: {width: 0, height: 3},
    shadowRadius: 6,
    elevation: 6,
    borderColor: 'transparent',
  },
  optionText: {
    color: '#FFFFFF',
    fontSize: 14,
    flexShrink: 1,
  },
  selectedText: {
    fontWeight: 'bold',
  },
  checkmark: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  submitButton: {
    backgroundColor: '#A46BF5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 30,
    marginBottom: 20,
  },
  disabledSubmitButton: {
    backgroundColor: '#5A4B7D', // A slightly darker or desaturated color for disabled state
  },
  submitText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '600',
  },
  disabledSubmitText: {
    color: '#B6A7CC', // A lighter color for disabled text
  },
});
