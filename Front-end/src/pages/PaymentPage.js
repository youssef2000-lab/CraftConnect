import React from 'react';
import Card from '../components/common/Card';
import Button from '../components/common/Button';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './ServicesPage.css'; 

const PaymentPage = () => {
  const navigate = useNavigate();
  const currentUser = useSelector((state) => state.auth.currentUser);

  const handlePayment = () => {
    alert('✅ Payment completed successfully! Order confirmed.');
    navigate('/orders');
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <Card className="shadow-lg">
            <div className="card-body text-center p-5">
              <i className="bi bi-credit-card-2-front display-1 text-primary mb-4"></i>
              <h2 className="card-title fw-bold mb-4">Complete Your Payment</h2>
              <p className="lead mb-5">Ready to secure your service?</p>
              <div className="mb-4">
                <h4>Order Summary</h4>
                <p className="text-muted">Service with {currentUser ? currentUser.nomComplet : 'User'}</p>
              </div>
              <Button 
                variant="primary" 
                size="lg" 
                className="px-5 me-3"
                onClick={handlePayment}
              >
                <i className="bi bi-lock-fill me-2"></i>
                Pay Now Securely
              </Button>
              <Button 
                variant="outline-secondary" 
                size="lg"
                onClick={() => navigate('/orders')}
              >
                Back to Orders
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
