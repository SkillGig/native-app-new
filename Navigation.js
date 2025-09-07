import React from 'react';
import {NavigationContainer, DarkTheme} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Login from './screens/onboarding/Login';
import Dashboard from './screens/onboarding/Dashboard';
import OnBoarding from './screens/onboarding/OnBoarding';
import VerifyOTP from './screens/onboarding/VerifyOTP';
import UnlockedExp from './screens/onboarding/UnlockedExp';
import InfoCheck from './screens/onboarding/InfoCheck';
import RequestStatus from './screens/onboarding/RequestStatus';
import MainDash from './screens/Global/MainDash';
import RoadMap from './screens/Milestones/RoadMap';
import AutoScrollCarousel from './screens/Milestones/AutoScrollCarousel';
import CareerGoalScreen from './screens/onboarding/CareerGoalSelection';
import RoadmapQuestionsFlow from './screens/onboarding/RoadmapQuestionsFlow';
import LeaderBoard from './screens/Milestones/LeaderBoard';
import CourseContent from './screens/Milestones/CourseContent';
import ExploreCourses from './screens/VideoSection/ExploreCourses';
import CourseScreening from './screens/VideoSection/CourseScreening';
import OngoingCourses from './screens/VideoSection/OngoingCourses';
import QuizzesDashboard from './screens/Quizzes/QuizzesDashboard';
import QuizQuestions from './screens/Quizzes/QuizQuestions';
import QuizSummary from './screens/Quizzes/QuizSummary';
import YourScreen from './screens/Quizzes/YourScreen';
import BottomNavBar from './components/BottomNavBar';
import {StyleSheet, View, SafeAreaView} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import CurrentDayStreakBreakdown from './screens/Global/CurrentDayStreakBreakdown';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Define the custom tab bar component outside of render to avoid re-creation
const CustomTabBar = props => <BottomNavBar {...props} />;

function BottomTabs() {
  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <LinearGradient
          colors={['rgba(28,7,67,0)', '#0000']}
          start={{x: 0.5, y: 0}}
          end={{x: 0.5, y: 1}}
          style={styles.gradient}
        />

        <Tab.Navigator
          screenOptions={{
            headerShown: false,
            tabBarStyle: {display: 'none'}, // Hide default tab bar
          }}
          tabBar={CustomTabBar}>
          <Tab.Screen name="MainDash" component={MainDash} />
          <Tab.Screen name="RoadMap" component={RoadMap} />
          <Tab.Screen name="OngoingCourses" component={OngoingCourses} />
          <Tab.Screen name="QuizzesDashboard" component={QuizzesDashboard} />
        </Tab.Navigator>
      </View>
    </SafeAreaView>
  );
}

const Navigation = () => {
  // DarkTheme is always applied by default

  return (
    <NavigationContainer theme={DarkTheme}>
      <Stack.Navigator initialRouteName="OnBoarding">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{headerShown: false}}
        />
        <Stack.Screen name="Dashboard" component={Dashboard} />
        <Stack.Screen
          name="OnBoarding"
          component={OnBoarding}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="VerifyOTP"
          component={VerifyOTP}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="UnlockedExp"
          component={UnlockedExp}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="InfoCheck"
          component={InfoCheck}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RequestStatus"
          component={RequestStatus}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CareerGoal"
          component={CareerGoalScreen}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="MainDash"
          // component={MainDash}
          component={BottomTabs}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CurrentDayStreakBreakdown"
          component={CurrentDayStreakBreakdown}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RoadMap"
          component={RoadMap}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="AutoScrollCarousel"
          component={AutoScrollCarousel}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="RoadmapQuestionsFlow"
          component={RoadmapQuestionsFlow}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="LeaderBoard"
          component={LeaderBoard}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="CourseContent"
          component={CourseContent}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="ExploreCourses"
          component={ExploreCourses}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="CourseScreening"
          component={CourseScreening}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="OngoingCourses"
          component={OngoingCourses}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="QuizzesDashboard"
          component={QuizzesDashboard}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="QuizQuestions"
          component={QuizQuestions}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="QuizSummary"
          component={QuizSummary}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="YourScreen"
          component={YourScreen}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
const styles = StyleSheet.create({
  safeContainer: {
    flex: 1,
    backgroundColor: '#090215', // Dark background for consistent SafeArea
  },
  container: {
    flex: 1,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
  },
  blur: {
    ...StyleSheet.absoluteFillObject,
  },
});
