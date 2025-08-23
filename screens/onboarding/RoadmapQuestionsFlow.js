import React, {useRef, useEffect, useState} from 'react';
import {SafeAreaView, View, Animated, ActivityIndicator} from 'react-native';
import Question from '../../components/Question';
import RoadmapLoader from '../../components/RoadmapLoader';
import FinalRoadmapSelection from './FinalRoadmapSelection';
import {
  fetchOnboardingQuestion,
  submitOnboardingQuestionAnswer,
  calculateRoadmap,
  enrollUserToRoadmap,
} from '../../src/api/userOnboardingAPIs';
import useUserStore from '../../src/store/useUserStore';
import useSnackbarStore from '../../src/store/useSnackbarStore';

const RoadmapQuestionsFlow = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [question, setQuestion] = useState(null);
  const [progress, setProgress] = useState({
    totalQuestions: 0,
    answeredQuestions: 0,
  });
  const [selected, setSelected] = useState([]);
  const [roadmap, setRoadmap] = useState(null);
  const [roadmapLoading, setRoadmapLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [enrolling, setEnrolling] = useState(false);
  const progressAnim = useRef(new Animated.Value(0)).current;

  const setIsUserEnrolledToRoadmap = useUserStore(
    state => state.setIsUserEnrolledToRoadmap,
  );
  const showSnackbar = useSnackbarStore(state => state.showSnackbar);

  // Fetch first question on mount
  useEffect(() => {
    let cancelled = false;
    const fetchFirst = async () => {
      setLoading(true);
      try {
        const res = await fetchOnboardingQuestion(0);
        if (res?.data?.nextQuestionDetails) {
          setQuestion(res.data.nextQuestionDetails);
          setProgress(res.data.userQuestionCompletionProgress);
        } else {
          // No question, check progress
          if (
            res?.error?.userQuestionCompletionProgress?.totalQuestions ===
            res?.error?.userQuestionCompletionProgress?.answeredQuestions
          ) {
            // All answered, show roadmap loader and calculate roadmap
            setRoadmapLoading(true);
            const roadmapRes = await calculateRoadmap();
            // Wait for 5 seconds to show the loader
            setTimeout(() => {
              setRoadmap(roadmapRes?.data?.data?.recommendations?.[0] || null);
              setRoadmapLoading(false);
            }, 5000);
          }
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    fetchFirst();
    return () => {
      cancelled = true;
    };
  }, []);

  // Animate progress bar
  useEffect(() => {
    if (progress.totalQuestions > 0) {
      const pct = (progress.answeredQuestions / progress.totalQuestions) * 100;
      // Always reset progressAnim to 0 if starting a new flow
      if (progress.answeredQuestions === 0) {
        progressAnim.setValue(0);
      }
      Animated.timing(progressAnim, {
        toValue: pct,
        duration: 400,
        useNativeDriver: false,
      }).start();
    } else {
      progressAnim.setValue(0);
    }
  }, [progress.totalQuestions, progress.answeredQuestions, progressAnim]);

  const handleAcceptRoadmap = async () => {
    if (!roadmap?.roadmapId) {
      showSnackbar?.({
        message: 'Invalid roadmap selection. Please try again.',
        type: 'error',
      });
      return;
    }

    setEnrolling(true);
    try {
      await enrollUserToRoadmap(roadmap.roadmapId);
      setIsUserEnrolledToRoadmap(true);
      navigation.reset({index: 0, routes: [{name: 'MainDash'}]});
    } catch (error) {
      showSnackbar?.({
        message: 'Roadmap Enrollment is failed please retry again',
        type: 'error',
      });
    } finally {
      setEnrolling(false);
    }
  };

  const handleRejectRoadmap = () => {
    // Reset to career goal selection screen
    navigation.reset({index: 0, routes: [{name: 'CareerGoal'}]});
  };

  const handleSubmit = async selectedOptions => {
    if (!question) {
      return;
    }
    setSubmitting(true);
    try {
      await submitOnboardingQuestionAnswer(
        question.questionId,
        selectedOptions,
      );
      // Fetch next question
      const res = await fetchOnboardingQuestion(question.questionId);

      // Update progress from response data regardless of whether there's a next question
      const progressData =
        res?.data?.userQuestionCompletionProgress ||
        res?.error?.userQuestionCompletionProgress;

      console.log(progressData, 'the progress data');
      if (progressData) {
        setProgress(progressData);
      }

      if (res?.data?.nextQuestionDetails) {
        setQuestion(res.data.nextQuestionDetails);
        setSelected([]);
      } else {
        // No more questions, check if all are answered
        if (progressData?.totalQuestions === progressData?.answeredQuestions) {
          setRoadmapLoading(true); // Show roadmap loader
          const roadmapRes = await calculateRoadmap();
          // Wait for 5 seconds to show the loader
          setTimeout(() => {
            setRoadmap(roadmapRes?.data?.data?.recommendations?.[0] || null);
            setRoadmapLoading(false);
          }, 5000);
        }
        setQuestion(null);
      }
    } finally {
      setSubmitting(false);
    }
  };

  // If loading, show spinner
  if (loading) {
    return (
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: '#180037',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <ActivityIndicator size="large" color="#9C7BFF" />
      </SafeAreaView>
    );
  }

  // If roadmap loading, show RoadmapLoader
  if (roadmapLoading) {
    return (
      <SafeAreaView style={{flex: 1, backgroundColor: '#180037'}}>
        <RoadmapLoader />
      </SafeAreaView>
    );
  }

  // If roadmap is present, show FinalRoadmapSelection
  if (roadmap) {
    return (
      <FinalRoadmapSelection
        navigation={navigation}
        roadmapName={roadmap.roadmapName}
        centerIcon={null} // Ignore for now as requested
        onAccept={handleAcceptRoadmap}
        onReject={handleRejectRoadmap}
        enrolling={enrolling} // Pass loading state
      />
    );
  }

  // If question is present, show it
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#180037'}}>
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
        key={question.questionId}
        question={question.questionText}
        options={question.options}
        multiSelect={question.questionType === 'multi_select'}
        numberOfOptionsToSelect={question.maxSelections || 1}
        minSelections={question.minSelections || 1}
        maxSelections={question.maxSelections || 1}
        initialSelected={selected}
        onSubmit={handleSubmit}
      />
      {submitting && (
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 0,
            top: 0,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(24,0,55,0.2)',
          }}>
          <ActivityIndicator size="large" color="#9C7BFF" />
        </View>
      )}
    </SafeAreaView>
  );
};

export default RoadmapQuestionsFlow;
