import { Route, Switch } from 'react-router-dom';
import React from 'react';
import Home from '../components/Home/Home';
import Detail from '../components/Detail/Detail';

export const HomeRoute = () => (
  <Switch>
    <Route path="/">
      <Home />
    </Route>
  </Switch>
);

export const DetailRoute = () => (
  <Switch>
    <Route path="/:userName">
      <Detail />
    </Route>
  </Switch>
);
