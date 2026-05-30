import React from 'react';
import { Route, Redirect, Switch } from 'react-router-dom';

import { TopBar } from '../components/TopBar';
import { BottomNavigation } from '../components/BottomNavigation';

import { Dashboard } from '../pages/Dashboard/Dashboard';
import { Pets } from '../pages/Dashboard/Pets';
import { Reminders } from '../pages/Dashboard/Reminders';
import { Profile } from '../pages/Dashboard/Profile';

export const AppLayout = () => {
  return (
    <div className="h-screen flex flex-col bg-[#f9f9ff]">
      <TopBar />

      <main className="flex-1 overflow-y-auto">
        <div className="max-w-md mx-auto px-5 py-6 pb-24">
          <Switch>
            <Route
              exact
              path="/dashboard"
              component={Dashboard}
            />

            <Route
              exact
              path="/pets"
              component={Pets}
            />

            <Route
              exact
              path="/reminders"
              component={Reminders}
            />

            <Route
              exact
              path="/profile"
              component={Profile}
            />

            <Redirect to="/dashboard" />
          </Switch>
        </div>
      </main>

      <BottomNavigation />
    </div>
  );
};