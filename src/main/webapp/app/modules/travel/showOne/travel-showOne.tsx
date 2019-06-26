import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntity as getTravel, deleteEntity as deleteTravel } from 'app/modules/travel/travel.reducer';
import { createEntity as createStep } from 'app/entities/step/step.reducer';
import { getEntities as getCities } from 'app/entities/city/city.reducer';
import { ITravel } from 'app/shared/model/travel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { IIndexState } from 'app/modules/index';
import moment from 'moment';

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
}

export class TravelOne extends React.Component<ITravelOneProps, ITravelOne> {
  state: ITravelOne = {
    showDeleteTravelModal: false,
    showCreateStepModal: false
  };

  componentDidMount() {
    this.props.getTravel(this.props.match.params.id);
    this.props.getCities();
  }

  confirmDeleteTravel = event => {
    this.props.deleteTravel(this.props.travelEntity.id);
    event.stopPropagation();
    document.location.href = 'profile';
  };

  toggleDeleteTravelModal = event => {
    this.setState({ showDeleteTravelModal: !this.state.showDeleteTravelModal });
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
        ...values
      };

      this.props.createStep(entity);
    }
  };

  toggleCreateStepModal = event => {
    this.setState({ showCreateStepModal: !this.state.showCreateStepModal });
  };

  render() {
    const { travelEntity, cityEntities } = this.props;
    const { showDeleteTravelModal, showCreateStepModal } = this.state;

    console.log(travelEntity);

    return (
      <Row>
        <Col md="8">
          <h2>
            Travel [<b>{travelEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{travelEntity.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{travelEntity.description}</dd>
            <dt>
              <span id="startDate">Start Date</span>
            </dt>
            <dd>
              <TextFormat value={travelEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">End Date</span>
            </dt>
            <dd>
              <TextFormat value={travelEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="status">Status</span>
            </dt>
            <dd>{travelEntity.status}</dd>
            <dt>
              <span id="precaution">Precaution</span>
            </dt>
            <dd>{travelEntity.precaution}</dd>
            <dt>
              <span id="createdAt">Created At</span>
            </dt>
            <dd>
              <TextFormat value={travelEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">Updated At</span>
            </dt>
            <dd>
              <TextFormat value={travelEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Users</dt>
            <dd>
              {travelEntity.users
                ? travelEntity.users.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === travelEntity.users.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
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
          <ModalHeader toggle={this.toggleCreateStepModal}>Create a step to this travel</ModalHeader>

          <AvForm onSubmit={this.confirmCreateStep}>
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
              <Label for="step-city">City</Label>
              <AvInput id="step-city" type="select" className="form-control" name="city.id">
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
      </Row>
    );
  }
}

const mapStateToProps = ({ travel, step, city }: IRootState) => ({
  travelEntity: travel.entity,
  stepEntity: step.entity,
  cityEntities: city.entities
});

const mapDispatchToProps = { getTravel, deleteTravel, createStep, getCities };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelOne);
