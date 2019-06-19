import './index.scss';

import React from 'react';
import { Link, Redirect, RouteComponentProps } from 'react-router-dom';
import { AvForm, AvField, AvGroup, AvInput } from 'availity-reactstrap-validation';

import { connect } from 'react-redux';

import { Container, Row, Col, Alert, Button, Label } from 'reactstrap';
import { IRootState } from 'app/shared/reducers';
import { login } from 'app/shared/reducers/authentication';

import PasswordStrengthBar from 'app/shared/layout/password/password-strength-bar';
import { handleRegister, reset } from '../account/register/register.reducer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight, faPlane } from '@fortawesome/free-solid-svg-icons';

export interface IIndexProp extends StateProps, DispatchProps, RouteComponentProps<{}> {}

export interface IIndexState {
  isLogin: boolean;
  backgroundId: number;
  loginError: boolean;
  password: string;
}

// List of the index backgrounds
const backgroundsList = [
  'https://images7.alphacoders.com/525/thumb-1920-525304.jpg',
  'https://www.nationalgeographic.com/content/dam/travel/2018-digital/temple-of-hatshepsut/temple-of-hatshepsut.ngsversion.1531841411295.adapt.1900.1.jpg',
  'https://c.pxhere.com/photos/37/83/ancient_architecture_asia_castle_culture_daylight_famous_historic-1560699.jpg!d'
];

export class Index extends React.Component<IIndexProp, IIndexState> {
  state: IIndexState = {
    isLogin: true,
    backgroundId: Math.floor(Math.random() * (backgroundsList.length - 1 - 0 + 1)) + 0,
    loginError: false,
    password: ''
  };

  handleLogin = (event, errors, { username, password, rememberMe }) => {
    this.state.loginError = errors !== [] ? true : false;

    this.props.login(username, password, rememberMe);
  };

  handleRegistration = (event, values) => {
    this.props.handleRegister(values.username, values.email, values.firstPassword);
    event.preventDefault();
  };

  updatePassword = event => {
    this.setState({ password: event.target.value });
  };

  componentDidMount() {
    // Change background
    setInterval(() => {
      this.setState({ backgroundId: this.state.backgroundId <= backgroundsList.length - 2 ? this.state.backgroundId + 1 : 0 });
    }, 8000);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  toggleLogin = () => {
    this.setState({ isLogin: !this.state.isLogin });
  };

  render() {
    const { loginError } = this.state;

    // Authificated redirect to home
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" />;
    }

    return (
      <div className="limiter">
        <div className="container-login">
          <div className="cover" style={{ background: "url('" + backgroundsList[this.state.backgroundId] + "')" }}>
            <div className="cover-content">
              <div className="title">
                <FontAwesomeIcon icon={faPlane} /> Touki
              </div>
              <div>Discover the world !</div>
            </div>
          </div>
          <div className="wrap-login">
            {this.state.isLogin ? (
              <AvForm className="login-form" onSubmit={this.handleLogin}>
                <span className="login-form-title">Sign in</span>

                <Col md="12">
                  {loginError ? (
                    <Alert color="danger">
                      <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </Alert>
                  ) : null}
                </Col>

                <Col md="12">
                  <AvField name="username" label="Username" placeholder="Your username" required errorMessage="Username cannot be empty!" />
                  <AvField
                    name="password"
                    type="password"
                    label="Password"
                    placeholder="Your password"
                    required
                    errorMessage="Password cannot be empty!"
                  />

                  <AvGroup check inline className="remember-me-form">
                    <Label className="form-check-label">
                      <AvInput type="checkbox" name="rememberMe" /> Remember me
                    </Label>
                  </AvGroup>
                </Col>

                <div className="container-login-form-btn">
                  <div className="wrap-login-form-btn">
                    <div className="login-form-bgbtn" />
                    <button className="login-form-btn" type="submit">
                      Sign In
                    </button>
                  </div>

                  <a href="/reset/request" className="dis-block txt3 hov1">
                    Did you forget your password?
                  </a>

                  <div>
                    You don't have an account yet?{' '}
                    <Link to="#" onClick={this.toggleLogin} className="dis-block txt3 hov1">
                      Register a new account
                    </Link>
                  </div>
                </div>
              </AvForm>
            ) : (
              <AvForm id="register-form" className="login-form" onValidSubmit={this.handleRegistration}>
                <span className="login-form-title">Registration</span>

                <Col md="12">
                  {loginError ? (
                    <Alert color="danger">
                      <strong>Failed to sign in!</strong> Please check your credentials and try again.
                    </Alert>
                  ) : null}
                </Col>

                <Col md="12">
                  <AvField
                    name="username"
                    label="Username"
                    placeholder={'Your username'}
                    validate={{
                      required: { value: true, errorMessage: 'Your username is required.' },
                      pattern: { value: '^[_.@A-Za-z0-9-]*$', errorMessage: 'Your username can only contain letters and digits.' },
                      minLength: { value: 1, errorMessage: 'Your username is required to be at least 1 character.' },
                      maxLength: { value: 50, errorMessage: 'Your username cannot be longer than 50 characters.' }
                    }}
                  />
                  <AvField
                    name="email"
                    label="Email"
                    placeholder={'Your email'}
                    type="email"
                    validate={{
                      required: { value: true, errorMessage: 'Your email is required.' },
                      minLength: { value: 5, errorMessage: 'Your email is required to be at least 5 characters.' },
                      maxLength: { value: 254, errorMessage: 'Your email cannot be longer than 50 characters.' }
                    }}
                  />
                  <AvField
                    name="firstPassword"
                    label="New password"
                    placeholder={'New password'}
                    type="password"
                    onChange={this.updatePassword}
                    validate={{
                      required: { value: true, errorMessage: 'Your password is required.' },
                      minLength: { value: 4, errorMessage: 'Your password is required to be at least 4 characters.' },
                      maxLength: { value: 50, errorMessage: 'Your password cannot be longer than 50 characters.' }
                    }}
                  />
                  <PasswordStrengthBar password={this.state.password} />
                  <AvField
                    name="secondPassword"
                    label="New password confirmation"
                    placeholder="Confirm the new password"
                    type="password"
                    validate={{
                      required: { value: true, errorMessage: 'Your confirmation password is required.' },
                      minLength: { value: 4, errorMessage: 'Your confirmation password is required to be at least 4 characters.' },
                      maxLength: { value: 50, errorMessage: 'Your confirmation password cannot be longer than 50 characters.' },
                      match: { value: 'firstPassword', errorMessage: 'The password and its confirmation do not match!' }
                    }}
                  />
                </Col>

                <div className="container-login-form-btn">
                  <div className="wrap-login-form-btn">
                    <div className="login-form-bgbtn" />
                    <button className="login-form-btn">Sign Up</button>
                  </div>

                  <Link to="/" onClick={this.toggleLogin} className="dis-block txt3 hov1">
                    Sign in <FontAwesomeIcon icon={faLongArrowAltRight} />
                  </Link>
                </div>
              </AvForm>
            )}
            <div className="footer">© 2019 - Touki. Developed in Belfort.</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }: IRootState) => ({
  isAuthenticated: authentication.isAuthenticated,
  loginError: authentication.loginError,
  showModal: authentication.showModalLogin
});

const mapDispatchToProps = { login, handleRegister, reset };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Index);
