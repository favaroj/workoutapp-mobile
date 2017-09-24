import React from 'react';
import { Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { TabNavigator, TabBarBottom } from 'react-navigation';
import { withMappedNavigationAndConfigProps } from 'react-navigation-props-mapper';
import {Icon} from 'react-native-elements';

import Colors from '../constants/Colors';

import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import SettingsScreen from '../screens/SettingsScreen';
import WorkoutMain from '../screens/WorkoutMain';
import MeganScreen from '../screens/MeganScreen';
import JohnScreen from '../screens/JohnScreen';

export default TabNavigator(
  {
    Home: {
      screen: withMappedNavigationAndConfigProps(HomeScreen),
    },
    John: {
      screen: withMappedNavigationAndConfigProps(JohnScreen),
    },
    Megan: {
      screen: withMappedNavigationAndConfigProps(MeganScreen),
    },
    //Resources: {
     // screen: withMappedNavigationAndConfigProps(WorkoutMain),
    //},
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Home':
            iconName = Platform.OS === 'ios'
              ? `ios-home${focused ? '' : '-outline'}`
              : 'md-home';
            break;
          /*case 'Resources':
            iconName = Platform.OS === 'ios'
              ? `ios-information-circle${focused ? '' : '-outline'}`
              : 'md-information-circle';
              break;*/
          case 'John':
            iconName = Platform.OS === 'ios'
              ? `ios-walk ${focused ? '' : '-outline'}`
              : 'fitness-center';
              break;
          case 'Megan':
            iconName = Platform.OS === 'ios'
              ? `ios-walk ${focused ? '' : '-outline'}`
              : 'fitness-center';
              break;    
        }
        return (
          <Ionicons
            name={iconName}
            size={20}
            style={{ marginBottom: -3 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
      },
      
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: 'bottom',
    animationEnabled: false,
    swipeEnabled: false,
    tabBarOptions: {
      iconStyle: {
        width: 35,
        height: 60
      },
      tabStyle: {
        height: 50
      },
      style: {
        backgroundColor: 'white'
      }
    },
  }
);
