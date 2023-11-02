import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen'; // Import your HomeScreen component
import GuideScreen from './GuideScreen'; // Import your BlankScreen component
import TaskScreen from './TaskScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Guides" component={GuideScreen} />
      <Tab.Screen name="Tasks" component={TaskScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
