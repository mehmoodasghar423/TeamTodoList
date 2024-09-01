import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Welcome from '../screens/Auth/Welcome';
import SignUp from '../screens/Auth/SignUp';
import Login from '../screens/Auth/Login';
const Stack = createStackNavigator();

const screens = [
  { name: 'Welcome', component: Welcome },
  { name: 'SignUp', component: SignUp },
  { name: 'Login', component: Login },
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
