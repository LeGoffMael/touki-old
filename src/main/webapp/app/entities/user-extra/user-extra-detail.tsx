import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './user-extra.reducer';
import { IUserExtra } from 'app/shared/model/user-extra.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IUserExtraDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class UserExtraDetail extends React.Component<IUserExtraDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { userExtraEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            UserExtra [<b>{userExtraEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="birthDate">Birth Date</span>
            </dt>
            <dd>
              <TextFormat value={userExtraEntity.birthDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{userExtraEntity.description}</dd>
            <dt>User</dt>
            <dd>{userExtraEntity.user ? userExtraEntity.user.id : ''}</dd>
            <dt>Badges</dt>
            <dd>
              {userExtraEntity.badges
                ? userExtraEntity.badges.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === userExtraEntity.badges.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
            <dt>Followings</dt>
            <dd>
              {userExtraEntity.followings
                ? userExtraEntity.followings.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === userExtraEntity.followings.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/user-extra" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/user-extra/${userExtraEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ userExtra }: IRootState) => ({
  userExtraEntity: userExtra.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserExtraDetail);
