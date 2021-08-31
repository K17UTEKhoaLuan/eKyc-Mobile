import React from 'react';
import Routes from './src/routes';
import { NativeBaseProvider } from 'native-base';
import { store } from './app/store'
import { Provider } from 'react-redux'

const App = () => {

  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <Routes />
      </NativeBaseProvider>
    </Provider>
  );
};

export default App;
