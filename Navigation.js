import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/onboarding/Login';
import Dashboard from './screens/onboarding/Dashboard';
import OnBoarding from './screens/onboarding/OnBoarding';
import VerifyOTP from './screens/onboarding/VerifyOTP';
import { ThemeContext } from './src/context/ThemeContext';
import UnlockedExp from './screens/onboarding/UnlockedExp';
import InfoCheck from './screens/onboarding/InfoCheck';
const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
