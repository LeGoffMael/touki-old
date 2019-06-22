import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { getEntities as getUserExtras } from 'app/entities/user-extra/user-extra.reducer';
import { getEntity, updateEntity, createEntity, reset } from './badge.reducer';
import { IBadge } from 'app/shared/model/badge.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IBadgeUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IBadgeUpdateState {
  isNew: boolean;
  usersId: string;
}

export class BadgeUpdate extends React.Component<IBadgeUpdateProps, IBadgeUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      usersId: '0',
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

    this.props.getUserExtras();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { badgeEntity } = this.props;
      const entity = {
        ...badgeEntity,
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
    this.props.history.push('/entity/badge');
  };

  render() {
    const { badgeEntity, userExtras, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.badge.home.createOrEditLabel">Create or edit a Badge</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : badgeEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="badge-id">ID</Label>
                    <AvInput id="badge-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="labelLabel" for="badge-label">
                    Label
                  </Label>
                  <AvField
                    id="badge-label"
                    type="text"
                    name="label"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label id="iconLabel" for="badge-icon">
                    Icon
                  </Label>
                  <AvField id="badge-icon" type="text" name="icon" />
                </AvGroup>
                <AvGroup>
                  <Label id="textLabel" for="badge-text">
                    Text
                  </Label>
                  <AvField id="badge-text" type="text" name="text" />
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/badge" replace color="info">
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
  userExtras: storeState.userExtra.entities,
  badgeEntity: storeState.badge.entity,
  loading: storeState.badge.loading,
  updating: storeState.badge.updating,
  updateSuccess: storeState.badge.updateSuccess
});

const mapDispatchToProps = {
  getUserExtras,
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
)(BadgeUpdate);
