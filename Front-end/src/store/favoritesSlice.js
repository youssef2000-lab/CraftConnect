import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: [],
};

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addFavorite: (state, action) => {
      const artisanId = action.payload;
      if (!state.favorites.includes(artisanId)) {
        state.favorites.push(artisanId);
      }
    },
    
    removeFavorite: (state, action) => {
      const artisanId = action.payload;
      state.favorites = state.favorites.filter(id => id !== artisanId);
    },
    
    clearFavorites: (state) => {
      state.favorites = [];
    },
  },
});

export const { 
  addFavorite, 
  removeFavorite, 
  clearFavorites 
} = favoritesSlice.actions;

// Selectors
export const selectFavorites = (state) => state.favorites.favorites;

export const selectIsFavorite = (artisanId) => (state) => 
  state.favorites.favorites.includes(artisanId);

export default favoritesSlice.reducer;


