import React from 'react';
import { Switch } from 'react-router-dom';

import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Home from 'app/modules/home/home';
import StepUpdate from 'app/modules/step/step-update';
import Step from 'app/modules/step/showOne/step-showOne';

const Routes = ({ match }) => (
  <>
    <Switch>
      <ErrorBoundaryRoute exact path={`${match.url}/:id/edit`} component={StepUpdate} />
      <ErrorBoundaryRoute exact path={`${match.url}/:id`} component={Step} />
      <ErrorBoundaryRoute path={match.url} component={Home} />
    </Switch>
  </>
);

export default Routes;
