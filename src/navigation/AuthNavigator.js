import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

const Stack = createStackNavigator();

const screens = [
  { name: 'Welcome', component: WelcomeScreen },
  { name: 'Login', component: LoginScreen },
  { name: 'SignUp', component: SignUpScreen },
];

const AuthNavigator = () => (
  <Stack.Navigator initialRouteName="Welcome">
    {screens.map(({ name, component }) => (
      <Stack.Screen
        key={name}
        name={name}
        component={component}
        options={{ headerShown: false }}
      />
    ))}
  </Stack.Navigator>
);

export default AuthNavigator;
