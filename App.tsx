import React from 'react';
import { Provider } from 'react-redux';
import { persistor, store } from './src/redux/store';
import AppNavigator from './src/navigation/AppNavigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PersistGate } from 'redux-persist/integration/react';

const App = () => {
  return (
        <SafeAreaProvider>
    <Provider store={store}>
       <PersistGate loading={null} persistor={persistor}>
      <AppNavigator />
      </PersistGate>
    </Provider>
    </SafeAreaProvider>
  );
};

export default App;