import React from 'react';
import Button from './Button';
import './Modal.css';

const Modal = ({ 
  isOpen, 
  onClose, 
  title, 
  children, 
  footer, 
  size = 'md',
  className = '' 
}) => {
  if (!isOpen) return null;

  const sizeClasses = {
    sm: 'modal-dialog modal-sm',
    md: 'modal-dialog',
    lg: 'modal-dialog modal-lg',
    xl: 'modal-dialog modal-xl'
  };

  return (
    <div className="modal fade show d-block" style={{backgroundColor: 'rgba(0,0,0,0.5)'}} tabIndex="-1" onClick={onClose}>
      <div className={`modal-dialog ${sizeClasses[size]} ${className}`} onClick={(e) => e.stopPropagation()}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">{title}</h5>
            <Button 
              variant="outline-secondary" 
              size="sm" 
              iconLeft="x-lg"
              onClick={onClose}
            >
              Close
            </Button>
          </div>
          <div className="modal-body">
            {children}
          </div>
          {footer && (
            <div className="modal-footer">
              {footer}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Modal;
