import { createSlice } from '@reduxjs/toolkit';
import { users as mockUsers } from '../data/mockData.js';

const initialState = {
  users: mockUsers,
  currentUser: null,
  error: null,
  loading: false
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    registerUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    registerUserSuccess: (state, action) => {
      const { nomComplet, email, motDePasse, typeCompte } = action.payload;
      
      const existingUser = state.users.find(user => user.email === email);
      
      if (existingUser) {
        state.error = 'Cet email est déjà utilisé';
        state.loading = false;
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
      state.loading = false;
    },
    registerUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
    },
    
    loginUserStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    loginUserSuccess: (state, action) => {
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
      state.loading = false;
    },
    loginUserFailure: (state, action) => {
      state.error = action.payload;
      state.loading = false;
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
    loginUser: (state, action) => {
      state.user = action.payload;
    },
    registerUser: (state, action) => {
      state.user = action.payload;
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
        state.users[userIndex].favorites = [...state.currentUser.favorites];
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

/* 
 registerUserStart,
registerUserSuccess,
registerUserFailure,
loginUserStart,
loginUserSuccess,
loginUserFailure,
logoutUser,
clearError,
updateProfile,
loginUser,
registerUser,
addToFavorites,
removeFromFavorites
*/

export const {
  registerUserStart,
  registerUserSuccess,
  registerUserFailure,
  loginUserStart,
  loginUserSuccess,
  loginUserFailure,
  logoutUser,
  clearError,
  updateProfile,
  loginUser,
  registerUser,
  addToFavorites,
  removeFromFavorites
} = authSlice.actions;

export default authSlice.reducer;

