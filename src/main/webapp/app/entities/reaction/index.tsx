import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Reaction from './reaction';
import ReactionDetail from './reaction-detail';
import ReactionUpdate from './reaction-update';
import ReactionDeleteDialog from './reaction-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={ReactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={ReactionUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={ReactionDetail} />
      <ErrorBoundaryRoute path={match.url} component={Reaction} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={ReactionDeleteDialog} />
  </>
);

export default Routes;
