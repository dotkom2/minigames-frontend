import { StatusBar, StyleSheet, Text, View } from 'react-native'
import React, { useEffect, useState, useCallback } from 'react'
import SplashScreen from 'react-native-splash-screen';
import { colors, width } from './src/utilities';
import AdmobInterstitial from './src/components/AdmobInterstitial';

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Screen imports
import HomePageScreen from './src/screens/HomePageScreen';
import HighScorePageScreen from './src/screens/HighScorePageScreen';
import WebViewScreen from './src/screens/WebViewScreen';
import YourGameScore from './src/screens/YourGameScore';
import AddDetails from './src/screens/AddDetails';
import Test from './src/screens/Test';
import mobileAds from 'react-native-google-mobile-ads';

mobileAds()
  .initialize()
  .then(adapterStatuses => {
    // Initialization complete!
    console.log('Initialization complete!')
  });


const Stack = createNativeStackNavigator();

const App = () => {


  useEffect(() => {
    if (Platform.OS === 'android') {
      setTimeout(() => SplashScreen.hide(), 2000);
    }
  }, []);



  return (
    <NavigationContainer >
      <Stack.Navigator
        screenOptions={{ title: "Minigames", headerShown: false }}
        initialRouteName="HomePage"
      >
        {/* <Stack.Screen name="test" component={Test} /> */}
        <Stack.Screen name="HomePage" component={HomePageScreen} />
        <Stack.Screen name="HighScorePage" component={HighScorePageScreen} />
        <Stack.Screen name="YourGameScore" component={YourGameScore} />
        <Stack.Screen name="AddDetails" component={AddDetails} />

        <Stack.Screen name="WebView" component={WebViewScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App

const styles = StyleSheet.create({})