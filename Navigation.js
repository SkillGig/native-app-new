import React, { useContext } from 'react';
import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from './screens/onboarding/Login';
// import Dashboard from './screens/onboarding/Dashboard';
import Dashboard from './screens/onboarding/Dashboard';

import { ThemeContext } from './src/context/ThemeContext';

const Stack = createNativeStackNavigator();

const Navigation = () => {
  const { isDark } = useContext(ThemeContext);

  return (
    <NavigationContainer theme={isDark ? DarkTheme : DefaultTheme}>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="Dashboard" component={Dashboard} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
