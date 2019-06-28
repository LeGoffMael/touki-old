import './travel-showOne.scss';

import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Table, Row, Col, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import StepCardItem from 'app/shared/layout/stepCard/step-card-item';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntity as getTravel, deleteEntity as deleteTravel, updateEntity as updateTravel } from 'app/modules/travel/travel.reducer';
import { createEntity as createStep, reset as resetStep, deleteEntity as deleteStep } from 'app/modules/step/step.reducer';
import { getEntity as getCity } from 'app/entities/city/city.reducer';
import { getEntities as getCountries, getEntity as getCountry } from 'app/entities/country/country.reducer';
import { getEntities as getUsers } from 'app/entities/user-extra/user-extra.reducer';
import { deleteEntity as deletePhoto } from 'app/entities/photo/photo.reducer';
import { ITravel } from 'app/shared/model/travel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { IIndexState } from 'app/modules/index';
import moment from 'moment';
import { mapIdList } from 'app/shared/util/entity-utils';
import { convertDateTimeToServer } from 'app/shared/util/date-utils';

const compareStartEndDate = (value, ctx) => {
  if (ctx.startDate > ctx.endDate) {
    return 'End date cannot be before start date.';
  }
  return true;
};

export interface ITravelOneProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITravelOne {
  showDeleteTravelModal: boolean;
  showCreateStepModal: boolean;
  showManageUserModal: boolean;
  citiesList: any;
  placesList: any;
  toRefresh: boolean;
  isUser: boolean;
}

export class TravelOne extends React.Component<ITravelOneProps, ITravelOne> {
  state: ITravelOne = {
    showDeleteTravelModal: false,
    showCreateStepModal: false,
    showManageUserModal: false,
    citiesList: null,
    placesList: null,
    toRefresh: false,
    isUser: false
  };

  componentDidMount() {
    this.props.getSession();
    // @ts-ignore
    this.props.getTravel(this.props.match.params.id).then(response => {
      // Check if connected user follow user passed
      if (response.value.data.users !== null) {
        for (const user of response.value.data.users) {
          if (user.id === this.props.account.id) {
            this.state.isUser = true;
            this.forceUpdate();
            break;
          }
        }
      }
    });
    this.props.getUsers();
    this.props.getCountries();
  }

  // Delete the travel part
  toggleDeleteTravelModal = event => {
    this.setState({ showDeleteTravelModal: !this.state.showDeleteTravelModal });
  };
  confirmDeleteTravel = event => {
    if (this.props.travelEntity.steps) {
      this.props.travelEntity.steps.map((step, i) => this.deleteStepOfTravel(step));
    }
    // @ts-ignore
    this.props.deleteTravel(this.props.travelEntity.id).then(result => {
      document.location.href = 'profile';
    });
  };
  deleteStepOfTravel = step => {
    if (step.photos) {
      step.photos.map((val, i) => this.props.deletePhoto(val.id));
    }
    this.props.deleteStep(step.id);
  };

  // Create a new step part
  toggleCreateStepModal = event => {
    this.setState({ showCreateStepModal: !this.state.showCreateStepModal, citiesList: null, placesList: null });
  };
  confirmCreateStep = (event, errors, values) => {
    // Current time
    const now = moment().unix();
    values.createdAt = now;
    values.updatedAt = now;
    // Add current travel
    values.travel = {
      id: this.props.travelEntity.id.toString()
    };

    if (errors.length === 0) {
      const { stepEntity } = this.props;
      const entity = {
        ...stepEntity,
        ...values,
        places: mapIdList(values.places)
      };

      // @ts-ignore
      this.props.createStep(entity).then(result => {
        this.props.resetStep();
        this.props.getTravel(this.props.match.params.id);
      });
    }
  };

  // Manage users of travel part
  toggleManageUserModal = event => {
    this.setState({ showManageUserModal: !this.state.showManageUserModal });
  };
  confirmManageUser = (event, errors, values) => {
    if (values.users.length > 0 && errors.length === 0) {
      // Current time
      const now = moment().unix();
      values.updatedAt = now;
      const { travelEntity } = this.props;
      const entity = {
        ...travelEntity,
        ...values,
        users: mapIdList(values.users)
      };
      delete entity.steps;

      // @ts-ignore
      this.props.updateTravel(entity).then(result => {
        this.toggleManageUserModal(event);
        this.props.getTravel(this.props.match.params.id);
      });
    }
  };

  /*
   * Change cities possibilities depending on the country selected
   */
  filterCities = (event, values) => {
    // @ts-ignore
    this.props.getCountry(values).then(result => {
      this.setState({ citiesList: result.value.data.cities, placesList: null });
    });
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

  /*
   * Refresh current travel
   */
  updateTravelDisplay = event => {
    this.props.getTravel(this.props.match.params.id);
  };

  render() {
    const { travelEntity, countryEntities, userExtraEntities } = this.props;
    const { showDeleteTravelModal, showCreateStepModal, showManageUserModal, placesList, citiesList, isUser } = this.state;

    return (
      <Row>
        <Col sm="4">
          <div className="sticky-box">
            <div id="travel-informations" className="col-sm-4">
              <h1 className="travel-title">{travelEntity.title}</h1>
              <p className="travel-status status-current">{travelEntity.status}</p>
              <p>From:</p>
              <p className="travel-date">{travelEntity.startDate}</p>
              <p>To:</p>
              <p className="travel-date">{travelEntity.endDate}</p>
              <p className="travel-description">{travelEntity.description}</p>
            </div>
            <div id="travel-users" className="col-sm-4">
              <Table borderless>
                {travelEntity.users !== undefined &&
                  travelEntity.users.map((userList, i) => (
                    <tr>
                      <td>{userList.user.login}</td>
                      <td>(-)</td>
                    </tr>
                  ))}
              </Table>
            </div>
            {isUser && (
              <div className="col-sm-4">
                <Button tag={Link} to={`/travel/${travelEntity.id}/edit`} replace outline color="primary">
                  <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                </Button>
                &nbsp;
                <Button onClick={this.toggleDeleteTravelModal} replace color="danger">
                  <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                </Button>
                &nbsp;
                <Button onClick={this.toggleCreateStepModal} replace color="primary">
                  <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Create new step</span>
                </Button>
                &nbsp;
                <Button onClick={this.toggleManageUserModal} replace color="primary">
                  <FontAwesomeIcon icon="user" /> <span className="d-none d-md-inline">Manage users</span>
                </Button>
              </div>
            )}
          </div>
        </Col>

        <Col sm="8">
          <h1 className="step-list-title">STEPS</h1>
          <div id="step-list" className="step-list-container">
            {travelEntity.steps !== undefined &&
              travelEntity.steps.map((step, i) => <StepCardItem key={i} update={this.updateTravelDisplay} isUser={isUser} step={step} />)}
          </div>
        </Col>

        <Modal isOpen={showDeleteTravelModal}>
          <ModalHeader toggle={this.toggleDeleteTravelModal}>Confirm delete operation</ModalHeader>
          <ModalBody id="toukiApp.travel.delete.question">Are you sure you want to delete this Travel?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleDeleteTravelModal}>
              <FontAwesomeIcon icon="ban" />
              &nbsp; Cancel
            </Button>
            <Button id="jhi-confirm-delete-travel" color="danger" onClick={this.confirmDeleteTravel}>
              <FontAwesomeIcon icon="trash" />
              &nbsp; Delete
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={showCreateStepModal} className="modalCreateStep">
          <ModalHeader toggle={this.toggleCreateStepModal}>
            Create a step to <b>{travelEntity.title}</b>
          </ModalHeader>

          <AvForm onSubmit={this.confirmCreateStep}>
            <ModalBody>
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
                <AvField id="step-description" type="textarea" name="description" />
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
                  <option value="" key="0" />
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
                  <option value="" key="0" />
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
                <AvInput id="step-places" type="select" multiple className="form-control" name="places">
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
            </ModalBody>

            <ModalFooter>
              <Button color="secondary" onClick={this.toggleCreateStepModal}>
                <FontAwesomeIcon icon="ban" />
                &nbsp; Cancel
              </Button>
              <Button id="jhi-confirm-create-step" color="primary" type="submit" onClick={this.confirmCreateStep}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Create
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>

        <Modal isOpen={showManageUserModal} className="modalCreateStep">
          <ModalHeader toggle={this.toggleManageUserModal}>
            Manage Users of <b>{travelEntity.title}</b>
          </ModalHeader>
          <AvForm onSubmit={this.confirmManageUser}>
            <ModalBody>
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
                  {userExtraEntities
                    ? userExtraEntities.map(otherEntity => (
                        <option value={otherEntity.id} key={otherEntity.id}>
                          {otherEntity.user.login}
                        </option>
                      ))
                    : null}
                </AvInput>
              </AvGroup>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.toggleManageUserModal}>
                <FontAwesomeIcon icon="ban" />
                &nbsp; Close
              </Button>
              <Button id="jhi-confirm-create-step" color="primary" type="submit" onClick={this.confirmManageUser}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Apply
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </Row>
    );
  }
}

const mapStateToProps = ({ authentication, travel, step, country, userExtra }: IRootState) => ({
  account: authentication.account,
  travelEntity: travel.entity,
  stepEntity: step.entity,
  countryEntities: country.entities,
  userExtraEntities: userExtra.entities
});

const mapDispatchToProps = {
  getSession,
  getTravel,
  deleteTravel,
  updateTravel,
  createStep,
  getCity,
  getCountry,
  getCountries,
  resetStep,
  deleteStep,
  deletePhoto,
  getUsers
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelOne);
