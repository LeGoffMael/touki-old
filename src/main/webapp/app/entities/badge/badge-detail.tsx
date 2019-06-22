import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './badge.reducer';
import { IBadge } from 'app/shared/model/badge.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IBadgeDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class BadgeDetail extends React.Component<IBadgeDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { badgeEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Badge [<b>{badgeEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="label">Label</span>
            </dt>
            <dd>{badgeEntity.label}</dd>
            <dt>
              <span id="icon">Icon</span>
            </dt>
            <dd>{badgeEntity.icon}</dd>
            <dt>
              <span id="text">Text</span>
            </dt>
            <dd>{badgeEntity.text}</dd>
          </dl>
          <Button tag={Link} to="/entity/badge" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/badge/${badgeEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ badge }: IRootState) => ({
  badgeEntity: badge.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(BadgeDetail);
