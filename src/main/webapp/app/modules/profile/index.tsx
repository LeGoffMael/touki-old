import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Profile from './profile';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={Profile} />
      <ErrorBoundaryRoute path={match.url} component={Profile} />
    </Switch>
  </>
);

export default Routes;
