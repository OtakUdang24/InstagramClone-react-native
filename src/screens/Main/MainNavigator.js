import React, { Component } from "react";
import { StyleSheet, Fragment } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator
} from "react-navigation";

import HomeScreen from "./Home/HomeScreen";
import Plus from "./Plus/Plus";
import ProfileScreen from "./Profile/ProfileScreen";

import EvilIcons from "react-native-vector-icons/EvilIcons";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";

const IHome = <MaterialCommunityIcons name="home-outline" size={30} />;
const ISearch = <EvilIcons name="search" size={30} />;
const IPlus = <EvilIcons name="plus" size={30} />;
const IHeart = <EvilIcons name="heart" size={30} />;
const IPerson = <MaterialIcons name="person-outline" size={30} />;

import UpdatePost from "./Home/UpdatePost";

stackNavigatorUpdatePost = createStackNavigator(
  {
    HomeScreen: {
        screen: HomeScreen,
        navigationOptions: {
            header: null,
        }
    },
    UpdatePost: {
      screen: UpdatePost,
    },
    
  },{
    initialRouteName : 'HomeScreen'
 }

)


TabNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: stackNavigatorUpdatePost,
      navigationOptions: {
        tabBarIcon: IHome
      }
    },
    Plus: {
      screen: Plus,
      navigationOptions: {
        tabBarIcon: IPlus,
        header: null
      }
    },
    Profile: {
      screen: ProfileScreen,
      navigationOptions: {
        tabBarIcon: IPerson
      }
    }
  },
  {
    tabBarOptions: {
      showLabel: false
    },
    navigationOptions: { header: null }
  }
);
export default TabNavigator;
