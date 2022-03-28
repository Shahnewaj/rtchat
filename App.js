import React from 'react'
import AppNavigator from './src/navigation/AppNavigator';
import { PersistGate } from 'redux-persist/integration/react'
import { Provider } from 'react-redux';
import { store, persistor } from './src/store';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppNavigator />
      </PersistGate>
    </Provider>
  )
}

export default App