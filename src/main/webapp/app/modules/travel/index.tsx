import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Home from 'app/modules/home/home';
import TravelUpdate from 'app/modules/travel/travel-update';
import Travel from 'app/modules/travel/showOne/travel-showOne';
import Step from 'app/modules/step/index';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/new`} component={TravelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={TravelUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={Travel} />
      <ErrorBoundaryRoute path={match.url} component={Home} />
    </Switch>
  </>
);

export default Routes;
