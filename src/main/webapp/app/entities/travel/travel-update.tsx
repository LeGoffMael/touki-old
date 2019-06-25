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
import { getEntities as getUserExtras } from 'app/entities/user-extra/user-extra.reducer';
import { getEntity, updateEntity, createEntity, reset } from '../../modules/travel/travel.reducer';
import { ITravel } from 'app/shared/model/travel.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ITravelUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITravelUpdateState {
  isNew: boolean;
  idsusers: any[];
}

export class TravelUpdate extends React.Component<ITravelUpdateProps, ITravelUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsusers: [],
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

    this.props.getUserExtras();
  }

  saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const { travelEntity } = this.props;
      const entity = {
        ...travelEntity,
        ...values,
        users: mapIdList(values.users)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/travel');
  };

  render() {
    const { travelEntity, userExtras, loading, updating } = this.props;
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
                  <AvGroup>
                    <Label for="travel-id">ID</Label>
                    <AvInput id="travel-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
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
                    type="text"
                    name="description"
                    validate={{
                      maxLength: { value: 200, errorMessage: 'This field cannot be longer than 200 characters.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="travel-startDate">
                    Start Date
                  </Label>
                  <AvField id="travel-startDate" type="date" className="form-control" name="startDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="travel-endDate">
                    End Date
                  </Label>
                  <AvField id="travel-endDate" type="date" className="form-control" name="endDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="statusLabel" for="travel-status">
                    Status
                  </Label>
                  <AvInput
                    id="travel-status"
                    type="select"
                    className="form-control"
                    name="status"
                    value={(!isNew && travelEntity.status) || 'PLANNED'}
                  >
                    <option value="PLANNED">PLANNED</option>
                    <option value="CURRENT">CURRENT</option>
                    <option value="DONE">DONE</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label id="precautionLabel" for="travel-precaution">
                    Precaution
                  </Label>
                  <AvField id="travel-precaution" type="text" name="precaution" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="travel-createdAt">
                    Created At
                  </Label>
                  <AvInput
                    id="travel-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.travelEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="travel-updatedAt">
                    Updated At
                  </Label>
                  <AvInput
                    id="travel-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.travelEntity.updatedAt)}
                  />
                </AvGroup>
                <AvGroup>
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
                <Button tag={Link} id="cancel-save" to="/entity/travel" replace color="info">
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
  userExtras: storeState.userExtra.entities,
  travelEntity: storeState.travel.entity,
  loading: storeState.travel.loading,
  updating: storeState.travel.updating,
  updateSuccess: storeState.travel.updateSuccess
});

const mapDispatchToProps = {
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
