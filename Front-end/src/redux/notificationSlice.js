import { createSlice, nanoid } from '@reduxjs/toolkit';

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null
  },
  reducers: {
    setNotifications: (state, action) => {
      state.notifications = action.payload || [];
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },
    addNotification: (state, action) => {
      const newNotif = {
        id: nanoid(),
        ...action.payload,
        read: false,
        createdAt: new Date().toISOString()
      };
      state.notifications.unshift(newNotif);
      state.unreadCount += 1;
    },
    markAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification && !notification.read) {
        notification.read = true;
        state.unreadCount -= 1;
      }
    },
    markAllAsRead: (state, action) => {
      const userId = action.payload;
      state.notifications.forEach(n => {
        if (n.userId === userId && !n.read) {
          n.read = true;
        }
      });
      state.unreadCount = state.notifications.filter(n => !n.read).length;
    },
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    }
  }
});

// SAFE SELECTOR
export const selectNotificationsByUserId = (state, userId) => 
  state.notifications.notifications?.filter(n => n.userId === userId) || [];

export const { setNotifications, addNotification, markAsRead, markAllAsRead, setLoading } = notificationSlice.actions;

export default notificationSlice.reducer;

