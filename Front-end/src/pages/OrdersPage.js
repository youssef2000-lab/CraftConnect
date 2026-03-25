import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { selectAllOrders, setOrdersLoading } from '../redux/orderSlice';
import './OrdersPage.css';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector(state => state.auth);
  const orders = useSelector(selectAllOrders);
  const loading = useSelector(state => state.orders.loading);
  
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('my-orders');
  
  useEffect(() => {
    dispatch(setOrdersLoading(true));
    setTimeout(() => dispatch(setOrdersLoading(false)), 300);
  }, [dispatch]);

  const filteredOrders = orders.filter(order => {
    if (statusFilter === 'all') return true;
    return order.status === statusFilter;
  });

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { label: 'En attente', class: 'bg-warning text-dark' },
      accepted: { label: 'Accepté', class: 'bg-success text-white' },
      'in-progress': { label: 'En cours', class: 'bg-info text-dark' },
      completed: { label: 'Terminé', class: 'bg-primary text-white' },
      cancelled: { label: 'Annulé', class: 'bg-danger text-white' }
    };
    const config = statusConfig[status] || statusConfig.pending;
    return <span className={`badge px-3 py-2 fw-semibold rounded-pill ${config.class}`}>{config.label}</span>;
  };

  const orderStats = {
    pending: orders.filter(o => o.status === 'pending').length,
    accepted: orders.filter(o => o.status === 'accepted').length,
    completed: orders.filter(o => o.status === 'completed').length
  };

  return (
    <div className="orders-page py-5">
      <div className="container">
        {/* Header */}
        <div className="text-center mb-5">
          <h1 className="mb-3">
            <i className="bi bi-receipt text-primary me-3"></i>
            Mes commandes
          </h1>
          <p className="lead text-muted">
            Suivez l'état de vos commandes et gérez vos projets
          </p>
        </div>

        {/* Stats */}
        <div className="row g-4 mb-5">
          <div className="col-md-4">
            <Card shadow="large">
              <div className="text-center p-4">
                <div className="display-4 text-warning mb-2">
                  {orderStats.pending}
                </div>
                <div className="h6 fw-bold text-muted mb-1">En attente</div>
              </div>
            </Card>
          </div>
          <div className="col-md-4">
            <Card shadow="large">
              <div className="text-center p-4">
                <div className="display-4 text-success mb-2">
                  {orderStats.accepted}
                </div>
                <div className="h6 fw-bold text-muted mb-1">Acceptées</div>
              </div>
            </Card>
          </div>
          <div className="col-md-4">
            <Card shadow="large">
              <div className="text-center p-4">
                <div className="display-4 text-primary mb-2">
                  {orderStats.completed}
                </div>
                <div className="h6 fw-bold text-muted mb-1">Terminées</div>
              </div>
            </Card>
          </div>
        </div>

        {/* Tabs */}
        <div className="d-flex gap-3 mb-4 flex-wrap">
          <Button 
            variant={activeTab === 'my-orders' ? 'primary' : 'outline-primary'}
            size="lg"
            onClick={() => setActiveTab('my-orders')}
            className="flex-grow-1 flex-grow-sm-0"
          >
            <i className="bi bi-list-ul me-2"></i>
            Mes commandes
          </Button>
          {currentUser?.typeCompte === 'Artisan' && (
            <Button 
              variant={activeTab === 'received-orders' ? 'primary' : 'outline-primary'}
              size="lg"
              onClick={() => setActiveTab('received-orders')}
              className="flex-grow-1 flex-grow-sm-0"
            >
              <i className="bi bi-inbox me-2"></i>
              Commandes reçues
            </Button>
          )}
        </div>

        {/* Orders List */}
        <div className="row g-4">
          {filteredOrders.map((order) => (
            <div key={order.id} className="col-xl-4 col-lg-6 col-md-12">
              <Card hover clickable shadow="normal" className="h-100">
                <div className="p-4">
                  <div className="d-flex justify-content-between align-items-start mb-3">
                    <h6 className="fw-bold mb-2">{order.service}</h6>
                    {getStatusBadge(order.status)}
                  </div>
                  
                  <p className="text-muted mb-3 lh-lg">
                    {order.description}
                  </p>
                  
                  <div className="meta-info mb-4">
                    <div className="row g-3">
                      <div className="col-6">
                        <small className="text-muted">Artisan:</small>
                        <div className="fw-medium">{order.artisanName}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Ville:</small>
                        <div>{order.ville}</div>
                      </div>
                      <div className="col-6">
                        <small className="text-muted">Date:</small>
                        <div>{order.datePreferee || order.dateCreation}</div>
                      </div>
                      {order.completedAt && (
                        <div className="col-6">
                          <small className="text-muted">Terminé:</small>
                          <div className="text-success fw-medium">{order.completedAt}</div>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="d-grid gap-2">
                    {order.status === 'pending' && currentUser.typeCompte === 'Artisan' && (
                      <>
                        <Button variant="success" size="sm">
                          <i className="bi bi-check-circle me-2"></i>
                          Accepter
                        </Button>
                        <Button variant="outline-danger" size="sm">
                          <i className="bi bi-x-circle me-2"></i>
                          Refuser
                        </Button>
                      </>
                    )}
                    {order.status === 'accepted' && currentUser.typeCompte === 'Artisan' && (
                      <Button variant="primary" size="sm">
                        <i className="bi bi-check-circle me-2"></i>
                        Marquer terminé
                      </Button>
                    )}
                    {['accepted', 'completed'].includes(order.status) && (
                      <Link to={`/messages/${order.id}`} className="btn btn-outline-primary btn-sm">
                        <i className="bi bi-chat-dots me-2"></i>
                        Contacter artisan
                      </Link>
                    )}
                    {order.status === 'completed' && (
                      <Link to="/reviews" className="btn btn-outline-warning btn-sm">
                        <i className="bi bi-star me-2"></i>
                        Laisser un avis
                      </Link>
                    )}
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>

        {filteredOrders.length === 0 && !loading && (
          <div className="text-center py-5 my-5">
            <i className="bi bi-receipt-cutoff display-1 text-muted mb-4"></i>
            <h3 className="mb-3">Aucune commande</h3>
            <p className="text-muted lead">
              Vous n'avez pas encore de commandes {activeTab === 'received-orders' ? 'reçues' : ''}
            </p>
            <Button variant="primary" size="lg">
              <i className="bi bi-plus-circle me-2"></i>
              Passer une commande
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;

