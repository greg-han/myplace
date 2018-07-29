import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2'

import allReducers from './reducers/allReducers'

const persistConfig = {
  key : 'root',
  storage : storage,
  stateReconciler : autoMergeLevel2
}

const persistedReducer = persistReducer(persistConfig, allReducers)

export const store = createStore(persistedReducer)
export const persistor = persistStore(store)

