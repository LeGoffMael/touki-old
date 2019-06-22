import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './badge.reducer';
import { IBadge } from 'app/shared/model/badge.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBadgeProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Badge extends React.Component<IBadgeProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { badgeList, match } = this.props;
    return (
      <div>
        <h2 id="badge-heading">
          Badges
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Badge
          </Link>
        </h2>
        <div className="table-responsive">
          {badgeList && badgeList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Label</th>
                  <th>Icon</th>
                  <th>Text</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {badgeList.map((badge, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${badge.id}`} color="link" size="sm">
                        {badge.id}
                      </Button>
                    </td>
                    <td>{badge.label}</td>
                    <td>{badge.icon}</td>
                    <td>{badge.text}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${badge.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${badge.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${badge.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Badges found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ badge }: IRootState) => ({
  badgeList: badge.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Badge);
