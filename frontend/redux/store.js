import combinedReducers from './rootReducer';
import { configureStore } from '@reduxjs/toolkit';
import { createWrapper } from 'next-redux-wrapper';



const isDev = process.env.NODE_ENV === 'development';

const makeStore = () => {
  let middleware = [];

  return configureStore({
    reducer: combinedReducers,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
    devTools: isDev,
    preloadedState: undefined,
  });
};

export const wrapper = createWrapper(makeStore, { debug: true });
