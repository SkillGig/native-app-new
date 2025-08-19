import React, {useContext} from 'react';
import {
  NavigationContainer,
  DefaultTheme,
  DarkTheme,
} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
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
import QuizzesDashboard from './screens/Quizzes/QuizzesDashboard';
import QuizQuestions from './screens/Quizzes/QuizQuestions';
import QuizSummary from './screens/Quizzes/QuizSummary';
import YourScreen from './screens/Quizzes/YourScreen';
import BottomNavBar from './components/BottomNavBar';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import images from './assets/images';
import LinearGradient from 'react-native-linear-gradient';
import { normalizeHeight, normalizeWidth } from './components/Responsivescreen';

const Tab = createBottomTabNavigator();

const Stack = createNativeStackNavigator();

function BottomTabs() {
  return (
        <View style={styles.container}>
      <LinearGradient
        colors={["rgba(28,7,67,0)", "#0000"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.gradient}
      />

    <Tab.Navigator
    screenOptions={{
    headerShown: false,
    tabBarStyle: {
      position: 'absolute',
      bottom: 16,
      left: 16,
      right: 16,
      height: normalizeHeight(64),
      backgroundColor: '#300B73',
      borderRadius: 24,
      elevation: 5,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 4 },
      shadowRadius: 8,
      borderWidth: 1,
      borderColor: 'white',
      width: '70%',
      marginLeft: normalizeWidth(20),
    },
  }}
    >
      <Tab.Screen
        name="MainDash"
        component={MainDash}
        options={{
          tabBarButton: props => {
            const { onPress, accessibilityState } = props;
            return (
              <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                <BottomNavBar
                  focused={accessibilityState.selected}
                  img={images.HOME}
                  pagename={'Home'}
                  focusedImg={images.HOMEACTIVE}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tab.Screen
        name="RoadMap"
        component={RoadMap}
        options={{
          headerShown: false,
          tabBarButton: props => {
            const { onPress, accessibilityState } = props;
            return (
              <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                <BottomNavBar
                  focused={accessibilityState.selected}
                  img={images.MILESTONE}
                  pagename={'Milestones'}
                  focusedImg={images.MILESTONEACTIVE}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

      <Tab.Screen
        name="OngoingCourses"
        component={OngoingCourses}
        options={{
          headerShown: false,
          tabBarButton: props => {
            const { onPress, accessibilityState } = props;
            return (
              <TouchableOpacity onPress={onPress} style={{ flex: 1 }}>
                <BottomNavBar
                  focused={accessibilityState.selected}
                  img={images.CONNECT}
                  pagename={'Connect'}
                  focusedImg={images.CONNECTACTIVE}
                />
              </TouchableOpacity>
            );
          },
        }}
      />

   <Tab.Screen
  name="QuizzesDashboard"
  component={QuizzesDashboard}   // replace with your screen
  options={{
    tabBarButton: props => {
      const { onPress } = props;
      return (
        <TouchableOpacity
          onPress={onPress}
        style={{
            position: 'absolute',
            bottom: 0, // raise it higher than the bar
            right: -85,  // place outside right side
            width:normalizeWidth(64),
            height:normalizeHeight(64),
            borderRadius: 35,
            backgroundColor: '#644c91',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 8,
          }}
        >
          {/* Custom icon or image */}
          <BottomNavBar
            focused={false}
            img={images.COURSEREADING}
            // pagename={'Special'}
            focusedImg={images.COURSEREADING}
          />
        </TouchableOpacity>
      );
    },
  }}
/>


    </Tab.Navigator>


      </View>
  );
}

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
          // component={MainDash}
          component={BottomTabs}
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