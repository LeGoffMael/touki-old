import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ICountry } from 'app/shared/model/country.model';
import { getEntities as getCountries } from 'app/entities/country/country.reducer';
import { getEntity, updateEntity, createEntity, reset } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICityUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICityUpdateState {
  isNew: boolean;
  countryId: string;
}

export class CityUpdate extends React.Component<ICityUpdateProps, ICityUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      countryId: '0',
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

    this.props.getCountries();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { cityEntity } = this.props;
      const entity = {
        ...cityEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/city');
  };

  render() {
    const { cityEntity, countries, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.city.home.createOrEditLabel">Create or edit a City</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : cityEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="city-id">ID</Label>
                    <AvInput id="city-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="city-name">
                    Name
                  </Label>
                  <AvField
                    id="city-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="latitudeLabel" for="city-latitude">
                    Latitude
                  </Label>
                  <AvField id="city-latitude" type="string" className="form-control" name="latitude" />
                </AvGroup>
                <AvGroup>
                  <Label id="longitudeLabel" for="city-longitude">
                    Longitude
                  </Label>
                  <AvField id="city-longitude" type="string" className="form-control" name="longitude" />
                </AvGroup>
                <AvGroup>
                  <Label for="city-country">Country</Label>
                  <AvInput id="city-country" type="select" className="form-control" name="country.id">
                    <option value="" key="0" />
                    {countries
                      ? countries.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/city" replace color="info">
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
  countries: storeState.country.entities,
  cityEntity: storeState.city.entity,
  loading: storeState.city.loading,
  updating: storeState.city.updating,
  updateSuccess: storeState.city.updateSuccess
});

const mapDispatchToProps = {
  getCountries,
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
)(CityUpdate);
