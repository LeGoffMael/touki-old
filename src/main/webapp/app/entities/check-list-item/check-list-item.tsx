import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from './check-list-item.reducer';
import { ICheckListItem } from 'app/shared/model/check-list-item.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICheckListItemProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class CheckListItem extends React.Component<ICheckListItemProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { checkListItemList, match } = this.props;
    return (
      <div>
        <h2 id="check-list-item-heading">
          Check List Items
          <Link to={`${match.url}/new`} className="btn btn-primary float-right jh-create-entity" id="jh-create-entity">
            <FontAwesomeIcon icon="plus" />
            &nbsp; Create new Check List Item
          </Link>
        </h2>
        <div className="table-responsive">
          {checkListItemList && checkListItemList.length > 0 ? (
            <Table responsive>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Name</th>
                  <th>Is Done</th>
                  <th>Travel</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {checkListItemList.map((checkListItem, i) => (
                  <tr key={`entity-${i}`}>
                    <td>
                      <Button tag={Link} to={`${match.url}/${checkListItem.id}`} color="link" size="sm">
                        {checkListItem.id}
                      </Button>
                    </td>
                    <td>{checkListItem.name}</td>
                    <td>{checkListItem.isDone ? 'true' : 'false'}</td>
                    <td>{checkListItem.travel ? <Link to={`travel/${checkListItem.travel.id}`}>{checkListItem.travel.id}</Link> : ''}</td>
                    <td className="text-right">
                      <div className="btn-group flex-btn-group-container">
                        <Button tag={Link} to={`${match.url}/${checkListItem.id}`} color="info" size="sm">
                          <FontAwesomeIcon icon="eye" /> <span className="d-none d-md-inline">View</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${checkListItem.id}/edit`} color="primary" size="sm">
                          <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
                        </Button>
                        <Button tag={Link} to={`${match.url}/${checkListItem.id}/delete`} color="danger" size="sm">
                          <FontAwesomeIcon icon="trash" /> <span className="d-none d-md-inline">Delete</span>
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <div className="alert alert-warning">No Check List Items found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ checkListItem }: IRootState) => ({
  checkListItemList: checkListItem.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckListItem);
