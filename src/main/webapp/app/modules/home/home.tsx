import './home.scss';

import React from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IHomeProp extends StateProps, DispatchProps {}

export class Home extends React.Component<IHomeProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    const { account } = this.props;
    return (
      <Row>
        {/* Side bar */}
        <Col md="3">
          <div className="profilNav">
            <div className="userInfoNav">
              <div className="profilPhotoNav">
                {' '}
                <img />
              </div>
              <p className="text-center font-weight-bold"> {account.login}</p>
              <p className="text-left">{account && account.badge ? account.badge : '-no badge-'}</p>
            </div>
            <div className="text-left tripInforNav">
              <a href="/entity/travel">New trip</a> <br />
              <a href="">My trips</a>
            </div>
          </div>
        </Col>
        {/* Wall */}
        <Col md="6">
          <div className="wall">
            <p className="text-left font-weight-bold"> News</p>
          </div>
        </Col>
        {/* Trending destinations */}
        <Col md="3">
          <div className="trendingDestination">
            <p className="text-center font-weight-bold"> Trending destinations</p>
            <div className="trendingDestinationList" />
          </div>
        </Col>
      </Row>
    );
  }
}

const mapStateToProps = storeState => ({
  account: storeState.authentication.account,
  isAuthenticated: storeState.authentication.isAuthenticated
});

const mapDispatchToProps = { getSession };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Home);
