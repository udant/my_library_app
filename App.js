import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, View, Image } from 'react-native';
import {createAppContainer, createSwitchNavigator } from "react-navigation";
import { createBottomTabNavigator} from 'react-navigation-tabs';
import TransactionScreen from './screens/BookTransactionScreen';
import SearchScreen from './screens/SearchScreen';
import LoginScreen from './screens/LoginScreen';





export default class App extends React.Component {
  render() {
    return (
      <AppContainer />
    );
  }
}

const TabNavigator = createBottomTabNavigator({
  Transaction: { screen: TransactionScreen },
  Search: { screen: SearchScreen },
});

 defaultNavigationOptions :({navigation})=>{{
    tabBarIcon:({})=>{
      const routeName = navigation.state.routeName
      if(routeName === "Transaction") {
        return(
          <Image 
          source={require('./assets/dictionary.png')} 
          style={{width:40,height:40}}/>
        )
      }
      if(routeName === "Search"){
        return(
          //https://www.shareicon.net/data/128x128/2015/09/22/644455_question_512x512.png
          <Image
            source={require('./assets/question.png')} 
            style={{width:40,height:40}}/>
          )
      }
    }
 }}


 const switchNavigator = createSwitchNavigator({
  LoginScreen: { screen: LoginScreen },
  TabNavigator: { screen: TabNavigator },
});

const AppContainer = createAppContainer(switchNavigator);

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/
