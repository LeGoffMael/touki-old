import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col, Label } from 'reactstrap';
import { AvFeedback, AvForm, AvGroup, AvInput, AvField } from 'availity-reactstrap-validation';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction, ICrudGetAllAction, ICrudPutAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IRootState } from 'app/shared/reducers';

import { ITravel } from 'app/shared/model/travel.model';
import { getEntities as getTravels } from 'app/entities/travel/travel.reducer';
import { getEntity, updateEntity, createEntity, reset } from './survey.reducer';
import { ISurvey } from 'app/shared/model/survey.model';
// tslint:disable-next-line:no-unused-variable
import { convertDateTimeFromServer, convertDateTimeToServer } from 'app/shared/util/date-utils';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface ISurveyUpdateProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface ISurveyUpdateState {
  isNew: boolean;
  travelId: string;
}

export class SurveyUpdate extends React.Component<ISurveyUpdateProps, ISurveyUpdateState> {
  constructor(props) {
    super(props);
    this.state = {
      travelId: '0',
      isNew: !this.props.match.params || !this.props.match.params.id
    };
  }

  componentWillUpdate(nextProps, nextState) {
    if (nextProps.updateSuccess !== this.props.updateSuccess && nextProps.updateSuccess) {
      this.handleClose();
    }
  }

  componentDidMount() {
    if (this.state.isNew) {
      this.props.reset();
    } else {
      this.props.getEntity(this.props.match.params.id);
    }

    this.props.getTravels();
  }

  saveEntity = (event, errors, values) => {
    if (errors.length === 0) {
      const { surveyEntity } = this.props;
      const entity = {
        ...surveyEntity,
        ...values
      };

      if (this.state.isNew) {
        this.props.createEntity(entity);
      } else {
        this.props.updateEntity(entity);
      }
    }
  };

  handleClose = () => {
    this.props.history.push('/entity/survey');
  };

  render() {
    const { surveyEntity, travels, loading, updating } = this.props;
    const { isNew } = this.state;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="toukiApp.survey.home.createOrEditLabel">Create or edit a Survey</h2>
          </Col>
        </Row>
        <Row className="justify-content-center">
          <Col md="8">
            {loading ? (
              <p>Loading...</p>
            ) : (
              <AvForm model={isNew ? {} : surveyEntity} onSubmit={this.saveEntity}>
                {!isNew ? (
                  <AvGroup>
                    <Label for="survey-id">ID</Label>
                    <AvInput id="survey-id" type="text" className="form-control" name="id" required readOnly />
                  </AvGroup>
                ) : null}
                <AvGroup>
                  <Label id="labelLabel" for="survey-label">
                    Label
                  </Label>
                  <AvField
                    id="survey-label"
                    type="text"
                    name="label"
                    validate={{
                      required: { value: true, errorMessage: 'This field is required.' }
                    }}
                  />
                </AvGroup>
                <AvGroup>
                  <Label for="survey-travel">Travel</Label>
                  <AvInput id="survey-travel" type="select" className="form-control" name="travel.id">
                    <option value="" key="0" />
                    {travels
                      ? travels.map(otherEntity => (
                          <option value={otherEntity.id} key={otherEntity.id}>
                            {otherEntity.id}
                          </option>
                        ))
                      : null}
                  </AvInput>
                </AvGroup>
                <Button tag={Link} id="cancel-save" to="/entity/survey" replace color="info">
                  <FontAwesomeIcon icon="arrow-left" />
                  &nbsp;
                  <span className="d-none d-md-inline">Back</span>
                </Button>
                &nbsp;
                <Button color="primary" id="save-entity" type="submit" disabled={updating}>
                  <FontAwesomeIcon icon="save" />
                  &nbsp; Save
                </Button>
              </AvForm>
            )}
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  travels: storeState.travel.entities,
  surveyEntity: storeState.survey.entity,
  loading: storeState.survey.loading,
  updating: storeState.survey.updating,
  updateSuccess: storeState.survey.updateSuccess
});

const mapDispatchToProps = {
  getTravels,
  getEntity,
  updateEntity,
  createEntity,
  reset
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SurveyUpdate);
