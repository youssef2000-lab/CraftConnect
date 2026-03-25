import React from 'react';
import { motion } from 'framer-motion';
import clsx from 'clsx';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  className = '',
  onClick,
  disabled = false,
  loading = false,
  block = false,
  iconLeft,
  iconRight,
  ...props
}) => {
  const baseClasses = 'btn fw-semibold transition-all position-relative overflow-hidden';
  const variantClasses = {
    primary: 'btn-primary shadow-sm',
    secondary: 'btn-secondary border-primary text-primary',
    success: 'btn-success',
    danger: 'btn-danger',
    outlinePrimary: 'btn-outline-primary',
    outlineSecondary: 'btn-outline-secondary',
  };

  const sizeClasses = {
    sm: 'py-2 px-3 fs-6',
    md: 'py-3 px-4 fs-5',
    lg: 'py-4 px-5 fs-4',
  };

  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    block && 'w-100',
    className
  );

  return (
    <motion.button
      className={classes}
      onClick={onClick}
      disabled={disabled || loading}
      aria-busy={loading}
      aria-disabled={disabled || loading}
      whileHover={!disabled && !loading ? { scale: 1.02, y: -2 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.98 } : {}}
      transition={{ duration: 0.2, ease: 'easeOut' }}
      {...props}
    >
      {loading ? (
        <>
          <span className="spinner-border spinner-border-sm me-2" role="status"></span>
          Chargement...
        </>
      ) : (
        <>
          {iconLeft && <span className="me-2">{iconLeft}</span>}
          {children}
          {iconRight && <span className="ms-2">{iconRight}</span>}
        </>
      )}
    </motion.button>
  );
};

export default Button;