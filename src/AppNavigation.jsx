import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import { HomeScreen } from './screens'

const AppStack = createNativeStackNavigator()

function AppNavigation() {
  return (
    <NavigationContainer>
      <AppStack.Navigator>
        <AppStack.Screen 
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
      </AppStack.Navigator>
    </NavigationContainer>
  )
}

export default AppNavigation