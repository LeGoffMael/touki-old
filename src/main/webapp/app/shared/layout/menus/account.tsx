import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';

import { NavDropdown } from './menu-components';

const accountMenuItemsAuthenticated = (
  <>
    <MenuItem icon="user" to="/profile">
      Profile
    </MenuItem>
    <MenuItem icon="plus" to="/travel/new">
      New travel
    </MenuItem>
    <DropdownItem divider />
    <MenuItem icon="wrench" to="/account/settings">
      Edit profile
    </MenuItem>
    <MenuItem icon="lock" to="/account/password">
      Password
    </MenuItem>
    <DropdownItem divider />
    <MenuItem icon="sign-out-alt" to="/logout">
      Sign out
    </MenuItem>
  </>
);

export const AccountMenu = ({ isAuthenticated = false, userLogin, userImageUrl }) => (
  <NavDropdown name={userLogin} image={userImageUrl} id="account-menu">
    {isAuthenticated && accountMenuItemsAuthenticated}
  </NavDropdown>
);

export default AccountMenu;
