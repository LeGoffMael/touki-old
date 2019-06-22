import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Travel from './travel';
import TravelDetail from './travel-detail';
import TravelUpdate from './travel-update';
import TravelDeleteDialog from './travel-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TravelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TravelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={TravelDetail} />
      <ErrorBoundaryRoute path={match.url} component={Travel} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={TravelDeleteDialog} />
  </>
);

export default Routes;
