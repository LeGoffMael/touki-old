import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity as getStep, deleteEntity as deleteStep } from 'app/modules/step/step.reducer';
import { createEntity as createPhoto, deleteEntity as deletePhoto, reset as resetPhoto } from 'app/entities/photo/photo.reducer';
import { IStep } from 'app/shared/model/step.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import moment from 'moment';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStepDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IShowOne {
  showDeleteStepModal: boolean;
  showCreatePhotoModal: boolean;
  showDeletePhotoModal: boolean;
  idPhotoToDelete: number;
}

export class StepShowOne extends React.Component<IStepDetailProps, IShowOne> {
  state: IShowOne = {
    showDeleteStepModal: false,
    showCreatePhotoModal: false,
    showDeletePhotoModal: false,
    idPhotoToDelete: null
  };

  componentDidMount() {
    this.props.getStep(this.props.match.params.id);
  }

  // Delete step part
  toggleDeleteStepModal = event => {
    this.setState({ showDeleteStepModal: !this.state.showDeleteStepModal });
  };
  confirmDeleteStep = event => {
    this.props.deleteStep(this.props.stepEntity.id);
    document.location.href = '/travel/' + this.props.stepEntity.travel.id;
  };

  // Create photo part
  toggleCreatePhotoModal = event => {
    this.setState({ showCreatePhotoModal: !this.state.showCreatePhotoModal });
  };
  confirmCreatePhoto = (event, errors, values) => {
    // Current time
    const now = moment().unix();
    values.createdAt = now;
    values.updatedAt = now;
    // Add current step
    values.steps = [this.props.stepEntity.id.toString()];

    if (errors.length === 0) {
      const { photoEntity } = this.props;
      const entity = {
        ...photoEntity,
        ...values,
        steps: mapIdList(values.steps)
      };

      // @ts-ignore
      this.props.createPhoto(entity).then(result => {
        this.props.resetPhoto();
        this.props.getStep(this.props.match.params.id);
      });
    }
  };

  // Delete photo part
  toggleDeletePhotoModal = photoId => {
    this.setState({ showDeletePhotoModal: !this.state.showDeletePhotoModal, idPhotoToDelete: photoId });
  };
  confirmDeletePhoto = event => {
    // @ts-ignore
    this.props.deletePhoto(this.state.idPhotoToDelete).then(result => {
      this.props.getStep(this.props.match.params.id);
    });
    this.toggleDeletePhotoModal(event);
  };

  render() {
    const { stepEntity } = this.props;
    const { showDeleteStepModal, showCreatePhotoModal, showDeletePhotoModal } = this.state;

    return (
      <Row>
        <Col md="8">
          <h2>
            Step [<b>{stepEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{stepEntity.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{stepEntity.description}</dd>
            <dt>
              <span id="startDate">Start Date</span>
            </dt>
            <dd>
              <TextFormat value={stepEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">End Date</span>
            </dt>
            <dd>
              <TextFormat value={stepEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdAt">Created At</span>
            </dt>
            <dd>
              <TextFormat value={stepEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">Updated At</span>
            </dt>
            <dd>
              <TextFormat value={stepEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Travel</dt>
            <dd>{stepEntity.travel ? stepEntity.travel.id : ''}</dd>
            <dt>City</dt>
            <dd>{stepEntity.city ? stepEntity.city.id : ''}</dd>
            <dt>Places</dt>
            <dd>
              {stepEntity.places
                ? stepEntity.places.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === stepEntity.places.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Photos</dt>
            <dd>
              {stepEntity.photos
                ? stepEntity.photos.map((val, i) => (
                    <span key={val.id}>
                      {/* tslint:disable-next-line:jsx-no-lambda */}
                      <a onClick={() => this.toggleDeletePhotoModal(val.id)}>{val.link}</a>
                      {i === stepEntity.photos.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to={`/travel/${stepEntity.travel && stepEntity.travel.id}`} color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/travel/${stepEntity.travel && stepEntity.travel.id}/step/${stepEntity.id}/edit`} outline color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
          &nbsp;
          <Button onClick={this.toggleDeleteStepModal} color="danger">
            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
          </Button>
          &nbsp;
          <Button onClick={this.toggleCreatePhotoModal} color="primary">
            <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">Add new photo</span>
          </Button>
        </Col>

        <Modal isOpen={showDeletePhotoModal}>
          <ModalHeader toggle={this.toggleDeletePhotoModal}>Confirm delete operation</ModalHeader>
          <ModalBody id="toukiApp.step.delete.question">Are you sure you want to delete this Photo?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleDeletePhotoModal}>
              <FontAwesomeIcon icon="ban" />
              &nbsp; Cancel
            </Button>
            <Button id="jhi-confirm-delete-step" color="danger" onClick={this.confirmDeletePhoto}>
              <FontAwesomeIcon icon="trash" />
              &nbsp; Delete
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={showDeleteStepModal}>
          <ModalHeader toggle={this.toggleDeleteStepModal}>Confirm delete operation</ModalHeader>
          <ModalBody id="toukiApp.step.delete.question">Are you sure you want to delete this Step?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleDeleteStepModal}>
              <FontAwesomeIcon icon="ban" />
              &nbsp; Cancel
            </Button>
            <Button id="jhi-confirm-delete-step" color="danger" onClick={this.confirmDeleteStep}>
              <FontAwesomeIcon icon="trash" />
              &nbsp; Delete
            </Button>
          </ModalFooter>
        </Modal>

        <Modal isOpen={showCreatePhotoModal} className="modalCreateStep" sm="8">
          <ModalHeader toggle={this.toggleCreatePhotoModal}>Add a photo to this step</ModalHeader>

          <AvForm onSubmit={this.confirmCreatePhoto}>
            <ModalBody>
              <AvGroup>
                <Label id="linkLabel" for="photo-link">
                  Link
                </Label>
                <AvField
                  id="photo-link"
                  type="text"
                  name="link"
                  validate={{
                    required: { value: true, errorMessage: 'This field is required.' }
                  }}
                />
              </AvGroup>
            </ModalBody>

            <ModalFooter>
              <Button color="secondary" onClick={this.toggleCreatePhotoModal}>
                <FontAwesomeIcon icon="ban" />
                &nbsp; Cancel
              </Button>
              <Button id="jhi-confirm-create-step" color="primary" type="submit" onClick={this.confirmCreatePhoto}>
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

const mapStateToProps = ({ step, photo }: IRootState) => ({
  stepEntity: step.entity,
  photoEntity: photo.entity
});

const mapDispatchToProps = { getStep, deleteStep, createPhoto, deletePhoto, resetPhoto };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepShowOne);
