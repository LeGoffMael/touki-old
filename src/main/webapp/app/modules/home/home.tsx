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
        {/* Trending destinations */}
        <Col md="3">
          <div className="trendingDestination">
            <p className="text-center font-weight-bold"> Trending destinations</p>
            <div className="trendingDestinationList" />
          </div>
        </Col>
        {/* Wall */}
        <Col md="9">
          <h1>TIMELINE</h1>
          {/* section 1 */}
          <section id="timeline" className="timeline-container">
            <div className="timeline-block">
              <div className="timeline-icon picture">
                <img src="http://cristykoebler.com/picture_library/picture.svg" alt="Picture" />
              </div>
              <div className="timeline-content">
                <h2>Born</h2>
                <img src="http://cristykoebler.com/picture_library/Timeline/Baby150.gif" alt="I was born in 1983" />
                <span className="timeline-date">
                  <h3>1983</h3>
                </span>
              </div>
            </div>
            {/* section 2 */}
            <div className="timeline-block">
              <div className="timeline-icon picture">
                <img src="http://cristykoebler.com/picture_library/picture.svg" alt="Picture" />
              </div>
              <div className="timeline-content">
                <h2>Hit in the head with a golf club by my brother (but I still think I’m a tough girl)</h2>
                <img
                  src="http://cristykoebler.com/picture_library/Timeline/HitByGolfClub150.gif"
                  alt="Hit in the head with a golf club by my brother (but I'm still pretty tough)"
                />
                <span className="timeline-date">
                  <h3>1986</h3>
                </span>
              </div>
            </div>
            {/* section 3 */}
            <div className="timeline-block">
              <div className="timeline-icon picture">
                <img src="http://cristykoebler.com/picture_library/picture.svg" alt="Picture" />
              </div>
              <div className="timeline-content">
                <h2>Discovering that weird runs in the family</h2>
                <img
                  src="http://cristykoebler.com/picture_library/Timeline/WeirdFamily150.gif"
                  alt="Discovering that weird runs in the family"
                />
                <span className="timeline-date">
                  <h3>1989</h3>
                </span>
              </div>
            </div>
          </section>
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
