import React from 'react';
import Routes from './src/routes';
import { NativeBaseProvider } from 'native-base';

const App = () => {
  
  return (
    <NativeBaseProvider>
      <Routes />
    </NativeBaseProvider>
  );
};

export default App;
