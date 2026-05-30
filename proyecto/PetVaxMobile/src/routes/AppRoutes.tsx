import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

import Welcome from '../pages/Welcome';
import { AppLayout } from '../layouts/AppLayout';

export const AppRoutes = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center">
        Cargando...
      </div>
    );
  }

  return (
    <Switch>
      {!user ? (
        <>
          <Route
            exact
            path="/login"
            component={Welcome}
          />

          <Redirect to="/login" />
        </>
      ) : (
        <>
          <Route
            path="/"
            component={AppLayout}
          />
        </>
      )}
    </Switch>
  );
};