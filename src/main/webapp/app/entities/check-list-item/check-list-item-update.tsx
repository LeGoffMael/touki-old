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
import { getEntity, updateEntity, createEntity, reset } from './check-list-item.reducer';
import { ICheckListItem } from 'app/shared/model/check-list-item.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ICheckListItemUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ICheckListItemUpdateState {
  isNew: boolean;
  travelId: string;
}

export class CheckListItemUpdate extends React.Component<ICheckListItemUpdateProps, ICheckListItemUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      travelId: '0',
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
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { checkListItemEntity } = this.props;
      const entity = {
        ...checkListItemEntity,
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
    this.props.history.push('/entity/check-list-item');
  };

  render() {
    const { checkListItemEntity, travels, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.checkListItem.home.createOrEditLabel">Create or edit a CheckListItem</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : checkListItemEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="check-list-item-id">ID</Label>
                    <AvInput id="check-list-item-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="nameLabel" for="check-list-item-name">
                    Name
                  </Label>
                  <AvField
                    id="check-list-item-name"
                    type="text"
                    name="name"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="isDoneLabel" check>
                    <AvInput id="check-list-item-isDone" type="checkbox" className="form-control" name="isDone" />
                    Is Done
                  </Label>
                </AvGroup>
                <AvGroup>
                  <Label for="check-list-item-travel">Travel</Label>
                  <AvInput id="check-list-item-travel" type="select" className="form-control" name="travel.id">
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
                <Button tag={Link} id="cancel-save" to="/entity/check-list-item" replace color="info">
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
  checkListItemEntity: storeState.checkListItem.entity,
  loading: storeState.checkListItem.loading,
  updating: storeState.checkListItem.updating,
  updateSuccess: storeState.checkListItem.updateSuccess
});

const mapDispatchToProps = {
  getTravels,
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
)(CheckListItemUpdate);
