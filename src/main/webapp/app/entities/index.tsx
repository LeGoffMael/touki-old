import React from 'react';
import { Switch } from 'react-router-dom';

// tslint:disable-next-line:no-unused-variable
import ErrorBoundaryRoute from 'app/shared/error/error-boundary-route';

import Travel from './travel';
import UserExtra from './user-extra';
import Step from './step';
import Photo from './photo';
import Reaction from './reaction';
import Comment from './comment';
import CheckListItem from './check-list-item';
import Badge from './badge';
import Answer from './answer';
import AnswerUser from './answer-user';
import Question from './question';
import Survey from './survey';
import Place from './place';
import City from './city';
import Country from './country';
/* jhipster-needle-add-route-import - JHipster will add routes here */

const Routes = ({ match }) => (
  <div>
    <Switch>
      {/* prettier-ignore */}
      <ErrorBoundaryRoute path={`${match.url}/travel`} component={Travel} />
      <ErrorBoundaryRoute path={`${match.url}/user-extra`} component={UserExtra} />
      <ErrorBoundaryRoute path={`${match.url}/step`} component={Step} />
      <ErrorBoundaryRoute path={`${match.url}/photo`} component={Photo} />
      <ErrorBoundaryRoute path={`${match.url}/reaction`} component={Reaction} />
      <ErrorBoundaryRoute path={`${match.url}/comment`} component={Comment} />
      <ErrorBoundaryRoute path={`${match.url}/check-list-item`} component={CheckListItem} />
      <ErrorBoundaryRoute path={`${match.url}/badge`} component={Badge} />
      <ErrorBoundaryRoute path={`${match.url}/answer`} component={Answer} />
      <ErrorBoundaryRoute path={`${match.url}/answer-user`} component={AnswerUser} />
      <ErrorBoundaryRoute path={`${match.url}/question`} component={Question} />
      <ErrorBoundaryRoute path={`${match.url}/survey`} component={Survey} />
      <ErrorBoundaryRoute path={`${match.url}/place`} component={Place} />
      <ErrorBoundaryRoute path={`${match.url}/city`} component={City} />
      <ErrorBoundaryRoute path={`${match.url}/country`} component={Country} />
      {/* jhipster-needle-add-route-path - JHipster will add routes here */}
    </Switch>
  </div>
);

export default Routes;
