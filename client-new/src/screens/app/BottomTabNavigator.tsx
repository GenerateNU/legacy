import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from './HomeScreen';
import GuideScreen from './GuideScreen';
import TaskScreen from './TaskScreen';
import MapScreen from './MarketplaceScreen';
import ProfileScreen from './ProfileScreen';

import HomeIcon from '../../components/icons/HomeIcon';
import GuidesIcon from '../../components/icons/GuidesIcon';
import MarketplaceIcon from '../../components/icons/MarketplaceIcon';
import TaskIcon from '../../components/icons/TaskIcon';
import ProfileIcon from '../../components/icons/ProfileIcon';

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
          } else if (route.name === 'Tasks') {
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
          paddingBottom: 10,

        },
        tabBarLabel: ''
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Guides" component={GuideScreen} />
      {/* <Tab.Screen name="Marketplace" component={MapScreen} /> */}
      <Tab.Screen name="Tasks" component={TaskScreen} />
      {/* <Tab.Screen name="Profile" component={ProfileScreen} /> */}

    </Tab.Navigator>
  );
};

export default TabNavigator;