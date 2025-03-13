import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
  favorites: [],
  notifications: [],
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.favorites = [];
      state.notifications = [];
    },
    toggleFavorite: (state, action) => {
      const bookId = action.payload;
      const index = state.favorites.indexOf(bookId);
      if (index === -1) {
        state.favorites.push(bookId);
      } else {
        state.favorites.splice(index, 1);
      }
    },
    addNotification: (state, action) => {
      state.notifications.unshift({
        id: Date.now(),
        ...action.payload,
        isRead: false,
      });
    },
    markNotificationAsRead: (state, action) => {
      const notification = state.notifications.find(n => n.id === action.payload);
      if (notification) {
        notification.isRead = true;
      }
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
  },
});

export const { 
  login, 
  logout, 
  toggleFavorite, 
  addNotification, 
  markNotificationAsRead, 
  clearNotifications 
} = userSlice.actions;

export default userSlice.reducer; 