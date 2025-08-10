import React, {useRef, useEffect} from 'react';
import {SafeAreaView, View, Animated} from 'react-native';
import Question from '../../components/Question';

// Updated questions data
const QUESTIONS = [
  {
    id: 1,
    question: 'Which of these do you enjoy the most?',
    options: [
      'Building UIs',
      'Solving backend problems',
      'Designing experiences',
      'Testing applications',
      'Analyzing data',
    ],
    multiSelect: false,
    numberOfOptionsToSelect: 1,
  },
  {
    id: 2,
    question: 'Pick up to 2 areas you want to improve:',
    options: [
      'Frontend',
      'Backend',
      'DevOps',
      'UI/UX',
      'Testing',
      'Data Analysis',
    ],
    multiSelect: true,
    numberOfOptionsToSelect: 2,
  },
  {
    id: 3,
    question: 'Which work style do you prefer?',
    options: ['Teamwork', 'Solo', 'Flexible'],
    multiSelect: false,
    numberOfOptionsToSelect: 1,
  },
  {
    id: 4,
    question: 'Select the tools you have used (max 3):',
    options: ['React', 'Node.js', 'Figma', 'Jira', 'Python', 'AWS'],
    multiSelect: true,
    numberOfOptionsToSelect: 3,
  },
  {
    id: 5,
    question: 'What motivates you most?',
    options: [
      'Solving problems',
      'Helping users',
      'Learning new tech',
      'Building products',
    ],
    multiSelect: false,
    numberOfOptionsToSelect: 1,
  },
];

const RoadmapQuestionsFlow = ({navigation}) => {
  const [currentQ, setCurrentQ] = React.useState(0);
  const [answers, setAnswers] = React.useState([]); // {questionId, answer}
  const progressAnim = useRef(new Animated.Value(0)).current;

  // Animate progress bar smoothly
  useEffect(() => {
    // Animate to (currentQ / QUESTIONS.length) * 100
    const progress = (currentQ / QUESTIONS.length) * 100;
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 400,
      useNativeDriver: false,
    }).start();
  }, [currentQ, progressAnim]);

  const handleSubmit = selected => {
    setAnswers(prev => {
      const updated = [...prev];
      updated[currentQ] = {
        questionId: QUESTIONS[currentQ].id,
        answer: selected,
      };
      return updated;
    });
    if (currentQ < QUESTIONS.length - 1) {
      setCurrentQ(currentQ + 1);
    } else {
      // All questions answered
      setTimeout(() => {
        console.log('All answers:', [
          ...answers,
          {questionId: QUESTIONS[currentQ].id, answer: selected},
        ]);
        navigation.reset({
          index: 0,
          routes: [
            {
              name: 'MainDash',
            },
          ],
        });
      }, 0);
    }
  };

  const q = QUESTIONS[currentQ];
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#180037'}}>
      {/* Animated Progress Bar */}
      <View
        style={{
          height: 6,
          backgroundColor: '#4E2D8E',
          borderRadius: 3,
          marginTop: 50,
          overflow: 'hidden',
        }}>
        <Animated.View
          style={{
            width: progressAnim.interpolate({
              inputRange: [0, 100],
              outputRange: ['0%', '100%'],
            }),
            height: '100%',
            backgroundColor: '#9C7BFF',
            borderRadius: 3,
          }}
        />
      </View>
      <Question
        key={currentQ}
        question={q.question}
        options={q.options}
        multiSelect={q.multiSelect}
        numberOfOptionsToSelect={q.numberOfOptionsToSelect}
        initialSelected={answers[currentQ]?.answer || (q.multiSelect ? [] : [])}
        onSubmit={handleSubmit}
      />
    </SafeAreaView>
  );
};

export default RoadmapQuestionsFlow;
