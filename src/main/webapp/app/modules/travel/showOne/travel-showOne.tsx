import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';
import { getEntity, deleteEntity } from 'app/modules/travel/travel.reducer';
import { ITravel } from 'app/shared/model/travel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';
import { IIndexState } from 'app/modules/index';

export interface ITravelOneProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ITravelOne {
  showDeleteModal: boolean;
}

export class TravelOne extends React.Component<ITravelOneProps, ITravelOne> {
  state: ITravelOne = {
    showDeleteModal: false
  };

  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  confirmDelete = event => {
    this.props.deleteEntity(this.props.travelEntity.id);
    event.stopPropagation();
    document.location.href = 'profile';
  };

  toggleDeleteModal = event => {
    this.setState({ showDeleteModal: !this.state.showDeleteModal });
  };

  render() {
    const { travelEntity } = this.props;
    const { showDeleteModal } = this.state;

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
          <Button tag={Link} to={`/travel/${travelEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
          &nbsp;
          <Button onClick={this.toggleDeleteModal} replace color="danger">
            <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
          </Button>
        </Col>

        <Modal isOpen={showDeleteModal}>
          <ModalHeader toggle={this.toggleDeleteModal}>Confirm delete operation</ModalHeader>
          <ModalBody id="toukiApp.travel.delete.question">Are you sure you want to delete this Travel?</ModalBody>
          <ModalFooter>
            <Button color="secondary" onClick={this.toggleDeleteModal}>
              <FontAwesomeIcon icon="ban" />
              &nbsp; Cancel
            </Button>
            <Button id="jhi-confirm-delete-travel" color="danger" onClick={this.confirmDelete}>
              <FontAwesomeIcon icon="trash" />
              &nbsp; Delete
            </Button>
          </ModalFooter>
        </Modal>
      </Row>
    );
  }
}

const mapStateToProps = ({ travel }: IRootState) => ({
  travelEntity: travel.entity
});

const mapDispatchToProps = { getEntity, deleteEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelOne);
