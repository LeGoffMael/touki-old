import './profile.scss';

import React from 'react';
import { RouteComponentProps, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Row, Col, Button, Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { getEntity } from 'app/entities/user-extra/user-extra.reducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faAt, faPlane, faUserFriends, faUsers, faCertificate, faPercent } from '@fortawesome/free-solid-svg-icons';
import UserCardItem from 'app/shared/layout/userCard/user-card-item';

export interface IProfileProp extends StateProps, DispatchProps, RouteComponentProps<{ id: string }> {}

export interface IProfileState {
  himSelf: boolean;
  activeTab: string;
  isFollowing: boolean;
  nbTravels: number;
  nbFollowing: number;
  nbFollowers: number;
  nbBadges: number;
}

export class Profile extends React.Component<IProfileProp, IProfileState> {
  state: IProfileState = {
    himSelf: this.props.match.params.id === undefined ? true : false,
    activeTab: '1',
    isFollowing: false,
    nbTravels: 0,
    nbFollowing: 0,
    nbFollowers: 0,
    nbBadges: 0
  };

  componentDidMount() {
    this.props.getSession();
    this.fetchUserData();
  }

  componentDidUpdate(prevProps) {
    // Typical usage (don't forget to compare props):
    if (this.props.match.params.id !== prevProps.match.params.id) {
      this.fetchUserData();
    }
  }

  /**
   * Retrieve the correct user data depending of the page (connected or other)
   */
  fetchUserData() {
    // If the user to display is the connected user
    if (this.props.account.id !== undefined && (this.state.himSelf || this.props.account.id === this.props.match.params.id)) {
      this.props.getEntity(this.props.account.id);
      this.state.himSelf = true;
      // Else display the user id provide in the path
    } else if (!this.state.himSelf) {
      // @ts-ignore
      this.props.getEntity(this.props.match.params.id).then(response => {
        // Check if connected user follow user passed
        if (response.value.data.followers !== null) {
          for (const user of response.value.data.followers) {
            if (user.id === this.props.account.id) {
              this.state.isFollowing = true;
              break;
            }
          }
        }
      });
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
    // Count number of elements
    this.state.nbTravels = this.props.userExtraEntity.travels == null ? 0 : this.props.userExtraEntity.travels.length;
    this.state.nbFollowing = this.props.userExtraEntity.followings == null ? 0 : this.props.userExtraEntity.followings.length;
    this.state.nbFollowers = this.props.userExtraEntity.followers == null ? 0 : this.props.userExtraEntity.followers.length;
    this.state.nbBadges = this.props.userExtraEntity.badges == null ? 0 : this.props.userExtraEntity.badges.length;

    const { userExtraEntity } = this.props;
    const { himSelf, isFollowing, activeTab, nbTravels, nbFollowing, nbFollowers, nbBadges } = this.state;

    console.log(userExtraEntity);

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
                  <span className="u-travels">{nbTravels} travels</span>
                </Col>
              </Row>
              <Row>
                {himSelf ? (
                  <Button outline href="/account/settings" className="profile-btn profile-edit-btn">
                    Edit profile
                  </Button>
                ) : !isFollowing ? (
                  <Button outline href="" className="profile-btn profile-add-btn">
                    Follow
                  </Button>
                ) : (
                  <Button outline href="" className="profile-btn profile-dlt-btn">
                    <span>Following</span>
                    <span>Unfollow</span>
                  </Button>
                )}
              </Row>
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
                    <NavLink className={`nav-link ${activeTab === '1' && ' active'}`} onClick={() => this.toggleTab('1')}>
                      <FontAwesomeIcon icon={faPlane} /> Travels ({nbTravels})
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-items">
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <NavLink className={`nav-link ${activeTab === '2' && ' active'}`} onClick={() => this.toggleTab('2')}>
                      <FontAwesomeIcon icon={faUserFriends} /> Following ({nbFollowing})
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-items">
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <NavLink className={`nav-link ${activeTab === '3' && ' active'}`} onClick={() => this.toggleTab('3')}>
                      <FontAwesomeIcon icon={faUsers} /> Followers ({nbFollowers})
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-items">
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <NavLink className={`nav-link ${activeTab === '4' && ' active'}`} onClick={() => this.toggleTab('4')}>
                      <FontAwesomeIcon icon={faCertificate} /> Badges ({nbBadges})
                    </NavLink>
                  </NavItem>
                  <NavItem className="nav-items">
                    {/* tslint:disable-next-line:jsx-no-lambda */}
                    <NavLink disabled className={`nav-link ${activeTab === '5' && ' active'}`} onClick={() => this.toggleTab('5')}>
                      <FontAwesomeIcon icon={faPercent} /> Statistics
                    </NavLink>
                  </NavItem>
                </Nav>
              </Row>
              <Row>
                <TabContent activeTab={activeTab}>
                  <TabPane tabId="1">
                    <Row>
                      <Col sm="12">
                        <h1>Travels gallery</h1>
                        <ul>
                          {userExtraEntity.travels.map((travel, i) => (
                            <li key={i}>
                              <Link className="profile-relation" to={`/entity/travel/${travel.id}`}>
                                {travel.title}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="2">
                    {userExtraEntity.followings && userExtraEntity.followings.length > 0 ? (
                      <section>
                        <div className="container">
                          <Row className="card-deck">
                            {userExtraEntity.followings.map((following, i) => (
                              <UserCardItem
                                key={i}
                                id={following.user.id}
                                login={following.user.login}
                                firstName={following.user.firstName}
                                lastName={following.user.lastName}
                                imageUrl={following.user.imageUrl}
                                description={following.description}
                              />
                            ))}
                          </Row>
                        </div>
                      </section>
                    ) : (
                      <Row className="alert alert-warning">No following found</Row>
                    )}
                  </TabPane>
                  <TabPane tabId="3">
                    {userExtraEntity.followers && userExtraEntity.followers.length > 0 ? (
                      <section>
                        <div className="container">
                          <Row className="card-deck">
                            {userExtraEntity.followers.map((follower, i) => (
                              <UserCardItem
                                key={i}
                                id={follower.user.id}
                                login={follower.user.login}
                                firstName={follower.user.firstName}
                                lastName={follower.user.lastName}
                                imageUrl={follower.user.imageUrl}
                                description={follower.description}
                              />
                            ))}
                          </Row>
                        </div>
                      </section>
                    ) : (
                      <Row className="alert alert-warning">No follower found</Row>
                    )}
                  </TabPane>
                  <TabPane tabId="4">
                    <Row>
                      <Col sm="12">
                        <h1>Badges</h1>
                        <ul>
                          {userExtraEntity.badges.map((badge, i) => (
                            <li key={i}>{badge.label}</li>
                          ))}
                        </ul>
                      </Col>
                    </Row>
                  </TabPane>
                  <TabPane tabId="5">
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