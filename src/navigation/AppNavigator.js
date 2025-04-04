import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { NavigationContainer } from '@react-navigation/native'
import { View, ActivityIndicator } from 'react-native'

//import screens
import HomeScreen from '../screens/HomeScreen'
import CampusMapScreen from '../screens/CampusMapScreen'
import WebViewScreen from '../screens/WebViewScreen' // Ensure this file exists
import EmailScreen from '../screens/EmailScreen'
import TflTimeScreen from '../screens/TflTimeScreen'
import StopDetailScreen from '../screens/StopDetailScreen'
import LoginScreen from '../screens/LoginScreen'
import CalendarScreen from '../screens/CalendarScreen';

import { useAppContext } from '../context/AppContext'

//stack nav for screen2screen navigation
const Stack = createStackNavigator()

export default function AppNavigator() {
  //access user login state + loading indicator from gloval context
  const { user, loadingUser } = useAppContext()

  //show loading spinner if figuiring out if user is logged in
  if (loadingUser) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#257f66" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          gestureEnabled: true,
        }}
      >
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} />
            <Stack.Screen name="CampusMap" component={CampusMapScreen} />
            <Stack.Screen name="EmailScreen" component={EmailScreen} />
            <Stack.Screen name="TflTimeScreen" component={TflTimeScreen} />
            <Stack.Screen name="StopDetailScreen" component={StopDetailScreen} />
            <Stack.Screen name="Timetable" component={CalendarScreen} />
            <Stack.Screen 
              name="WebView" 
              component={WebViewScreen} 
              initialParams={{ url: 'https://www.gold.ac.uk' }} 
            />
          </>
        ) : (
          //user must be logged in to access other screens
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  )
}
