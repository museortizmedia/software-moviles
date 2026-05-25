// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { AppOverlay } from '../components/AppOverlay';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string;
  exact?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  component: Component, 
  ...rest 
}) => {
  const { isAuthenticated } = useAuth();

  return (
    <Route
      {...rest}
      render={(props) => {
        if (!isAuthenticated) {
          return <Redirect to="/login" />;
        }

        // Las páginas protegidas se renderizan dentro del AppOverlay unificado
        return (
          <AppOverlay>
            <Component {...props} />
          </AppOverlay>
        );
      }}
    />
  );
};