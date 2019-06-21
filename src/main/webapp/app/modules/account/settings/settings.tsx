import React from 'react';
import { Button, Col, Alert, Row } from 'reactstrap';
import { connect } from 'react-redux';

import { AvForm, AvField, AvGroup, Label } from 'availity-reactstrap-validation';

import { IRootState } from 'app/shared/reducers';
import { getSession } from 'app/shared/reducers/authentication';
import { saveAccountSettings, reset } from './settings.reducer';

import { IUserExtra } from 'app/shared/model/user-extra.model';
import { getEntity, updateEntity } from '../../../entities/user-extra/user-extra.reducer';
import { RouteComponentProps } from 'react-router';
import { mapIdList } from 'app/shared/util/entity-utils';

export interface IUserSettingsProps extends StateProps, DispatchProps {}

export interface IUserSettingsState {
  account: any;
}

// explicitly generate the start and end dates.
const now = new Date().toJSON().split('T')[0];

export class SettingsPage extends React.Component<IUserSettingsProps, IUserSettingsState> {
  componentDidMount() {
    this.props.getSession();
    this.props.getEntity(this.props.account.id);
  }

  componentWillUnmount() {
    this.props.reset();
  }

  handleValidSubmit = (event, values) => {
    const account = {
      ...this.props.account,
      ...values
    };

    this.props.saveAccountSettings(account);
    event.persist();
  };

  handleExtraUserValidSubmit = (event, values) => {
    const { userExtraEntity } = this.props;
    const entity = {
      ...userExtraEntity,
      ...values
    };

    this.props.updateEntity(entity);
    event.persist();
  };

  render() {
    const { account, userExtraEntity } = this.props;

    return (
      <div>
        <Row className="justify-content-center">
          <Col md="8">
            <h2 id="settings-title">User settings for {account.login}</h2>
            <AvForm id="settings-form" onValidSubmit={this.handleValidSubmit}>
              {/* First name */}
              <AvField
                className="form-control"
                name="firstName"
                label="First Name"
                id="firstName"
                placeholder="Your first name"
                validate={{
                  required: { value: true, errorMessage: 'Your first name is required.' },
                  minLength: { value: 1, errorMessage: 'Your first name is required to be at least 1 character' },
                  maxLength: { value: 50, errorMessage: 'Your first name cannot be longer than 50 characters' }
                }}
                value={account.firstName}
              />
              {/* Last name */}
              <AvField
                className="form-control"
                name="lastName"
                label="Last Name"
                id="lastName"
                placeholder="Your last name"
                validate={{
                  required: { value: true, errorMessage: 'Your last name is required.' },
                  minLength: { value: 1, errorMessage: 'Your last name is required to be at least 1 character' },
                  maxLength: { value: 50, errorMessage: 'Your last name cannot be longer than 50 characters' }
                }}
                value={account.lastName}
              />
              {/* Email */}
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
                value={account.email}
              />
              {/* ImageUrl */}
              <AvField name="imageUrl" label="Image URL" placeholder={'Your avatar image URL'} value={account.imageUrl} />
              <Button color="primary" type="submit">
                Save settings
              </Button>
            </AvForm>

            <hr />

            <h2 id="settings-title">User extra information</h2>
            <AvForm id="extra-user-form" onValidSubmit={this.handleExtraUserValidSubmit}>
              <AvField
                name="birthDate"
                label="Birth date"
                placeholder={'Your date of birth'}
                type="date"
                validate={{
                  max: { value: { now }, errorMessage: 'Your birth date cannot be in the future.' }
                }}
                value={userExtraEntity.birthDate}
              />

              <AvField
                name="description"
                label="Description"
                placeholder={'Your description'}
                type="textarea"
                validate={{
                  maxLength: { value: 254, errorMessage: 'Your description cannot be longer than 254 characters.' }
                }}
                value={userExtraEntity.description}
              />
              <Button color="primary" type="submit">
                Save extra information
              </Button>
            </AvForm>
          </Col>
        </Row>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication, userExtra }: IRootState) => ({
  account: authentication.account,
  isAuthenticated: authentication.isAuthenticated,
  userExtraEntity: userExtra.entity
});

const mapDispatchToProps = { getSession, saveAccountSettings, reset, getEntity, updateEntity };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SettingsPage);
