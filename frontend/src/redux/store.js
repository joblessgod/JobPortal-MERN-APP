import { combineReducers,configureStore} from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage'
import userReducer from './user/userSlice';
import joblistsReducer from './joblist/joblistSlice';
import {persistReducer} from 'redux-persist';
import persistStore from 'redux-persist/es/persistStore';
const rootReducer = combineReducers({user:userReducer,joblists: joblistsReducer,});
const persistConfig = {
  key:'root',
  storage,
  version:1,
}
const persistedReducer = persistReducer(persistConfig,rootReducer);
export const store =  configureStore({
  reducer: persistedReducer,
  middleware:(getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck:false,
  }),
});
export const persistor = persistStore(store);