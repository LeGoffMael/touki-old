import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import CheckListItem from './check-list-item';
import CheckListItemDetail from './check-list-item-detail';
import CheckListItemUpdate from './check-list-item-update';
import CheckListItemDeleteDialog from './check-list-item-delete-dialog';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={CheckListItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={CheckListItemUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={CheckListItemDetail} />
      <ErrorBoundaryRoute path={match.url} component={CheckListItem} />
    </Switch>
    <ErrorBoundaryRoute path={`${match.url}/:id/delete`} component={CheckListItemDeleteDialog} />
  </>
);

export default Routes;
