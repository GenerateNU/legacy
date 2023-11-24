import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import React from 'react';

import GuidesIcon from '../../components/icons/GuidesIcon';
import HomeIcon from '../../components/icons/HomeIcon';
import MarketplaceIcon from '../../components/icons/MarketplaceIcon';
import ProfileIcon from '../../components/icons/ProfileIcon';
import TaskIcon from '../../components/icons/TaskIcon';
import FileCollectionScreen from './FileCollectionScreen';
import GuideScreen from './GuideScreen';
import HomeScreen from './HomeScreen';
import MapScreen from './MarketplaceScreen';
import ProfileScreen from './ProfileScreen';
import TaskScreen from './TaskScreen';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarIcon: ({ focused }) => {
          let iconComponent;

          if (route.name === 'Home') {
            iconComponent = <HomeIcon focused={focused} />;
          } else if (route.name === 'Guides') {
            iconComponent = <GuidesIcon focused={focused} />;
          } else if (route.name === 'Files') {
            iconComponent = <TaskIcon focused={focused} />;
          } else if (route.name === 'Marketplace') {
            iconComponent = <MarketplaceIcon focused={focused} />;
          } else if (route.name === 'Profile') {
            iconComponent = <ProfileIcon focused={focused} />;
          }
          return iconComponent;
        },
        tabBarStyle: {
          backgroundColor: '#FFF9EE',
          borderTopWidth: 1,
          paddingTop: 10,
          paddingBottom: 10
        },
        tabBarLabel: ''
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Guides" component={GuideScreen} />
      <Tab.Screen name="Marketplace" component={MapScreen} />
      <Tab.Screen name="Files" component={FileCollectionScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

export default TabNavigator;
