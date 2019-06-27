import './showAll.scss';

import React from 'react';
import TravelCardItem from 'app/shared/layout/travelCard/travel-card-item';
import { connect } from 'react-redux';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Button, Col, Row, Table } from 'reactstrap';
// tslint:disable-next-line:no-unused-variable
import { ICrudGetAllAction, TextFormat } from 'react-jhipster';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { IRootState } from 'app/shared/reducers';
import { getEntities } from 'app/modules/travel/travel.reducer';
import { ITravel } from 'app/shared/model/travel.model';
// tslint:disable-next-line:no-unused-variable
import { APP_DATE_FORMAT, APP_LOCAL_DATE_FORMAT } from 'app/config/constants';

export interface ITravelProps extends StateProps, DispatchProps, RouteComponentProps<{ url: string }> {}

export class Travel extends React.Component<ITravelProps> {
  componentDidMount() {
    this.props.getEntities();
  }

  render() {
    const { travelList, match } = this.props;
    return (
      <div>
        <div className="table-responsive travel-container">
          {travelList && travelList.length > 0 ? (
            <section>
              <div className="container">
                <Row>
                  {travelList.map((travel, i) => (
                    <TravelCardItem
                      image="https://images.pexels.com/photos/247599/pexels-photo-247599.jpeg?h=350&amp;auto=compress&amp;cs=tinysrgb"
                      title={travel.title}
                      description={travel.description}
                      id={travel.id}
                      users={travel.users}
                      fromProfile=false
                    />
                  ))}
                </Row>
              </div>
            </section>
          ) : (
            <div className="alert alert-warning">No Travels found</div>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ travel }: IRootState) => ({
  travelList: travel.entities
});

const mapDispatchToProps = {
  getEntities
};

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Travel);
