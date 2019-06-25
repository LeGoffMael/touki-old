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
import { ITravel } from 'app/shared/model/travel.model';
import { getEntities as getTravels } from 'app/modules/travel/travel.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
import { getEntities as getPhotos } from 'app/entities/photo/photo.reducer';
import { IComment } from 'app/shared/model/comment.model';
import { getEntities as getComments } from 'app/entities/comment/comment.reducer';
import { getEntity, updateEntity, createEntity, reset } from './reaction.reducer';
import { IReaction } from 'app/shared/model/reaction.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IReactionUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IReactionUpdateState {
  isNew: boolean;
  ownerId: string;
  travelId: string;
  photoId: string;
  commentId: string;
}

export class ReactionUpdate extends React.Component<IReactionUpdateProps, IReactionUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      ownerId: '0',
      travelId: '0',
      photoId: '0',
      commentId: '0',
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
    this.props.getTravels();
    this.props.getPhotos();
    this.props.getComments();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { reactionEntity } = this.props;
      const entity = {
        ...reactionEntity,
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
    this.props.history.push('/entity/reaction');
  };

  render() {
    const { reactionEntity, userExtras, travels, photos, comments, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.reaction.home.createOrEditLabel">Create or edit a Reaction</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : reactionEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="reaction-id">ID</Label>
                    <AvInput id="reaction-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="typeLabel" for="reaction-type">
                    Type
                  </Label>
                  <AvInput
                    id="reaction-type"
                    type="select"
                    className="form-control"
                    name="type"
                    value={(!isNew && reactionEntity.type) || 'LIKE'}
                  >
                    <option value="LIKE">LIKE</option>
                    <option value="REPORT">REPORT</option>
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="reaction-owner">Owner</Label>
                  <AvInput id="reaction-owner" type="select" className="form-control" name="owner.id">
                    <option value="" key="0" />
                    {userExtras
                      ? userExtras.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="reaction-travel">Travel</Label>
                  <AvInput id="reaction-travel" type="select" className="form-control" name="travel.id">
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
                <AvGroup>
                  <Label for="reaction-photo">Photo</Label>
                  <AvInput id="reaction-photo" type="select" className="form-control" name="photo.id">
                    <option value="" key="0" />
                    {photos
                      ? photos.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <AvGroup>
                  <Label for="reaction-comment">Comment</Label>
                  <AvInput id="reaction-comment" type="select" className="form-control" name="comment.id">
                    <option value="" key="0" />
                    {comments
                      ? comments.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/reaction" replace color="info">
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
  travels: storeState.travel.entities,
  photos: storeState.photo.entities,
  comments: storeState.comment.entities,
  reactionEntity: storeState.reaction.entity,
  loading: storeState.reaction.loading,
  updating: storeState.reaction.updating,
  updateSuccess: storeState.reaction.updateSuccess
});

const mapDispatchToProps = {
  getUserExtras,
  getTravels,
  getPhotos,
  getComments,
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
)(ReactionUpdate);
