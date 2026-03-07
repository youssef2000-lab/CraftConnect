import { createSlice } from '@reduxjs/toolkit';
import users from '../../data/data';


const initialState = {
  users: users,
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
        typeCompte
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
    }
  }
});

export const { registerUser, loginUser, logoutUser, clearError } = authSlice.actions;

export default authSlice.reducer;

