import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './reaction.reducer';
import { IReaction } from 'app/shared/model/reaction.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IReactionDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class ReactionDetail extends React.Component<IReactionDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { reactionEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Reaction [<b>{reactionEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="type">Type</span>
            </dt>
            <dd>{reactionEntity.type}</dd>
            <dt>Owner</dt>
            <dd>{reactionEntity.owner ? reactionEntity.owner.id : ''}</dd>
            <dt>Travel</dt>
            <dd>{reactionEntity.travel ? reactionEntity.travel.id : ''}</dd>
            <dt>Photo</dt>
            <dd>{reactionEntity.photo ? reactionEntity.photo.id : ''}</dd>
            <dt>Comment</dt>
            <dd>{reactionEntity.comment ? reactionEntity.comment.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/reaction" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/reaction/${reactionEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ reaction }: IRootState) => ({
  reactionEntity: reaction.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ReactionDetail);
