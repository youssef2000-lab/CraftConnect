import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { setFilters, selectAllServices, setServicesLoading } from '../redux/serviceSlice';
import { categories } from '../data/mockData';
import './ServicesPage.css';

const ServicesPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const services = useSelector(selectAllServices);
  const filters = useSelector(state => state.services.activeFilters);
  const loading = useSelector(state => state.services.loading);
  
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  
  useEffect(() => {
    dispatch(setServicesLoading(true));
    // Simulate API delay
    setTimeout(() => dispatch(setServicesLoading(false)), 500);
  }, [dispatch]);

  const filteredServices = services.filter(service => {
    const matchesSearch = service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          service.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = !selectedCategory || service.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm, category: selectedCategory }));
  };

  const handleArtisanProfile = (artisanId) => {
    navigate(`/artisan/${artisanId}`);
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center min-vh-50">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Chargement...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="services-page py-5">
      <div className="container">
        {/* Page Header */}
        <div className="page-header text-center mb-5">
          <h1 className="page-title mb-3">
            Nos Services
          </h1>
          <p className="page-subtitle fs-5">
            Trouvez le service parfait pour votre projet parmi nos artisans qualifiés
          </p>
        </div>

        {/* Search & Filters */}
        <div className="row g-4 mb-5">
          <div className="col-lg-10 mx-auto">
            <form onSubmit={handleSearch} className="row g-3 align-items-end">
              <div className="col-md-6">
                <div className="input-group">
                  <span className="input-group-text bg-transparent border-end-0">
                    <i className="bi bi-search text-muted"></i>
                  </span>
                  <input
                    type="text"
                    className="form-control border-start-0 bg-transparent"
                    placeholder="Rechercher un service..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
              <div className="col-md-3">
                <select 
                  className="form-select bg-transparent border-0 shadow-none"
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                >
                  <option value="">Toutes catégories</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.name}>{cat.name}</option>
                  ))}
                </select>
              </div>
              <div className="col-md-3">
                <Button variant="primary" block type="submit">
                  <i className="bi bi-search me-2"></i>
                  Rechercher
                </Button>
              </div>
            </form>
          </div>
        </div>

        {/* Results Count */}
        <div className="row mb-5">
          <div className="col">
            <div className="d-flex justify-content-between align-items-center flex-wrap gap-3">
              <div>
                <span className="fw-bold fs-4 text-white">
                  {filteredServices.length} service{filteredServices.length !== 1 ? 's' : ''} trouvé{filteredServices.length !== 1 ? 's' : ''}
                </span>
              </div>
              <Button variant="outline-primary">
                <i className="bi bi-funnel me-2"></i>
                Filtres avancés
              </Button>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="row g-4">
          {filteredServices.map((service) => (
            <div key={service.id} className="col-lg-4 col-md-6">
              <Card hover className="h-100">
                <div className="position-relative">
                  <img 
                    src={service.image} 
                    alt={service.title}
                    className="card-img-top object-fit-cover h-200px rounded-top-3"
                  />
                  {service.available && (
                    <div className="position-absolute top-3 end-3">
                      <span className="badge badge-available rounded-pill px-3 py-2">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        Disponible
                      </span>
                    </div>
                  )}
                  {service.verified && (
                    <div className="position-absolute bottom-3 start-3">
                      <span className="badge badge-verified rounded-pill px-3 py-2">
                        <i className="bi bi-patch-check-fill me-1"></i>
                        Vérifié
                      </span>
                    </div>
                  )}
                </div>
                <Card.Body>
                  <div className="d-flex align-items-center justify-content-between mb-2">
                    <Card.Title>{service.title}</Card.Title>
                    <div className="rating-display">
                      <i className="bi bi-star-fill text-warning me-1"></i>
                      <span className="fw-semibold">{service.rating}</span>
                    </div>
                  </div>
                  <Card.Text className="mb-3 lh-lg">
                    {service.description.length > 120 
                      ? service.description.slice(0, 120) + '...' 
                      : service.description
                    }
                  </Card.Text>
                  <div className="meta-info mb-3">
                    <span className="meta-item">
                      <i className="bi bi-geo-alt me-1 text-muted"></i>
                      {service.artisanName}
                    </span>
                    <span className="meta-item">
                      <i className="bi bi-people me-1 text-muted"></i>
                      {service.reviewsCount} avis
                    </span>
                  </div>
                  <div className="d-flex gap-2">
                    <Button 
                      variant="primary" 
                      size="sm" 
                      className="flex-grow-1"
                      onClick={() => handleArtisanProfile(service.artisanId)}
                    >
                      Voir profil
                    </Button>
                    <Button 
                      variant="outline-primary" 
                      size="sm"
                      iconLeft="cart"
                    >
                      Commander
                    </Button>
                  </div>
                </Card.Body>
              </Card>
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredServices.length === 0 && !loading && (
          <div className="row justify-content-center mt-5">
            <div className="col-md-6 text-center py-5">
              <i className="bi bi-search display-1 text-muted mb-4"></i>
              <h3 className="mb-3">Aucun service trouvé</h3>
              <p className="text-muted mb-4">
                Essayez d'ajuster vos critères de recherche ou découvrez tous nos services
              </p>
              <div className="d-flex gap-2 justify-content-center flex-wrap">
                <Button 
                  variant="primary" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('');
                  }}
                >
                  Effacer filtres
                </Button>
                <Button variant="outline-primary">
                  Voir tous les services
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Load More */}
        {filteredServices.length > 0 && (
          <div className="row mt-5">
            <div className="col text-center">
              <Button variant="outline-primary" size="lg" className="px-5">
                <i className="bi bi-arrow-down me-2"></i>
                Charger plus
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ServicesPage;

