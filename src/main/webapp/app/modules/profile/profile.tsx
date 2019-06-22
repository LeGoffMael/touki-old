import './profile.scss';

import React from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntity } from 'app/entities/user-extra/user-extra.reducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAt, faPlane, faUserFriends, faCertificate, faPercent } from '@fortawesome/free-solid-svg-icons';

export interface IProfileProp extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfileState {
  himSelf: boolean;
  activeTab: string;
}

export class Profile extends React.Component<IProfileProp, IProfileState> {
  state: IProfileState = {
    himSelf: this.props.match.params.id === undefined ? true : false,
    activeTab: '1'
  };

  componentDidMount() {
    this.props.getSession();

    if (this.props.account.id !== undefined && this.state.himSelf) {
      this.props.getEntity(this.props.account.id);
      location.reload();
    } else if (!this.state.himSelf) {
      this.props.getEntity(this.props.match.params.id);
    }
  }

  toggleTab(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  render() {
    const { userExtraEntity } = this.props;
    return (
      <div>
        {userExtraEntity.user !== undefined ? (
          <Row className="touki-profile">
            <Col md="3">
              <Row className="profile-img">
                <img src={userExtraEntity.user.imageUrl} />
              </Row>
              <Row className="profile-head profile-data">
                <Col>
                  <span className="u-fullName">
                    {userExtraEntity.user.firstName} {userExtraEntity.user.lastName}
                  </span>
                  <span className="u-login">
                    <FontAwesomeIcon icon={faAt} />
                    {userExtraEntity.user.login}
                  </span>
                </Col>
              </Row>
              {this.state.himSelf && (
                <Row>
                  <Button outline href="/account/settings" className="profile-edit-btn">
                    Edit profile
                  </Button>
                </Row>
              )}
              <Row className="profile-head-more profile-data">
                <Col>
                  <span className="u-description">{userExtraEntity.description}</span>
                  <span className="u-email">
                    <FontAwesomeIcon icon={faEnvelope} /> <a href={`mailto:${userExtraEntity.user.email}`}>{userExtraEntity.user.email}</a>
                  </span>
                </Col>
              </Row>
            </Col>
            <Col md="9">
              <Row>
                <Nav tabs className="navfa-tabs">
                  <NavItem className="nav-items">
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <NavLink
                      className={`${this.state.activeTab === '1' ? 'nav-link active' : 'nav-link'}`}
                      onClick={() => this.toggleTab('1')}
                    >
                      <FontAwesomeIcon icon={faPlane} /> Travels
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-items">
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <NavLink
                      className={`${this.state.activeTab === '2' ? 'nav-link active' : 'nav-link'}`}
                      onClick={() => this.toggleTab('2')}
                    >
                      <FontAwesomeIcon icon={faUserFriends} /> Friends
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-items">
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <NavLink
                      className={`${this.state.activeTab === '3' ? 'nav-link active' : 'nav-link'}`}
                      onClick={() => this.toggleTab('3')}
                    >
                      <FontAwesomeIcon icon={faCertificate} /> Badges
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-items">
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <NavLink
                      disabled
                      className={`${this.state.activeTab === '4' ? 'nav-link active' : 'nav-link'}`}
                      onClick={() => this.toggleTab('4')}
                    >
                      <FontAwesomeIcon icon={faPercent} /> Statistics
                    </NavLink>
                  </NavItem>
                </Nav>
              </Row>
              <Row>
                <TabContent activeTab={this.state.activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <h1>Travels gallery</h1>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    <Row>
                      <Col sm="12">
                        <h1>Friends</h1>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="3">
                    <Row>
                      <Col sm="12">
                        <h1>Badges</h1>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col sm="12">
                        <h1>Statistics are coming soon</h1>
                      </Col>
                    </Row>
                  </TabPane>
                </TabContent>
              </Row>
            </Col>
          </Row>
        ) : (
          <div className="app-loading" />
        )}
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, userExtra }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  userExtraEntity: userExtra.entity
});

const mapDispatchToProps = { getSession, getEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
