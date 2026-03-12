import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import artisanReducer from './artisanSlice';
import requestReducer from './requestSlice';
import notificationReducer from './notificationSlice';
import messageReducer from './messageSlice';
import favoritesReducer from './favoritesSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    artisans: artisanReducer,
    requests: requestReducer,
    notifications: notificationReducer,
    messages: messageReducer,
    favorites: favoritesReducer,
  },
});

export default store;


