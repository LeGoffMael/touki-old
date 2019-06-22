import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './survey.reducer';
import { ISurvey } from 'app/shared/model/survey.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ISurveyDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class SurveyDetail extends React.Component<ISurveyDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { surveyEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            Survey [<b>{surveyEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="label">Label</span>
            </dt>
            <dd>{surveyEntity.label}</dd>
            <dt>Travel</dt>
            <dd>{surveyEntity.travel ? surveyEntity.travel.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/survey" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/survey/${surveyEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ survey }: IRootState) => ({
  surveyEntity: survey.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyDetail);
