import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from '../../modules/travel/travel.reducer';
import { ITravel } from 'app/shared/model/travel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITravelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Travel extends React.Component<ITravelProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { travelList, match } = this.props;
    return (
      <div>
        <h2 id="travel-heading">
          Travels
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Travel
          </Link>
        </h2>
        <div className="table-responsive">
          {travelList && travelList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                  <th>Status</th>
                  <th>Precaution</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Users</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {travelList.map((travel, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${travel.id}`} color="link" size="sm">
                        {travel.id}
                      </Button>
                    </td>
                    <td>{travel.title}</td>
                    <td>{travel.description}</td>
                    <td>
                      <TextFormat type="date" value={travel.startDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={travel.endDate} format={APP_LOCAL_DATE_FORMAT} />
                    </td>
                    <td>{travel.status}</td>
                    <td>{travel.precaution}</td>
                    <td>
                      <TextFormat type="date" value={travel.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={travel.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      {travel.users
                        ? travel.users.map((val, j) => (
                            <span key={j}>
                              <Link to={`user-extra/${val.id}`}>{val.id}</Link>
                              {j === travel.users.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${travel.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${travel.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${travel.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Travels found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ travel }: IRootState) => ({
  travelList: travel.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Travel);
