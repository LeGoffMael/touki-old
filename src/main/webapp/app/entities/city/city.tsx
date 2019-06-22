import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class City extends React.Component<ICityProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { cityList, match } = this.props;
    return (
      <div>
        <h2 id="city-heading">
          Cities
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new City
          </Link>
        </h2>
        <div className="table-responsive">
          {cityList && cityList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Latitude</th>
                  <th>Longitude</th>
                  <th>Country</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {cityList.map((city, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${city.id}`} color="link" size="sm">
                        {city.id}
                      </Button>
                    </td>
                    <td>{city.name}</td>
                    <td>{city.latitude}</td>
                    <td>{city.longitude}</td>
                    <td>{city.country ? <Link to={`country/${city.country.id}`}>{city.country.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${city.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${city.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${city.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Cities found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ city }: IRootState) => ({
  cityList: city.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(City);
