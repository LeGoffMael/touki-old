import './step-card-item.scss';

import React from 'react';
import { NavLink as Link, RouteComponentProps } from 'react-router-dom';
import { Button, Label, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { AvForm, AvGroup, AvField } from 'availity-reactstrap-validation';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { deleteEntity as deleteStep, getEntity as getStep } from 'app/modules/step/step.reducer';
import { createEntity as createPhoto, deleteEntity as deletePhoto, reset as resetPhoto } from 'app/entities/photo/photo.reducer';
import { connect } from 'react-redux';
import moment from 'moment';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IStepCardItemProps extends StateProps, DispatchProps {
  step: any;
  isUser: boolean;
  update(event): void;
}

export interface IStepCardItemSate {
  showDeleteStepModal: boolean;
  showCreatePhotoModal: boolean;
  showDeletePhotoModal: boolean;
  idPhotoToDelete: number;
}

export class StepCardItem extends React.Component<IStepCardItemProps, IStepCardItemSate> {
  state: IStepCardItemSate = {
    showDeleteStepModal: false,
    showCreatePhotoModal: false,
    showDeletePhotoModal: false,
    idPhotoToDelete: null
  };

  // Delete step part
  toggleDeleteStepModal = event => {
    this.setState({ showDeleteStepModal: !this.state.showDeleteStepModal });
  };
  confirmDeleteStep = event => {
    if (this.props.step.photos) {
      this.props.step.photos.map((val, i) => this.props.deletePhoto(val.id));
    }
    // @ts-ignore
    this.props.deleteStep(this.props.step.id).then(result => {
      this.toggleDeleteStepModal(event);
      this.props.update(event);
    });
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
    values.steps = [this.props.step.id.toString()];

    if (errors.length === 0) {
      const { photoEntity } = this.props;
      const entity = {
        ...photoEntity,
        ...values,
        steps: mapIdList(values.steps)
      };

      // @ts-ignore
      this.props.createPhoto(entity).then(result => {
        this.props.update(event);
        this.props.resetPhoto();
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
      this.props.update(event);
    });
    this.toggleDeletePhotoModal(event);
  };

  render() {
    const { step, isUser } = this.props;
    const { showDeleteStepModal, showCreatePhotoModal, showDeletePhotoModal } = this.state;

    return (
      <div className="step-list-bloc">
        <div className="step-list-node" />
        <div className="step-content">
          {isUser && (
            <div>
              <Button tag={Link} to={`/step/${step.id}/edit`} outline color="primary">
                <FontAwesomeIcon icon="pencil-alt" />
              </Button>
              &nbsp;
              <Button onClick={this.toggleDeleteStepModal} color="danger">
                <FontAwesomeIcon icon="trash" />
              </Button>
              &nbsp;
              <Button onClick={this.toggleCreatePhotoModal} color="primary">
                <FontAwesomeIcon icon="plus" /> <span className="d-none d-md-inline">New photo</span>
              </Button>
            </div>
          )}
          <h2>{step.title}</h2>
          <p className="step-description">{step.description}</p>
          {/* tslint:disable-next-line:jsx-no-lambda */}
          {step.photos[0] !== undefined &&
            (isUser ? (
              // tslint:disable-next-line:jsx-no-lambda
              <img onClick={() => this.toggleDeletePhotoModal(step.photos[0].id)} src={step.photos[0].link} />
            ) : (
              <img src={step.photos[0].link} />
            ))}
          <p className="step-date">
            From {step.startDate} to {step.endDate}
          </p>
        </div>

        <Modal isOpen={showDeleteStepModal}>
          <ModalHeader toggle={this.toggleDeleteStepModal}>Confirm delete operation</ModalHeader>
          <ModalBody id="toukiApp.step.delete.question">
            Are you sure you want to delete this Step : <b>{step.title}</b> and all it associated photos ?
          </ModalBody>
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

        <Modal isOpen={showCreatePhotoModal} className="modalCreateStep" sm="8">
          <ModalHeader toggle={this.toggleCreatePhotoModal}>
            Add a photo to <b>{step.title}</b>
          </ModalHeader>
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
                &nbsp; Close
              </Button>
              <Button id="jhi-confirm-create-step" color="primary" type="submit" onClick={this.confirmCreatePhoto}>
                <FontAwesomeIcon icon="save" />
                &nbsp; Create
              </Button>
            </ModalFooter>
          </AvForm>
        </Modal>
      </div>
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
)(StepCardItem);
