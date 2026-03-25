import { createSlice, createEntityAdapter } from '@reduxjs/toolkit';
import { artisans, categories } from '../data/mockData.js';

const servicesAdapter = createEntityAdapter({
  selectId: (service) => service.id
});

const initialServices = artisans.map(artisan => ({
  id: `service-${artisan.id}`,
  artisanId: artisan.id,
  artisanName: artisan.nomComplet,
  title: artisan.profession,
  description: artisan.description,
  price: artisan.tarifHoraire,
  category: artisan.profession,
  image: artisan.photo,
  rating: artisan.note,
  reviewsCount: artisan.nombreAvis,
  available: artisan.disponible,
  verified: artisan.verifie
}));

const initialState = servicesAdapter.getInitialState({
  entities: initialServices,
  categories: categories,
  activeFilters: {
    search: '',
    category: '',
    city: ''
  },
  loading: false
});

const serviceSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setFilters: (state, action) => {
      state.activeFilters = { ...state.activeFilters, ...action.payload };
    },
    clearFilters: (state) => {
      state.activeFilters = { search: '', category: '', city: '' };
    },
    addService: (state, action) => {
      const service = action.payload;
      servicesAdapter.addOne(state, service);
    },
    updateService: (state, action) => {
      const service = action.payload;
      servicesAdapter.updateOne(state, { id: service.id, changes: service });
    },
    deleteService: (state, action) => {
      servicesAdapter.removeOne(state, action.payload);
    },
    setServicesLoading: (state, action) => {
      state.loading = action.payload;
    }
  }
});

export const {
  setFilters,
  clearFilters,
  addService,
  updateService,
  deleteService,
  setServicesLoading
} = serviceSlice.actions;

export const {
  selectById: selectServiceById,
  selectAll: selectAllServices,
  selectEntities: selectServicesEntities
} = servicesAdapter.getSelectors();

export default serviceSlice.reducer;

