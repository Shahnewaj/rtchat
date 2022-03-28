import { persistStore, persistReducer } from 'redux-persist'
import thunk from 'redux-thunk';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducer'

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 0,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

let store = createStore(persistedReducer, {}, composeWithDevTools(applyMiddleware(thunk)));
let persistor = persistStore(store)

export { store, persistor }


