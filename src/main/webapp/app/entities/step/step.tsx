import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './step.reducer';
import { IStep } from 'app/shared/model/step.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStepProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Step extends React.Component<IStepProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { stepList, match } = this.props;
    return (
      <div>
        <h2 id="step-heading">
          Steps
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Step
          </Link>
        </h2>
        <div className="table-responsive">
          {stepList && stepList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Travel</th>
                  <th>City</th>
                  <th>Places</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {stepList.map((step, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${step.id}`} color="link" size="sm">
                        {step.id}
                      </Button>
                    </td>
                    <td>{step.title}</td>
                    <td>{step.description}</td>
                    <td>
                      <TextFormat type="date" value={step.startDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={step.endDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={step.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={step.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>{step.travel ? <Link to={`travel/${step.travel.id}`}>{step.travel.id}</Link> : ''}</td>
                    <td>{step.city ? <Link to={`city/${step.city.id}`}>{step.city.id}</Link> : ''}</td>
                    <td>
                      {step.places
                        ? step.places.map((val, j) => (
                            <span key={j}>
                              <Link to={`place/${val.id}`}>{val.id}</Link>
                              {j === step.places.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${step.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${step.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${step.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Steps found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ step }: IRootState) => ({
  stepList: step.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Step);
