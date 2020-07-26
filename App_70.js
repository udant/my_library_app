/*import React from 'react';
import Ionicons from "react-native-vector-icons/Ionicons";
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TransactionScreen from './screens/BookTransactionScreen';
import SearchScreen from './screens/SearchScreen';

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


const AppContainer = createAppContainer(TabNavigator);

/*const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});*/

