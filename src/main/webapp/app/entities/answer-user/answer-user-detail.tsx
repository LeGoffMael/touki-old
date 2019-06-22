import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './answer-user.reducer';
import { IAnswerUser } from 'app/shared/model/answer-user.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnswerUserDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class AnswerUserDetail extends React.Component<IAnswerUserDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { answerUserEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            AnswerUser [<b>{answerUserEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="completeDate">Complete Date</span>
            </dt>
            <dd>
              <TextFormat value={answerUserEntity.completeDate} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>User</dt>
            <dd>{answerUserEntity.user ? answerUserEntity.user.id : ''}</dd>
            <dt>Answer</dt>
            <dd>{answerUserEntity.answer ? answerUserEntity.answer.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/answer-user" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/answer-user/${answerUserEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ answerUser }: IRootState) => ({
  answerUserEntity: answerUser.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerUserDetail);
