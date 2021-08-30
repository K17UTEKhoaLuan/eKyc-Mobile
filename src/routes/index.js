import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage';
import CameraPage from '../pages/CameraPage';

const Stack = createNativeStackNavigator();

const Routes = () => {

  const routes = [
    {
      name: 'Home',
      component: HomePage
    },
    {
      name: 'Camera',
      component: CameraPage
    }
  ]

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {routes.map((route, index) => (
          <Stack.Screen key={index} {...route} />
        ))}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Routes;