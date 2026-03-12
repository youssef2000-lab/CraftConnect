import { createSlice } from '@reduxjs/toolkit';
import { artisans as mockArtisans, reviews as mockReviews } from '../data/mockData';

const initialState = {
  artisans: mockArtisans,
  reviews: mockReviews,
  selectedArtisan: null,
  filters: {
    search: '',
    profession: '',
    ville: '',
    noteMin: 0,
    disponible: null,
  },
};

const artisanSlice = createSlice({
  name: 'artisans',
  initialState,
  reducers: {
    setSelectedArtisan: (state, action) => {
      const artisanId = action.payload;
      state.selectedArtisan = state.artisans.find(a => a.id === artisanId) || null;
    },
    
    clearSelectedArtisan: (state) => {
      state.selectedArtisan = null;
    },
    
    addReview: (state, action) => {
      const { artisanId, clientId, clientName, note, commentaire } = action.payload;
      
      const newReview = {
        id: state.reviews.length + 1,
        artisanId,
        clientId,
        clientName,
        note,
        commentaire,
        date: new Date().toISOString().split('T')[0],
      };
      
      state.reviews.push(newReview);
      
      // Update artisan's rating
      const artisan = state.artisans.find(a => a.id === artisanId);
      if (artisan) {
        const artisanReviews = state.reviews.filter(r => r.artisanId === artisanId);
        const totalRating = artisanReviews.reduce((sum, r) => sum + r.note, 0);
        artisan.note = Math.round((totalRating / artisanReviews.length) * 10) / 10;
        artisan.nombreAvis = artisanReviews.length;
      }
    },
    
    updateArtisanProfile: (state, action) => {
      const { id, ...updates } = action.payload;
      const artisanIndex = state.artisans.findIndex(a => a.id === id);
      
      if (artisanIndex !== -1) {
        state.artisans[artisanIndex] = {
          ...state.artisans[artisanIndex],
          ...updates,
        };
        
        if (state.selectedArtisan && state.selectedArtisan.id === id) {
          state.selectedArtisan = state.artisans[artisanIndex];
        }
      }
    },
    
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    
    clearFilters: (state) => {
      state.filters = {
        search: '',
        profession: '',
        ville: '',
        noteMin: 0,
        disponible: null,
      };
    },
  },
});

export const { 
  setSelectedArtisan, 
  clearSelectedArtisan,
  addReview,
  updateArtisanProfile,
  setFilters,
  clearFilters,
} = artisanSlice.actions;

// Selectors
export const selectArtisanById = (state, id) => 
  state.artisans.artisans.find(a => a.id === parseInt(id));

export const selectReviewsByArtisanId = (state, artisanId) => 
  state.artisans.reviews.filter(r => r.artisanId === artisanId);

// Filtered artisans selector
export const selectFilteredArtisans = (state) => {
  const { artisans, filters } = state.artisans;
  
  return artisans.filter(artisan => {
    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      const matchesSearch = 
        artisan.nomComplet?.toLowerCase().includes(searchLower) ||
        artisan.profession?.toLowerCase().includes(searchLower) ||
        artisan.ville?.toLowerCase().includes(searchLower) ||
        artisan.description?.toLowerCase().includes(searchLower);
      if (!matchesSearch) return false;
    }
    
    // Profession filter
    if (filters.profession && artisan.profession !== filters.profession) {
      return false;
    }
    
    // Ville filter
    if (filters.ville && artisan.ville !== filters.ville) {
      return false;
    }
    
    // Note minimum filter
    if (filters.noteMin && artisan.note < filters.noteMin) {
      return false;
    }
    
    // Disponibility filter
    if (filters.disponible !== null && artisan.disponible !== filters.disponible) {
      return false;
    }
    
    return true;
  });
};

export default artisanSlice.reducer;

