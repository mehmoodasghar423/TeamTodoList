import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import WelcomeScreen from '../screens/Auth/WelcomeScreen';
import SignUpScreen from '../screens/Auth/SignUpScreen';
import LoginScreen from '../screens/Auth/LoginScreen';

const Stack = createStackNavigator();

const screens = [
  {
    name: 'Welcome',
    component: WelcomeScreen,
    options: { headerShown: false },
  },
  {
    name: 'Login',
    component: LoginScreen,
    options: { headerShown: false },
  },
  {
    name: 'SignUp',
    component: SignUpScreen,
    options: { headerShown: false },
  },
];

const AuthNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Welcome">
      {screens.map((screen, index) => (
        <Stack.Screen 
          key={index} 
          name={screen.name} 
          component={screen.component} 
          options={screen.options} 
        />
      ))}
    </Stack.Navigator>
  );
};

export default AuthNavigator;
