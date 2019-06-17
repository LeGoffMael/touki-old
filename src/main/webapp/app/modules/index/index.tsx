import './index.scss';

import React from 'react';
import { Link, Redirect } from 'react-router-dom';

import { connect } from 'react-redux';
import { Row, Col, Alert } from 'reactstrap';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';

export interface IIndexProp extends StateProps, DispatchProps {}

export class Index extends React.Component<IIndexProp> {
  componentDidMount() {
    this.props.getSession();
  }

  render() {
    // Authificated redirect to home
    if (this.props.isAuthenticated) {
      return <Redirect to="/home" />;
    }

    return (
      <Row>
        <Col md="9">
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>

          <h2>Index page (🚫 Not connected)</h2>
        </Col>
        <Col md="3" className="pad">
          <span className="hipster rounded" />
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
)(Index);
