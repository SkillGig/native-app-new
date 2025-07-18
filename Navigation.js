import React, {useContext} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './screens/onboarding/Login';
import Dashboard from './screens/onboarding/Dashboard';
import OnBoarding from './screens/onboarding/OnBoarding';
import VerifyOTP from './screens/onboarding/VerifyOTP';
import {ThemeContext} from './src/context/ThemeContext';
import UnlockedExp from './screens/onboarding/UnlockedExp';
import InfoCheck from './screens/onboarding/InfoCheck';
import RequestStatus from './screens/onboarding/RequestStatus';
import MainDash from './screens/Global/MainDash';
import StreakCalender from './screens/Global/StreakCalender';
import RoadMap from './screens/Milestones/RoadMap';
import AutoScrollCarousel from './screens/Milestones/AutoScrollCarousel';
import CareerGoalScreen from './screens/onboarding/CareerGoalSelection';
import RoadmapQuestionsFlow from './screens/onboarding/RoadmapQuestionsFlow';
import LeaderBoard from './screens/Milestones/LeaderBoard';
import CourseContent from './screens/Milestones/CourseContent';
import ExploreCourses from './screens/VideoSection/ExploreCourses';
import CourseScreening from './screens/VideoSection/CourseScreening';
import OngoingCourses from './screens/VideoSection/OngoingCourses';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const {isDark} = useContext(ThemeContext);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
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
          component={MainDash}
          options={{headerShown: false}}
        />

        <Stack.Screen
          name="StreakCalender"
          component={StreakCalender}
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
