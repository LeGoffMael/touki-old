import React from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';

import { IRootState } from 'app/shared/reducers';
import { logout } from 'app/shared/reducers/authentication';

export interface ILogoutProps extends StateProps, DispatchProps {
  idToken: string;
  logoutUrl: string;
}

export class Logout extends React.Component<ILogoutProps> {
  componentDidMount() {
    this.props.logout();
  }

  render() {
    const logoutUrl = this.props.logoutUrl;
    if (logoutUrl) {
      // if Keycloak, logoutUrl has protocol/openid-connect in it
      window.location.href =
        logoutUrl.indexOf('/protocol') > -1
          ? logoutUrl + '?redirect_uri=' + window.location.origin
          : logoutUrl + '?id_token_hint=' + this.props.idToken + '&post_logout_redirect_uri=' + window.location.origin;
    }

    return <Redirect to="/index" />;
  }
}

const mapStateToProps = (storeState: IRootState) => ({
  logoutUrl: storeState.authentication.logoutUrl,
  idToken: storeState.authentication.idToken
});

const mapDispatchToProps = { logout };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Logout);
