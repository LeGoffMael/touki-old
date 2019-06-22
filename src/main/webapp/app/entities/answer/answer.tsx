import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './answer.reducer';
import { IAnswer } from 'app/shared/model/answer.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IAnswerProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Answer extends React.Component<IAnswerProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { answerList, match } = this.props;
    return (
      <div>
        <h2 id="answer-heading">
          Answers
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Answer
          </Link>
        </h2>
        <div className="table-responsive">
          {answerList && answerList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Text</th>
                  <th>Question</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {answerList.map((answer, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${answer.id}`} color="link" size="sm">
                        {answer.id}
                      </Button>
                    </td>
                    <td>{answer.text}</td>
                    <td>{answer.question ? <Link to={`question/${answer.question.id}`}>{answer.question.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${answer.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${answer.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${answer.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Answers found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ answer }: IRootState) => ({
  answerList: answer.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Answer);
