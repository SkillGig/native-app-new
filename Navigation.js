import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import Login from './screens/onboarding/Login';
import Dashboard from './screens/onboarding/Dashboard';
import OnBoarding from './screens/onboarding/OnBoarding';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
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
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
