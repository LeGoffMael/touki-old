import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUser } from 'app/shared/model/user.model';
import { getUsers } from 'app/modules/administration/user-management/user-management.reducer';
import { IBadge } from 'app/shared/model/badge.model';
import { getEntities as getBadges } from 'app/entities/badge/badge.reducer';
import { getEntities as getUserExtras } from 'app/entities/user-extra/user-extra.reducer';
import { ITravel } from 'app/shared/model/travel.model';
import { getEntities as getTravels } from 'app/entities/travel/travel.reducer';
import { getEntity, updateEntity, createEntity, reset } from './user-extra.reducer';
import { IUserExtra } from 'app/shared/model/user-extra.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserExtraUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IUserExtraUpdateState {
  isNew: boolean;
  idsbadges: any[];
  idsfollowings: any[];
  userId: string;
  followersId: string;
  travelsId: string;
}

export class UserExtraUpdate extends React.Component<IUserExtraUpdateProps, IUserExtraUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsbadges: [],
      idsfollowings: [],
      userId: '0',
      followersId: '0',
      travelsId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUsers();
    this.props.getBadges();
    this.props.getUserExtras();
    this.props.getTravels();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { userExtraEntity } = this.props;
      const entity = {
        ...userExtraEntity,
        ...values,
        badges: mapIdList(values.badges),
        followings: mapIdList(values.followings)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/user-extra');
  };

  render() {
    const { userExtraEntity, users, badges, userExtras, travels, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.userExtra.home.createOrEditLabel">Create or edit a UserExtra</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : userExtraEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="user-extra-id">ID</Label>
                    <AvInput id="user-extra-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="birthDateLabel" for="user-extra-birthDate">
                    Birth Date
                  </Label>
                  <AvField id="user-extra-birthDate" type="date" className="form-control" name="birthDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="user-extra-description">
                    Description
                  </Label>
                  <AvField id="user-extra-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label for="user-extra-user">User</Label>
                  <AvInput id="user-extra-user" type="select" className="form-control" name="user.id">
                    <option value="" key="0" />
                    {users
                      ? users.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user-extra-badges">Badges</Label>
                  <AvInput
                    id="user-extra-badges"
                    type="select"
                    multiple
                    className="form-control"
                    name="badges"
                    value={userExtraEntity.badges && userExtraEntity.badges.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {badges
                      ? badges.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="user-extra-followings">Followings</Label>
                  <AvInput
                    id="user-extra-followings"
                    type="select"
                    multiple
                    className="form-control"
                    name="followings"
                    value={userExtraEntity.followings && userExtraEntity.followings.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {userExtras
                      ? userExtras.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/user-extra" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  users: storeState.userManagement.users,
  badges: storeState.badge.entities,
  userExtras: storeState.userExtra.entities,
  travels: storeState.travel.entities,
  userExtraEntity: storeState.userExtra.entity,
  loading: storeState.userExtra.loading,
  updating: storeState.userExtra.updating,
  updateSuccess: storeState.userExtra.updateSuccess
});

const mapDispatchToProps = {
  getUsers,
  getBadges,
  getUserExtras,
  getTravels,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserExtraUpdate);
