import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Dashboard } from './Dashboard';
import { Pets } from './Pets';
import { Reminders } from './Reminders';
import { Profile } from './Profile';

export const DashboardShell: React.FC = () => {
  return (
    <Switch>
      <Route exact path="/dashboard" component={Dashboard} />
      <Route exact path="/pets" component={Pets} />
      <Route exact path="/reminders" component={Reminders} />
      <Route exact path="/profile" component={Profile} />
      <Redirect to="/dashboard" />
    </Switch>
  );
};
