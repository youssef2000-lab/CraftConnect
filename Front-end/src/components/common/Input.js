import React from 'react';
import './Input.css';

const Input = ({ 
  label, 
  id, 
  type = 'text', 
  placeholder, 
  className = '', 
  error, 
  iconLeft, 
  iconRight,
  ...props 
}) => {
  return (
    <div className={`form-floating mb-3 ${className}`}>
      <input
        id={id}
        type={type}
        className={`form-control ${error ? 'is-invalid' : ''}`}
        placeholder={placeholder}
        {...props}
      />
      <label htmlFor={id} className="form-label">
        {label}
      </label>
      {error && (
        <div className="invalid-feedback">
          {error}
        </div>
      )}
    </div>
  );
};

export default Input;
