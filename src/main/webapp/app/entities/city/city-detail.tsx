import React from 'react';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Row, Col } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAction } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntity } from './city.reducer';
import { ICity } from 'app/shared/model/city.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ICityDetailProps extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export class CityDetail extends React.Component<ICityDetailProps> {
  componentDidMount() {
    this.props.getEntity(this.props.match.params.id);
  }

  render() {
    const { cityEntity } = this.props;
    return (
      <Row>
        <Col md="8">
          <h2>
            City [<b>{cityEntity.id}</b>]
          </h2>
          <dl className="jh-entity-details">
            <dt>
              <span id="name">Name</span>
            </dt>
            <dd>{cityEntity.name}</dd>
            <dt>
              <span id="latitude">Latitude</span>
            </dt>
            <dd>{cityEntity.latitude}</dd>
            <dt>
              <span id="longitude">Longitude</span>
            </dt>
            <dd>{cityEntity.longitude}</dd>
            <dt>Country</dt>
            <dd>{cityEntity.country ? cityEntity.country.id : ''}</dd>
          </dl>
          <Button tag={Link} to="/entity/city" replace color="info">
            <FontAwesomeIcon icon="arrow-left" /> <span className="d-none d-md-inline">Back</span>
          </Button>
          &nbsp;
          <Button tag={Link} to={`/entity/city/${cityEntity.id}/edit`} replace color="primary">
            <FontAwesomeIcon icon="pencil-alt" /> <span className="d-none d-md-inline">Edit</span>
          </Button>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = ({ city }: IRootState) => ({
  cityEntity: city.entity
});

const mapDispatchToProps = { getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CityDetail);
