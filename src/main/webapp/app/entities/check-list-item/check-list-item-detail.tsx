import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './check-list-item.reducer';
import { ICheckListItem } from 'app/shared/model/check-list-item.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICheckListItemDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CheckListItemDetail extends React.Component<ICheckListItemDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { checkListItemEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            CheckListItem [<b>{checkListItemEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{checkListItemEntity.name}</dd>
            <dt>
              <span id="isDone">Is Done</span>
            </dt>
            <dd>{checkListItemEntity.isDone ? 'true' : 'false'}</dd>
            <dt>Travel</dt>
            <dd>{checkListItemEntity.travel ? checkListItemEntity.travel.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/check-list-item" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/check-list-item/${checkListItemEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ checkListItem }: IRootState) => ({
  checkListItemEntity: checkListItem.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckListItemDetail);
