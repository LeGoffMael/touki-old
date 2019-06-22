import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Badge from './badge';
import BadgeDetail from './badge-detail';
import BadgeUpdate from './badge-update';
import BadgeDeleteDialog from './badge-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={BadgeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={BadgeUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={BadgeDetail} />
      <ErrorBoundaryRoute path={match.url} component={Badge} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={BadgeDeleteDialog} />
  </>
);

export default Routes;
