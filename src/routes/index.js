import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage';
import CameraPage from '../pages/CameraPage';
import InfoPage from '../pages/InfoPage';

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
    },
    {
      name: 'Infomation',
      component: InfoPage
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