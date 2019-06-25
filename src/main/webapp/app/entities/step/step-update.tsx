import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITravel } from 'app/shared/model/travel.model';
import { getEntities as getTravels } from 'app/modules/travel/travel.reducer';
import { ICity } from 'app/shared/model/city.model';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { IPlace } from 'app/shared/model/place.model';
import { getEntities as getPlaces } from 'app/entities/place/place.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
import { getEntities as getPhotos } from 'app/entities/photo/photo.reducer';
import { getEntity, updateEntity, createEntity, reset } from './step.reducer';
import { IStep } from 'app/shared/model/step.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStepUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStepUpdateState {
  isNew: boolean;
  idsplaces: any[];
  travelId: string;
  cityId: string;
  photosId: string;
}

export class StepUpdate extends React.Component<IStepUpdateProps, IStepUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      idsplaces: [],
      travelId: '0',
      cityId: '0',
      photosId: '0',
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

    this.props.getTravels();
    this.props.getCities();
    this.props.getPlaces();
    this.props.getPhotos();
  }

  saveEntity = (event, errors, values) => {
    values.createdAt = convertDateTimeToServer(values.createdAt);
    values.updatedAt = convertDateTimeToServer(values.updatedAt);

    if (errors.length === 0) {
      const { stepEntity } = this.props;
      const entity = {
        ...stepEntity,
        ...values,
        places: mapIdList(values.places)
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/step');
  };

  render() {
    const { stepEntity, travels, cities, places, photos, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.step.home.createOrEditLabel">Create or edit a Step</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : stepEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="step-id">ID</Label>
                    <AvInput id="step-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="titleLabel" for="step-title">
                    Title
                  </Label>
                  <AvField
                    id="step-title"
                    type="text"
                    name="title"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="descriptionLabel" for="step-description">
                    Description
                  </Label>
                  <AvField id="step-description" type="text" name="description" />
                </AvGroup>
                <AvGroup>
                  <Label id="startDateLabel" for="step-startDate">
                    Start Date
                  </Label>
                  <AvField id="step-startDate" type="date" className="form-control" name="startDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="endDateLabel" for="step-endDate">
                    End Date
                  </Label>
                  <AvField id="step-endDate" type="date" className="form-control" name="endDate" />
                </AvGroup>
                <AvGroup>
                  <Label id="createdAtLabel" for="step-createdAt">
                    Created At
                  </Label>
                  <AvInput
                    id="step-createdAt"
                    type="datetime-local"
                    className="form-control"
                    name="createdAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.stepEntity.createdAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="updatedAtLabel" for="step-updatedAt">
                    Updated At
                  </Label>
                  <AvInput
                    id="step-updatedAt"
                    type="datetime-local"
                    className="form-control"
                    name="updatedAt"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.stepEntity.updatedAt)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="step-travel">Travel</Label>
                  <AvInput id="step-travel" type="select" className="form-control" name="travel.id">
                    <option value="" key="0" />
                    {travels
                      ? travels.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="step-city">City</Label>
                  <AvInput id="step-city" type="select" className="form-control" name="city.id">
                    <option value="" key="0" />
                    {cities
                      ? cities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="step-places">Places</Label>
                  <AvInput
                    id="step-places"
                    type="select"
                    multiple
                    className="form-control"
                    name="places"
                    value={stepEntity.places && stepEntity.places.map(e => e.id)}
                  >
                    <option value="" key="0" />
                    {places
                      ? places.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/step" replace color="info">
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
  travels: storeState.travel.entities,
  cities: storeState.city.entities,
  places: storeState.place.entities,
  photos: storeState.photo.entities,
  stepEntity: storeState.step.entity,
  loading: storeState.step.loading,
  updating: storeState.step.updating,
  updateSuccess: storeState.step.updateSuccess
});

const mapDispatchToProps = {
  getTravels,
  getCities,
  getPlaces,
  getPhotos,
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
)(StepUpdate);
