import React, {useContext, useEffect, useMemo, useRef, useState} from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Alert,
  ScrollView,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import PageLayout from '../onboarding/PageLayout';
import images from '../../assets/images';
import {
  normalizeHeight,
  normalizeWidth,
} from '../../components/Responsivescreen';
import {getFontStyles} from '../../styles/FontStyles';
import {ThemeContext} from '../../src/context/ThemeContext';
import {Bottomsheet} from '../../components';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay,
} from 'react-native-reanimated';

const questions = [
  {
    id: 1,
    text: 'What should a UX designer do after discovering users are confused by navigation?',
    options: [
      'Improve labeling',
      'Add more buttons',
      'Ignore the issue',
      'Remove navigation',
    ],
  },
  {
    id: 2,
    text: 'Which tool is best for wireframing?',
    options: ['Photoshop', 'Figma', 'Slack', 'Excel'],
  },
  {
    id: 3,
    text: 'What is A/B testing used for?',
    options: [
      'Debugging',
      'Typography',
      'Comparing designs',
      'Exporting files',
    ],
  },
  // Add more questions...
];

const QuizQuestions = props => {
  const AnimatedLinearGradient =
    Animated.createAnimatedComponent(LinearGradient);
  const BottomsheetRef = useRef(null);
  const {colors} = useContext(ThemeContext);
  const fstyles = getFontStyles(false, colors);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]); // {questionIndex, selectedIndex}

  const gradientColors = useMemo(() => ['#300B73', '#090215'], []);

  const handleOptionSelect = optionIndex => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[currentQuestion] = {
        questionIndex: currentQuestion,
        selectedIndex: optionIndex,
      };
      return updated;
    });
  };

  const handleNext = () => {
    const currentAnswer = answers[currentQuestion]?.selectedIndex;

    if (currentAnswer === undefined) {
      Alert.alert('Please select an option before proceeding.');
      return;
    }

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmit = () => {
    console.log('Final Answers:', answers);
    // Alert.alert('Submitted', JSON.stringify(answers));
    props.navigation.navigate('QuizSummary');
  };

  const selectedOption = answers[currentQuestion]?.selectedIndex;

  const question = questions[currentQuestion];
  const animatedWidths = questions.map(() => useSharedValue(0));

  useEffect(() => {
    answers.forEach((answer, index) => {
      if (answer?.selectedIndex !== undefined) {
        animatedWidths[index].value = withTiming(1, {duration: 500});
      } else {
        animatedWidths[index].value = withTiming(0, {duration: 500});
      }
    });
  }, [answers]);
  return (
    <View style={{flex: 1}}>
      <PageLayout
        hidePattern={true}
        // hasBackButton={true}
        // onBackButton={() => {
        //   props.navigation.navigate('OnboardingScreen');
        // }}
      >
        <TouchableOpacity
          onPress={() => {
            BottomsheetRef.current?.present();
          }}
          style={{
            alignSelf: 'flex-start',
            position: 'absolute',
            top: -20,
            left: 0,
            flexDirection: 'row',
            alignItems: 'center',
          }}
          activeOpacity={0.7}>
          <Image
            source={images.BACKICON}
            style={{
              height: normalizeHeight(20),
              width: normalizeWidth(20),
              resizeMode: 'contain',
            }}
          />
          <Text style={[fstyles.boldSixteen, {marginLeft: normalizeWidth(8)}]}>
            UI/UX Design Course
          </Text>
        </TouchableOpacity>
        <View style={{marginTop: normalizeHeight(34)}}>
          <Text
            style={[fstyles.mediumTen, {color: 'rgba(255, 255, 255, 0.60)'}]}>
            UI/UX Fundamentals
          </Text>
          <Text style={[fstyles.boldSixteen, {marginTop: normalizeHeight(4)}]}>
            Question {currentQuestion + 1}/{questions.length}
          </Text>
          <View style={styles.progressContainer}>
            {questions.map((_, index) => {
              const isFilled = answers[index]?.selectedIndex !== undefined;

              const animatedStyle = useAnimatedStyle(() => ({
                width: `${animatedWidths[index].value * 100}%`,
              }));

              return (
                <View
                  key={index}
                  style={[styles.progressStep, {overflow: 'hidden'}]}>
                  {isFilled ? (
                    <AnimatedLinearGradient
                      colors={['#D3C4EF', '#815FC4']}
                      start={{x: 0.5, y: 0}}
                      end={{x: 0.5, y: 1}}
                      style={[StyleSheet.absoluteFill, animatedStyle]}
                    />
                  ) : (
                    <View
                      style={[
                        StyleSheet.absoluteFill,
                        {backgroundColor: 'rgba(176, 149, 227, 0.16)'},
                      ]}
                    />
                  )}
                </View>
              );
            })}
          </View>

          <Text style={fstyles.heavyTwenty}>{question.text}</Text>
          <Text
            style={[
              fstyles.twelweRegular,
              {
                color: 'rgba(255, 255, 255, 0.60)',
                fontStyle: 'italic',
                marginTop: normalizeHeight(4),
              },
            ]}>
            Select one correct option
          </Text>
        </View>
        <View style={{marginTop: normalizeHeight(64)}}>
          {question.options.map((each, index) => {
            const isSelected = selectedOption === index;

            return (
              <TouchableOpacity
                key={index}
                onPress={() => handleOptionSelect(index)}
                activeOpacity={0.9}>
                <LinearGradient
                  colors={[
                    'rgba(62, 45, 94, 0.30)',
                    'rgba(129, 95, 196, 0.30)',
                  ]}
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  style={{
                    borderRadius: 40,
                    padding: 1,
                    marginBottom: normalizeHeight(12),
                  }}>
                  <View style={isSelected ? styles.box : styles.innerBox}>
                    <Text
                      style={[
                        fstyles.semiFourteen,
                        {color: isSelected ? '#F6F3FC' : '#B095E3'},
                      ]}>
                      {each}
                    </Text>
                  </View>
                </LinearGradient>
              </TouchableOpacity>
            );
          })}
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            marginTop: normalizeHeight(32),
            width: '100%',
            position: 'absolute',
            bottom: 0,
            paddingVertical: normalizeHeight(16),
            borderTopColor: '#815FC4',
            borderTopWidth: 1,
          }}>
          {currentQuestion > 0 ? (
            <TouchableOpacity
              onPress={handlePrevious}
              style={{
                backgroundColor: '#2F224B',
                paddingVertical: normalizeHeight(8),
                paddingHorizontal: normalizeWidth(12),
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Image
                source={images.BACKICON}
                style={{
                  height: normalizeHeight(16),
                  width: normalizeWidth(16),
                  resizeMode: 'contain',
                  marginRight: normalizeWidth(8),
                }}
              />
              <Text style={[fstyles.semiFourteen, {color: '#C4ADD8'}]}>
                Previous
              </Text>
            </TouchableOpacity>
          ) : (
            <View />
          )}
          {currentQuestion < questions.length - 1 ? (
            <TouchableOpacity
              onPress={handleNext}
              style={{
                backgroundColor: '#815FC4',
                paddingVertical: normalizeHeight(8),
                paddingHorizontal: normalizeWidth(12),
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={fstyles.semiFourteen}>Next</Text>
              <Image
                source={images.BACKICON}
                style={{
                  height: normalizeHeight(16),
                  width: normalizeWidth(16),
                  resizeMode: 'contain',
                  marginLeft: normalizeWidth(8),
                  transform: [{rotate: '180deg'}],
                }}
              />
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              onPress={handleSubmit}
              style={{
                backgroundColor: '#815FC4',
                paddingVertical: normalizeHeight(8),
                paddingHorizontal: normalizeWidth(12),
                borderRadius: 12,
                flexDirection: 'row',
                alignItems: 'center',
              }}>
              <Text style={fstyles.semiFourteen}>Submit</Text>
              <Image
                source={images.BACKICON}
                style={{
                  height: normalizeHeight(16),
                  width: normalizeWidth(16),
                  resizeMode: 'contain',
                  marginLeft: normalizeWidth(8),
                  transform: [{rotate: '180deg'}],
                }}
              />
            </TouchableOpacity>
          )}
        </View>

        <Bottomsheet
          showIndicator={false}
          ref={BottomsheetRef}
          headerText="Leave Quiz"
          headerLayoutType="spaced"
          enableHeader={true}
          footer={false}
          handleClose={() => {
            BottomsheetRef.current.close();
          }}>
          <View
            style={{
              backgroundColor: '#1C0743',
              flex: 1,
              height: '100%',
              paddingTop: normalizeHeight(32),
              alignItems: 'center',
            }}>
            <Text
              style={[
                fstyles.heavyTwenty,
                {textAlign: 'center', lineHeight: normalizeHeight(24)},
              ]}>
              Are you sure you want to leave{'\n'}
              the quiz?
            </Text>
            <View
              style={{
                width: normalizeWidth(328),
                alignItems: 'center',
                marginTop: normalizeHeight(24),
              }}>
              <Text
                style={[
                  fstyles.semiFourteen,
                  {color: 'rgba(238, 231, 249, 0.60)', textAlign: 'center'},
                ]}>
                If you leave the quiz now, You’ll lose your progress and what
                you scored till now.
              </Text>
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: '#815FC4',
                marginTop: normalizeHeight(52),
                width: normalizeWidth(308),
                height: normalizeHeight(42),
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: 12,
              }}>
              <Text style={fstyles.extraBoldFourteen}>Stay in Quiz</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                marginVertical: normalizeHeight(12),
                width: normalizeWidth(308),
                height: normalizeHeight(42),
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Text style={[fstyles.extraBoldFourteen, {color: '#815FC4'}]}>
                Leave Anyway
              </Text>
            </TouchableOpacity>
          </View>
        </Bottomsheet>
      </PageLayout>
    </View>
  );
};

export default QuizQuestions;

const styles = StyleSheet.create({
  innerBox: {
    borderRadius: 40,
    backgroundColor: 'transparent',
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(24),
    borderWidth: 1,
    borderColor: 'rgba(129, 95, 196, 0.5)',
  },
  box: {
    borderRadius: 40,
    borderWidth: 1,
    borderColor: '#D3C4EF',
    backgroundColor: '#815FC4',
    shadowColor: 'rgba(176, 149, 227, 0.6)',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 1,
    shadowRadius: 12,
    elevation: 6,
    paddingVertical: normalizeHeight(12),
    paddingHorizontal: normalizeWidth(24),
  },
  progressContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: normalizeHeight(16),
  },
  progressStep: {
    flex: 1,
    height: normalizeHeight(8),
    marginHorizontal: normalizeWidth(4),
    borderRadius: 4,
  },
});
