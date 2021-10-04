import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import HomePage from '../pages/HomePage';
import CameraPage from '../pages/CameraPage';
import RecordPage from '../pages/RecordPage';
import InfoPage from '../pages/InfoPage';
import IdentifyCardPage from '../pages/IdentifyCard';
import FaceComparePage from '../pages/FaceComparePage';
import ResultPage from '../pages/ResultPage';
import QRScan from '../pages/QRScan';

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
    },
    {
      name: 'IdentifyCard',
      component: IdentifyCardPage
    },
    {
      name: 'RecordPage',
      component: RecordPage
    },
    {
      name: 'FaceComparePage',
      component: FaceComparePage
    },
    {
      name: 'ResultPage',
      component: ResultPage
    },
    {
      name: 'QRScan',
      component: QRScan
    },

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