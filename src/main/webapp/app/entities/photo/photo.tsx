import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './photo.reducer';
import { IPhoto } from 'app/shared/model/photo.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IPhotoProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Photo extends React.Component<IPhotoProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { photoList, match } = this.props;
    return (
      <div>
        <h2 id="photo-heading">
          Photos
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Photo
          </Link>
        </h2>
        <div className="table-responsive">
          {photoList && photoList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Link</th>
                  <th>Created At</th>
                  <th>Updated At</th>
                  <th>Steps</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {photoList.map((photo, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${photo.id}`} color="link" size="sm">
                        {photo.id}
                      </Button>
                    </td>
                    <td>{photo.link}</td>
                    <td>
                      <TextFormat type="date" value={photo.createdAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      <TextFormat type="date" value={photo.updatedAt} format={APP_DATE_FORMAT} />
                    </td>
                    <td>
                      {photo.steps
                        ? photo.steps.map((val, j) => (
                            <span key={j}>
                              <Link to={`step/${val.id}`}>{val.id}</Link>
                              {j === photo.steps.length - 1 ? '' : ', '}
                            </span>
                          ))
                        : null}
                    </td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${photo.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${photo.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${photo.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Photos found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ photo }: IRootState) => ({
  photoList: photo.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Photo);
