import { createSlice, nanoid } from '@reduxjs/toolkit';

const artisanSlice = createSlice({
  name: 'artisan',
  initialState: {
    artisans: [],
    currentArtisan: null,
    reviews: [],
    filters: {
      search: '',
      profession: '',
      ville: ''
    },
    loading: false,
    error: null
  },
  reducers: {
    setArtisans: (state, action) => {
      state.artisans = action.payload || [];
    },
    setCurrentArtisan: (state, action) => {
      state.currentArtisan = action.payload || null;
    },
    setLoading: (state, action) => {
      state.loading = !!action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload || null;
    },
    // NEW: Filters
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = { search: '', profession: '', ville: '' };
    },
    // NEW: Reviews
    addReview: (state, action) => {
      const newReview = {
        id: nanoid(),
        ...action.payload,
        date: new Date().toISOString().split('T')[0]
      };
      state.reviews.unshift(newReview);
    }
  }
});

// SAFE SELECTORS (always safe values)
export const selectArtisanById = (state, id) => 
  state.artisans.artisans?.find(a => a.id === id) || null;

export const selectReviewsByArtisanId = (state, id) => 
  state.artisans.reviews?.filter(r => r.artisanId === id) || [];

export const selectFilteredArtisans = (state) => {
  const { artisans, filters } = state.artisans;
  if (!artisans?.length) return [];
  
  return artisans.filter(artisan => {
    const matchesSearch = !filters.search || 
      artisan.nomComplet?.toLowerCase().includes(filters.search.toLowerCase()) ||
      artisan.profession?.toLowerCase().includes(filters.search.toLowerCase());
    const matchesProfession = !filters.profession || artisan.profession === filters.profession;
    const matchesVille = !filters.ville || artisan.ville === filters.ville;
    return matchesSearch && matchesProfession && matchesVille;
  });
};

export const { 
  setArtisans, setCurrentArtisan, setLoading, setError,
  setFilters, clearFilters, addReview 
} = artisanSlice.actions;

export default artisanSlice.reducer;

