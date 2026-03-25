import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import serviceReducer from './serviceSlice';
import orderReducer from './orderSlice';
import chatReducer from './chatSlice';
import reviewReducer from './reviewSlice';
import artisanReducer from './artisanSlice';
import requestReducer from './requestSlice';
// Removed messageReducer - using chatSlice
import notificationReducer from './notificationSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    services: serviceReducer,
    orders: orderReducer,
    chat: chatReducer,
    reviews: reviewReducer,
    artisans: artisanReducer,
    requests: requestReducer,
    // messages: messageReducer,  // Removed
    notifications: notificationReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export default store;

