// src/routes/ProtectedRoute.tsx
import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  component: React.ComponentType<any>;
  path: string | string[];
  exact?: boolean;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  component: Component, 
  ...rest 
}) => {
  const { isAuthenticated } = useAuth();

  const ProtectedComponent: React.FC<any> = (props) => {
    //console.log('ProtectedRoute', { path: rest.path, isAuthenticated, location: props.location.pathname });
    if (!isAuthenticated) {
      return <Redirect to="/login" />;
    }

    return <Component {...props} />;
  };

  return <Route {...rest} component={ProtectedComponent} />;
};