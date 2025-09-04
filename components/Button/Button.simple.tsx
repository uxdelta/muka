import React from 'react';

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
}

/**
 * Simple Button Component for testing
 */
export const SimpleButton: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}) => {
  const baseStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    border: 'none',
    cursor: disabled ? 'not-allowed' : 'pointer',
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    fontWeight: 600,
    textDecoration: 'none',
    transition: 'all 0.2s ease',
    opacity: disabled ? 0.6 : 1,
  };

  const variantStyles: Record<string, React.CSSProperties> = {
    primary: {
      backgroundColor: '#8d8d8d',
      color: '#ffffff',
    },
    secondary: {
      backgroundColor: '#f0f0f0',
      color: '#646464',
      border: '1px solid #e8e8e8',
    },
    ghost: {
      backgroundColor: 'transparent',
      color: '#8d8d8d',
    },
  };

  const sizeStyles: Record<string, React.CSSProperties> = {
    sm: {
      padding: '0.5rem 0.5rem',
      borderRadius: '4px',
      fontSize: '0.875rem',
      minHeight: '32px',
    },
    md: {
      padding: '0.75rem 0.75rem',
      borderRadius: '6px',
      fontSize: '1rem',
      minHeight: '40px',
    },
    lg: {
      padding: '1rem 1rem',
      borderRadius: '6px',
      fontSize: '1.125rem',
      minHeight: '48px',
    },
  };

  const combinedStyles = {
    ...baseStyles,
    ...variantStyles[variant],
    ...sizeStyles[size],
  };

  return (
    <button
      style={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default SimpleButton;
