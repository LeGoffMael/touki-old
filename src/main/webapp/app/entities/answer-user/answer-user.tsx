import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './answer-user.reducer';
import { IAnswerUser } from 'app/shared/model/answer-user.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnswerUserProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class AnswerUser extends React.Component<IAnswerUserProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { answerUserList, match } = this.props;
    return (
      <div>
        <h2 id="answer-user-heading">
          Answer Users
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Answer User
          </Link>
        </h2>
        <div className="table-responsive">
          {answerUserList && answerUserList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Complete Date</th>
                  <th>User</th>
                  <th>Answer</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {answerUserList.map((answerUser, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${answerUser.id}`} color="link" size="sm">
                        {answerUser.id}
                      </Button>
                    </td>
                    <td>
                      <TextFormat type="date" value={answerUser.completeDate} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{answerUser.user ? <Link to={`user-extra/${answerUser.user.id}`}>{answerUser.user.id}</Link> : ''}</td>
                    <td>{answerUser.answer ? <Link to={`answer/${answerUser.answer.id}`}>{answerUser.answer.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${answerUser.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${answerUser.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${answerUser.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Answer Users found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ answerUser }: IRootState) => ({
  answerUserList: answerUser.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnswerUser);
