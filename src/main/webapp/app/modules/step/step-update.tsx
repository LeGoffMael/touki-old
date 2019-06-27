import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntities as getCities, getEntity as getCity } from 'app/entities/city/city.reducer';
import { getEntity, updateEntity, createEntity, reset } from './step.reducer';
import { IStep } from 'app/shared/model/step.model';
import moment from 'moment';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStepUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStepUpdateState {
  cityId: string;
  placesList: any;
}

const compareStartEndDate = (value, ctx) => {
  if (ctx.startDate > ctx.endDate) {
    return 'End date cannot be before start date.';
  }
  return true;
};

export class StepUpdate extends React.Component<IStepUpdateProps, IStepUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      cityId: '0',
      placesList: null
    };
  }

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
    this.props.getCities();

    if (this.props.stepEntity && this.props.stepEntity.city) {
      this.setState({ placesList: this.props.stepEntity.city.places });
    }
  }

  /*
   * Save the update of the step
   */
  saveEntity = (event, errors, values) => {
    // Current time
    const now = moment().unix();
    values.updatedAt = now;

    if (errors.length === 0) {
      const { stepEntity } = this.props;
      const entity = {
        ...stepEntity,
        ...values,
        places: mapIdList(values.places)
      };

      this.props.updateEntity(entity);
      document.location.href = '/travel/' + entity.travel.id + '/step/' + entity.id;
    }
  };

  /*
   * Change places possibilities depending on the city selected
   */
  filterPlaces = (event, values) => {
    // @ts-ignore
    this.props.getCity(values).then(result => {
      this.setState({ placesList: result.value.data.places });
    });
  };

  render() {
    const { stepEntity, cityEntities, loading, updating } = this.props;
    const { placesList } = this.state;
    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.step.home.createOrEditLabel">Edit a Step</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={stepEntity} onSubmit={this.saveEntity}>
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
                <Row form>
                  <Col sm="6">
                    <AvGroup>
                      <Label id="startDateLabel" for="step-startDate">
                        Start Date
                      </Label>
                      <AvField id="step-startDate" type="date" className="form-control" name="startDate" />
                    </AvGroup>
                  </Col>
                  <Col sm="6">
                    <AvGroup>
                      <Label id="endDateLabel" for="step-endDate">
                        End Date
                      </Label>
                      <AvField
                        id="step-endDate"
                        type="date"
                        className="form-control"
                        name="endDate"
                        validate={{ errorMessage: compareStartEndDate }}
                      />
                    </AvGroup>
                  </Col>
                </Row>
                <AvGroup>
                  <Label for="step-city">City</Label>
                  <AvInput id="step-city" type="select" className="form-control" name="city.id" onChange={this.filterPlaces}>
                    <option value="" key="0" />
                    {cityEntities
                      ? cityEntities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
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
                    {placesList
                      ? placesList.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button
                  tag={Link}
                  id="cancel-save"
                  to={`/travel/${stepEntity.travel && stepEntity.travel.id}/step/${stepEntity.id}`}
                  replace
                  color="info"
                >
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
  cityEntities: storeState.city.entities,
  stepEntity: storeState.step.entity,
  loading: storeState.step.loading,
  updating: storeState.step.updating,
  updateSuccess: storeState.step.updateSuccess
});

const mapDispatchToProps = {
  getCities,
  getCity,
  getEntity,
  updateEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepUpdate);
