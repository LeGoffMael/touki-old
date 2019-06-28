import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';
import TravelCardItem from 'app/shared/layout/travelCard/travel-card-item';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntities as getTravels } from 'app/modules/travel/travel.reducer';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
    this.props.getTravels();
  }

  render() {
    const { account, travelEntities } = this.props;
    return (
      <Row>
        <Col md="3">
          <div className="trendingDestination">
            <p className="text-center font-weight-bold"> Trending destinations</p>
            <div className="trendingDestinationList">
              <p>In coming</p>
            </div>
          </div>
        </Col>
        <Col md="9">
          <section>
            <div className="container">
              <Row className="card-deck">
                {travelEntities && travelEntities.length > 0 ? (
                  <section>
                    <div className="container">
                      <Row>
                        {travelEntities.map((travel, i) => (
                          <TravelCardItem
                            image={
                              travel.steps[0] !== undefined
                                ? travel.steps[0].photos[0] !== undefined
                                  ? travel.steps[0].photos[0].link
                                  : 'content/images/default-photo.png'
                                : 'content/images/default-photo.png'
                            }
                            title={travel.title}
                            description={travel.description}
                            id={travel.id}
                            users={travel.users}
                            fromProfile={false}
                          />
                        ))}
                      </Row>
                    </div>
                  </section>
                ) : (
                  <div className="alert alert-warning">No Travels found</div>
                )}
              </Row>
            </div>
          </section>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated,
  travelEntities: storeState.travel.entities
});

const mapDispatchToProps = { getSession, getTravels };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
