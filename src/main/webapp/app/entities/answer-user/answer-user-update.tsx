import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { getEntities as getUserExtras } from 'app/entities/user-extra/user-extra.reducer';
import { IAnswer } from 'app/shared/model/answer.model';
import { getEntities as getAnswers } from 'app/entities/answer/answer.reducer';
import { getEntity, updateEntity, createEntity, reset } from './answer-user.reducer';
import { IAnswerUser } from 'app/shared/model/answer-user.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IAnswerUserUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IAnswerUserUpdateState {
  isNew: boolean;
  userId: string;
  answerId: string;
}

export class AnswerUserUpdate extends React.Component<IAnswerUserUpdateProps, IAnswerUserUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      userId: '0',
      answerId: '0',
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
    this.props.getAnswers();
  }

  saveEntity = (event, errors, values) => {
    values.completeDate = convertDateTimeToServer(values.completeDate);

    if (errors.length === 0) {
      const { answerUserEntity } = this.props;
      const entity = {
        ...answerUserEntity,
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
    this.props.history.push('/entity/answer-user');
  };

  render() {
    const { answerUserEntity, userExtras, answers, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.answerUser.home.createOrEditLabel">Create or edit a AnswerUser</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : answerUserEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="answer-user-id">ID</Label>
                    <AvInput id="answer-user-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="completeDateLabel" for="answer-user-completeDate">
                    Complete Date
                  </Label>
                  <AvInput
                    id="answer-user-completeDate"
                    type="datetime-local"
                    className="form-control"
                    name="completeDate"
                    placeholder={'YYYY-MM-DD HH:mm'}
                    value={isNew ? null : convertDateTimeFromServer(this.props.answerUserEntity.completeDate)}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="answer-user-user">User</Label>
                  <AvInput id="answer-user-user" type="select" className="form-control" name="user.id">
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
                  <Label for="answer-user-answer">Answer</Label>
                  <AvInput id="answer-user-answer" type="select" className="form-control" name="answer.id">
                    <option value="" key="0" />
                    {answers
                      ? answers.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/answer-user" replace color="info">
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
  answers: storeState.answer.entities,
  answerUserEntity: storeState.answerUser.entity,
  loading: storeState.answerUser.loading,
  updating: storeState.answerUser.updating,
  updateSuccess: storeState.answerUser.updateSuccess
});

const mapDispatchToProps = {
  getUserExtras,
  getAnswers,
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
)(AnswerUserUpdate);
