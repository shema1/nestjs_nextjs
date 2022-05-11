// create a makeStore function
import { MakeStore } from "next-redux-wrapper";
import { Store } from "redux";
import { rootReducer, RootState } from "./reducers";
import logger from "redux-logger";
import { configureStore } from '@reduxjs/toolkit'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import { useMemo } from "react";

let store;

const persistConfig = {
  key: 'primary',
  storage,
  whitelist: ['auth'], // place to select which state you want to persist
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const makeStore: MakeStore<Store<RootState>>
  = () => {
    return configureStore({
      reducer: persistedReducer,
      middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }).concat(logger),
      devTools: process.env.NODE_ENV !== 'production',
      preloadedState: {}
    })
  };

export const initializeStore = (preloadedState) => {
  let _store = store ?? makeStore(preloadedState)

  // After navigating to a page with an initial Redux state, merge that state
  // with the current state in the store, and create a new store
  if (preloadedState && store) {
    _store = makeStore({
      ...store.getState(),
      ...preloadedState,
    })
    // Reset the current store
    store = undefined
  }

  // For SSG and SSR always create a new store
  if (typeof window === 'undefined') return _store
  // Create the store once in the client
  if (!store) store = _store

  return _store
}

export function useStore(initialState) {
  const store = useMemo(() => initializeStore(initialState), [initialState])
  return store
}


// // export an assembled wrapper
// export const wrapper = createWrapper<Store<RootState>>(makeStore, { debug: true });

// export type NextThunkDispatch = ThunkDispatch<RootState, void, AnyAction>

