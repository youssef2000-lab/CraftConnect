import { createSlice } from '@reduxjs/toolkit';
import { users as mockUsers } from '../data/mockData';

const initialState = {
  users: mockUsers,
  currentUser: null,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    
    registerUser: (state, action) => {
      const { nomComplet, email, motDePasse, typeCompte } = action.payload;
      
      const existingUser = state.users.find(user => user.email === email);
      
      if (existingUser) {
        state.error = 'Cet email est déjà utilisé';
        return;
      }
      
      const newUser = {
        id: state.users.length + 1,
        nomComplet,
        email,
        motDePasse,
        typeCompte,
        telephone: '',
        ville: '',
        favorites: [],
        dateCreation: new Date().toISOString().split('T')[0],
      };
      
      state.users.push(newUser);
      state.currentUser = newUser;
      state.error = null;
    },
    
    loginUser: (state, action) => {
      const { email, motDePasse } = action.payload;
      
      const user = state.users.find(
        u => u.email === email && u.motDePasse === motDePasse
      );
      
      if (user) {
        state.currentUser = user;
        state.error = null;
      } else {
        state.error = 'Email ou mot de passe incorrect';
      }
    },
    
    logoutUser: (state) => {
      state.currentUser = null;
      state.error = null;
    },
    
    clearError: (state) => {
      state.error = null;
    },
    
    updateProfile: (state, action) => {
      const { nomComplet, telephone, ville } = action.payload;
      
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          nomComplet: nomComplet || state.currentUser.nomComplet,
          telephone: telephone || state.currentUser.telephone,
          ville: ville || state.currentUser.ville,
        };
        
        // Also update in users array
        const userIndex = state.users.findIndex(u => u.id === state.currentUser.id);
        if (userIndex !== -1) {
          state.users[userIndex] = state.currentUser;
        }
      }
    },
    
    deleteUser: (state, action) => {
      const userId = action.payload;
      state.users = state.users.filter(user => user.id !== userId);
      
      // If the deleted user is the current user, log them out
      if (state.currentUser && state.currentUser.id === userId) {
        state.currentUser = null;
      }
    },
    
    addToFavorites: (state, action) => {
      const artisanId = action.payload;
      
      if (state.currentUser) {
        if (!state.currentUser.favorites) {
          state.currentUser.favorites = [];
        }
        
        if (!state.currentUser.favorites.includes(artisanId)) {
          state.currentUser.favorites.push(artisanId);
          
          // Also update in users array
          const userIndex = state.users.findIndex(u => u.id === state.currentUser.id);
          if (userIndex !== -1) {
            state.users[userIndex].favorites = state.currentUser.favorites;
          }
        }
      }
    },
    
    removeFromFavorites: (state, action) => {
      const artisanId = action.payload;
      
      if (state.currentUser && state.currentUser.favorites) {
        state.currentUser.favorites = state.currentUser.favorites.filter(id => id !== artisanId);
        
        // Also update in users array
        const userIndex = state.users.findIndex(u => u.id === state.currentUser.id);
        if (userIndex !== -1) {
          state.users[userIndex].favorites = state.currentUser.favorites;
        }
      }
    },
  }
});

export const { 
  registerUser, 
  loginUser, 
  logoutUser, 
  clearError,
  updateProfile,
  deleteUser,
  addToFavorites,
  removeFromFavorites
} = authSlice.actions;

export default authSlice.reducer;


