import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntity as getUserExtra, getEntities as getUserExtras } from 'app/entities/user-extra/user-extra.reducer';
import { getEntity, updateEntity, createEntity, reset } from 'app/modules/travel/travel.reducer';
import { ITravel } from 'app/shared/model/travel.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';
import moment from 'moment';

export interface ITravelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITravelUpdateState {
  isNew: boolean;
  idsusers: any[];
}

const compareStartEndDate = (value, ctx) => {
  if (ctx.startDate > ctx.endDate) {
    return 'End date cannot be before start date.';
  }
  return true;
};

export class TravelUpdate extends React.Component<ITravelUpdateProps, ITravelUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsusers: [],
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentDidMount() {
    this.props.getSession();

    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getUserExtras();
  }

  saveEntity = (event, errors, values) => {
    // Current time
    const now = moment().unix();
    if (this.state.isNew) {
      values.createdAt = now;
      // Add current user
      values.users = [this.props.account.id.toString()];
    } else {
      values.createdAt = moment(this.props.travelEntity.createdAt).unix();
    }
    values.updatedAt = now;

    // Set travel status
    const today = new Date().setHours(0, 0, 0, 0);
    const startDate = new Date(values.startDate).setHours(0, 0, 0, 0);
    const endDate = new Date(values.endDate).setHours(0, 0, 0, 0);
    if (startDate <= today && endDate >= today) {
      values.status = 'CURRENT';
    } else if (endDate <= today) {
      values.status = 'DONE';
    } else {
      values.status = 'PLANNED';
    }

    if (errors.length === 0) {
      const { travelEntity } = this.props;
      const entity = {
        ...travelEntity,
        ...values,
        users: mapIdList(values.users)
      };

      if (this.state.isNew) {
        // @ts-ignore
        this.props.createEntity(entity).then(result => {
          document.location.href = 'travel/' + result.value.data.id;
        });
      } else {
        // @ts-ignore
        this.props.updateEntity(entity).then(result => {
          document.location.href = 'travel/' + result.value.data.id;
        });
      }
    }
  };

  render() {
    const { userExtras, travelEntity, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.travel.home.createOrEditLabel">Create or edit a Travel</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : travelEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <Col>
                    <AvGroup hidden>
                      <Label for="travel-id">ID</Label>
                      <AvInput id="travel-id" type="text" className="form-control" name="id" required readOnly />
                    </AvGroup>

                    <AvGroup hidden>
                      <Label for="travel-users">Users</Label>
                      <AvInput
                        id="travel-users"
                        type="select"
                        multiple
                        className="form-control"
                        name="users"
                        value={travelEntity.users && travelEntity.users.map(e => e.id)}
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
                  </Col>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="travel-title">
                    Title
                  </Label>
                  <AvField
                    id="travel-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' },
                      minLength: { value: 2, errorMessage: 'This field is required to be at least 2 characters.' },
                      maxLength: { value: 20, errorMessage: 'This field cannot be longer than 20 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="travel-description">
                    Description
                  </Label>
                  <AvField
                    id="travel-description"
                    type="textarea"
                    name="description"
                    validate={{
                      maxLength: { value: 200, errorMessage: 'This field cannot be longer than 200 characters.' }
                    }}
                  />
                </AvGroup>
                <Row form>
                  <Col sm="6">
                    <AvGroup>
                      <Label id="startDateLabel" for="travel-startDate">
                        Start Date
                      </Label>
                      <AvField id="travel-startDate" type="date" className="form-control" name="startDate" />
                    </AvGroup>
                  </Col>
                  <Col sm="6">
                    <AvGroup>
                      <Label id="endDateLabel" for="travel-endDate">
                        End Date
                      </Label>
                      <AvField
                        id="travel-endDate"
                        type="date"
                        className="form-control"
                        name="endDate"
                        validate={{ errorMessage: compareStartEndDate }}
                      />
                    </AvGroup>
                  </Col>
                </Row>
                <AvGroup>
                  <Label id="precautionLabel" for="travel-precaution">
                    Precaution
                  </Label>
                  <AvField id="travel-precaution" type="textarea" name="precaution" />
                </AvGroup>
                {!isNew ? (
                  <Link className="cancel-save" to={`/travel/${this.props.travelEntity.id}`} color="info">
                    <FontAwesomeIcon icon="arrow-left" />
                    <span className="d-none d-md-inline">Back</span>
                  </Link>
                ) : (
                  <Link className="cancel-save" to={`/profile/${this.props.account.id}`} color="info">
                    <FontAwesomeIcon icon="arrow-left" />
                    <span className="d-none d-md-inline">Back</span>
                  </Link>
                )}
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

const mapStateToProps = ({ authentication, userExtra, travel }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  userExtras: userExtra.entities,
  travelEntity: travel.entity,
  loading: travel.loading,
  updating: travel.updating,
  updateSuccess: travel.updateSuccess
});

const mapDispatchToProps = {
  getSession,
  getUserExtra,
  getUserExtras,
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
)(TravelUpdate);
