
"use client";
import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commonReducer from "./Features/CommonSlice";
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['rowPerPage', 'userDetails']
};

const persistedReducer = persistReducer(persistConfig, commonReducer);

const rootReducer = combineReducers({
  common: persistedReducer,
  //add all your reducers here
});


export const store = configureStore({
  reducer: rootReducer,
});

export const persistor = persistStore(store); // Create a separate persistor instance