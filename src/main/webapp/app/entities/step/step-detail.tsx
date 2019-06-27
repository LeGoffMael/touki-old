import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from '../../modules/step/step.reducer';
import { IStep } from 'app/shared/model/step.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface IStepDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class StepDetail extends React.Component<IStepDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { stepEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Step [<b>{stepEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="title">Title</span>
            </dt>
            <dd>{stepEntity.title}</dd>
            <dt>
              <span id="description">Description</span>
            </dt>
            <dd>{stepEntity.description}</dd>
            <dt>
              <span id="startDate">Start Date</span>
            </dt>
            <dd>
              <TextFormat value={stepEntity.startDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="endDate">End Date</span>
            </dt>
            <dd>
              <TextFormat value={stepEntity.endDate} type="date" format={APP_LOCAL_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="createdAt">Created At</span>
            </dt>
            <dd>
              <TextFormat value={stepEntity.createdAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>
              <span id="updatedAt">Updated At</span>
            </dt>
            <dd>
              <TextFormat value={stepEntity.updatedAt} type="date" format={APP_DATE_FORMAT} />
            </dd>
            <dt>Travel</dt>
            <dd>{stepEntity.travel ? stepEntity.travel.id : ''}</dd>
            <dt>City</dt>
            <dd>{stepEntity.city ? stepEntity.city.id : ''}</dd>
            <dt>Places</dt>
            <dd>
              {stepEntity.places
                ? stepEntity.places.map((val, i) => (
                    <span key={val.id}>
                      <a>{val.id}</a>
                      {i === stepEntity.places.length - 1 ? '' : ', '}
                    </span>
                  ))
                : null}
            </dd>
          </dl>
          <Button tag={Link} to="/entity/step" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/step/${stepEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ step }: IRootState) => ({
  stepEntity: step.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(StepDetail);
