import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './survey.reducer';
import { ISurvey } from 'app/shared/model/survey.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISurveyProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Survey extends React.Component<ISurveyProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { surveyList, match } = this.props;
    return (
      <div>
        <h2 id="survey-heading">
          Surveys
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Survey
          </Link>
        </h2>
        <div className="table-responsive">
          {surveyList && surveyList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Label</th>
                  <th>Travel</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {surveyList.map((survey, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${survey.id}`} color="link" size="sm">
                        {survey.id}
                      </Button>
                    </td>
                    <td>{survey.label}</td>
                    <td>{survey.travel ? <Link to={`travel/${survey.travel.id}`}>{survey.travel.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${survey.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${survey.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${survey.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Surveys found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ survey }: IRootState) => ({
  surveyList: survey.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Survey);
