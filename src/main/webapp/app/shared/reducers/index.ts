import { combineReducers } from 'redux';
import { loadingBarReducer as loadingBar } from 'react-redux-loading-bar';

import authentication, { AuthenticationState } from './authentication';
import applicationProfile, { ApplicationProfileState } from './application-profile';

import administration, { AdministrationState } from 'app/modules/administration/administration.reducer';
import userManagement, { UserManagementState } from 'app/modules/administration/user-management/user-management.reducer';
import register, { RegisterState } from 'app/modules/account/register/register.reducer';
import activate, { ActivateState } from 'app/modules/account/activate/activate.reducer';
import password, { PasswordState } from 'app/modules/account/password/password.reducer';
import settings, { SettingsState } from 'app/modules/account/settings/settings.reducer';
import passwordReset, { PasswordResetState } from 'app/modules/account/password-reset/password-reset.reducer';
// prettier-ignore
import travel, {
  TravelState
} from 'app/entities/travel/travel.reducer';
// prettier-ignore
import userExtra, {
  UserExtraState
} from 'app/entities/user-extra/user-extra.reducer';
// prettier-ignore
import step, {
  StepState
} from 'app/entities/step/step.reducer';
// prettier-ignore
import photo, {
  PhotoState
} from 'app/entities/photo/photo.reducer';
// prettier-ignore
import reaction, {
  ReactionState
} from 'app/entities/reaction/reaction.reducer';
// prettier-ignore
import comment, {
  CommentState
} from 'app/entities/comment/comment.reducer';
// prettier-ignore
import checkListItem, {
  CheckListItemState
} from 'app/entities/check-list-item/check-list-item.reducer';
// prettier-ignore
import badge, {
  BadgeState
} from 'app/entities/badge/badge.reducer';
// prettier-ignore
import answer, {
  AnswerState
} from 'app/entities/answer/answer.reducer';
// prettier-ignore
import answerUser, {
  AnswerUserState
} from 'app/entities/answer-user/answer-user.reducer';
// prettier-ignore
import question, {
  QuestionState
} from 'app/entities/question/question.reducer';
// prettier-ignore
import survey, {
  SurveyState
} from 'app/entities/survey/survey.reducer';
// prettier-ignore
import place, {
  PlaceState
} from 'app/entities/place/place.reducer';
// prettier-ignore
import city, {
  CityState
} from 'app/entities/city/city.reducer';
// prettier-ignore
import country, {
  CountryState
} from 'app/entities/country/country.reducer';
/* jhipster-needle-add-reducer-import - JHipster will add reducer here */

export interface IRootState {
  readonly authentication: AuthenticationState;
  readonly applicationProfile: ApplicationProfileState;
  readonly administration: AdministrationState;
  readonly userManagement: UserManagementState;
  readonly register: RegisterState;
  readonly activate: ActivateState;
  readonly passwordReset: PasswordResetState;
  readonly password: PasswordState;
  readonly settings: SettingsState;
  readonly travel: TravelState;
  readonly userExtra: UserExtraState;
  readonly step: StepState;
  readonly photo: PhotoState;
  readonly reaction: ReactionState;
  readonly comment: CommentState;
  readonly checkListItem: CheckListItemState;
  readonly badge: BadgeState;
  readonly answer: AnswerState;
  readonly answerUser: AnswerUserState;
  readonly question: QuestionState;
  readonly survey: SurveyState;
  readonly place: PlaceState;
  readonly city: CityState;
  readonly country: CountryState;
  /* jhipster-needle-add-reducer-type - JHipster will add reducer type here */
  readonly loadingBar: any;
}

const rootReducer = combineReducers<IRootState>({
  authentication,
  applicationProfile,
  administration,
  userManagement,
  register,
  activate,
  passwordReset,
  password,
  settings,
  travel,
  userExtra,
  step,
  photo,
  reaction,
  comment,
  checkListItem,
  badge,
  answer,
  answerUser,
  question,
  survey,
  place,
  city,
  country,
  /* jhipster-needle-add-reducer-combine - JHipster will add reducer here */
  loadingBar
});

export default rootReducer;
