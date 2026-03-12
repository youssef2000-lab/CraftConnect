import { createSlice } from '@reduxjs/toolkit';
import { initialNotifications } from '../data/mockData';

const initialState = {
  notifications: initialNotifications,
};

const notificationSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    addNotification: (state, action) => {
      const { userId, type, title, message } = action.payload;
      
      const newNotification = {
        id: state.notifications.length + 1,
        userId,
        type,
        title,
        message,
        lu: false,
        date: new Date().toISOString(),
      };
      
      state.notifications.unshift(newNotification);
    },
    
    markAsRead: (state, action) => {
      const notificationId = action.payload;
      const notification = state.notifications.find(n => n.id === notificationId);
      
      if (notification) {
        notification.lu = true;
      }
    },
    
    markAllAsRead: (state, action) => {
      const userId = action.payload;
      const userNotifications = state.notifications.filter(n => n.userId === userId);
      
      userNotifications.forEach(n => {
        n.lu = true;
      });
    },
    
    deleteNotification: (state, action) => {
      const notificationId = action.payload;
      state.notifications = state.notifications.filter(n => n.id !== notificationId);
    },
    
    clearAllNotifications: (state, action) => {
      const userId = action.payload;
      state.notifications = state.notifications.filter(n => n.userId !== userId);
    },
  },
});

export const { 
  addNotification, 
  markAsRead, 
  markAllAsRead, 
  deleteNotification,
  clearAllNotifications 
} = notificationSlice.actions;

// Selectors
export const selectNotificationsByUserId = (state, userId) => 
  state.notifications.notifications
    .filter(n => n.userId === userId)
    .sort((a, b) => new Date(b.date) - new Date(a.date));

export const selectUnreadCountByUserId = (state, userId) => 
  state.notifications.notifications.filter(n => n.userId === userId && !n.lu).length;

export default notificationSlice.reducer;


