import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import AdminHome from '../screens/AdminHome';
import MemberHome from '../screens/MemberHome';
import CreateTask from '../screens/CreateTask';
import TaskDetails from '../screens/TaskDetails';
import TeamProgress from '../screens/TeamProgress';
import MemberTaskDetails from '../screens/MemberTaskDetails';
import AdminAllTasks from '../screens/AdminAllTasks';

import EditTask from '../screens/Admin/EditTask';

const Stack = createStackNavigator();

const screenOptions = {
  headerStyle: {
    backgroundColor: "#4169e1",
  },
  headerTintColor: '#fff',
  headerTitleStyle: {
    fontFamily: 'TitilliumWeb-SemiBold',
  },
};

const screens = [
  {name: 'AdminHome', component: AdminHome, options: {headerShown: false}},
  {name: 'MemberHome', component: MemberHome, options: {headerShown: false}},
  {
    name: 'CreateTask',
    component: CreateTask,
    options: {
      ...screenOptions,
      headerTitle: 'Create Task',
    },
  },
  {
    name: 'TaskDetails',
    component: TaskDetails,
    options: {
      ...screenOptions,
      headerTitle: 'Task Details',
    },
  },
  {
    name: 'EditTask',
    component: EditTask,
    options: {
      ...screenOptions,
      headerTitle: 'Edit Task',
    },
  },
  {
    name: 'TeamProgress',
    component: TeamProgress,
    options: {
      ...screenOptions,
      headerTitle: 'Team Progress',
    },
  },
  {
    name: 'MemberTaskDetails',
    component: MemberTaskDetails,
    options: {
      ...screenOptions,
      headerTitle: 'Task Details for Member',
    },
  },
  {
    name: 'AdminAllTasks',
    component: AdminAllTasks,
    options: {
      ...screenOptions,
      headerTitle: 'All tasks',
    },
  },
];

const AppNavigator = () => (
  <Stack.Navigator>
    {screens.map(({name, component, options}) => (
      <Stack.Screen
        key={name}
        name={name}
        component={component}
        options={options}
      />
    ))}
  </Stack.Navigator>
);

export default AppNavigator;
