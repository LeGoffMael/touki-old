import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntity as getCity } from 'app/entities/city/city.reducer';
import { getEntities as getCountries, getEntity as getCountry } from 'app/entities/country/country.reducer';
import { getEntity, updateEntity, createEntity, reset } from './step.reducer';
import { IStep } from 'app/shared/model/step.model';
import moment from 'moment';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStepUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IStepUpdateState {
  refresh: boolean;
  cityId: number;
  citiesList: any;
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
      refresh: true,
      cityId: null,
      citiesList: null,
      placesList: null
    };
  }

  componentDidMount() {
    // @ts-ignore
    this.props.getEntity(this.props.match.params.id).then(result1 => {
      if (this.props.stepEntity && this.props.stepEntity.city) {
        // @ts-ignore
        this.props.getCountry(this.props.stepEntity.city.country.id).then(result => {
          this.setState({
            cityId: this.props.stepEntity.city.id,
            citiesList: this.props.countryEntity.cities,
            placesList: this.props.stepEntity.city.places
          });
        });
      }
    });
    this.props.getCountries();
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
      document.location.href = '/travel/' + entity.travel.id;
    }
  };

  /*
   * Change cities possibilities depending on the country selected
   */
  filterCities = (event, values) => {
    // @ts-ignore
    this.props.getCountry(values).then(result => {
      this.setState({ refresh: false, citiesList: result.value.data.cities, placesList: null });
    });
  };
  /*
   * Change places possibilities depending on the city selected
   */
  filterPlaces = (event, values) => {
    // @ts-ignore
    this.props.getCity(values).then(result => {
      this.setState({ refresh: false, placesList: result.value.data.places });
    });
  };

  render() {
    const { stepEntity, countryEntities, countryEntity, loading, updating } = this.props;
    const { placesList, citiesList, cityId, refresh } = this.state;

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
                  <Label>Country</Label>
                  <AvInput id="country" type="select" className="form-control" name="country.id" onChange={this.filterCities}>
                    <option value="" key={refresh ? countryEntity.id : '0'} />
                    {countryEntities
                      ? countryEntities.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.name}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="step-city">City</Label>
                  <AvInput id="step-city" type="select" className="form-control" name="city.id" onChange={this.filterPlaces}>
                    <option value="" key={refresh ? cityId : '0'} />
                    {citiesList
                      ? citiesList.map(otherEntity => (
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
                <Button tag={Link} id="cancel-save" to={`/travel/${stepEntity.travel && stepEntity.travel.id}`} replace color="info">
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
  countryEntities: storeState.country.entities,
  countryEntity: storeState.country.entity,
  stepEntity: storeState.step.entity,
  loading: storeState.step.loading,
  updating: storeState.step.updating,
  updateSuccess: storeState.step.updateSuccess
});

const mapDispatchToProps = {
  getCity,
  getCountry,
  getCountries,
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
