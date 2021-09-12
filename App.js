import React from 'react';
import Routes from './src/routes';
import { NativeBaseProvider } from 'native-base';
import { store } from './src/store';
import { Provider } from 'react-redux'
import { LogBox } from 'react-native';

const App = () => {

  LogBox.ignoreAllLogs();
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
