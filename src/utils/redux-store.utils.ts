import { configureStore, ConfigureStoreOptions } from '@reduxjs/toolkit';
import { baseReducer } from '../hooks/redux/reducer';

const rootReducer = {
  ...baseReducer
};

const options: ConfigureStoreOptions = {
  reducer: rootReducer
};

const store = configureStore(options);


export type RootState = ReturnType<typeof store.getState>;
export default store;
