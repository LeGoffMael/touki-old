import React from 'react';
import MenuItem from 'app/shared/layout/menus/menu-item';
import { DropdownItem } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { NavLink as Link } from 'react-router-dom';
import { NavDropdown } from './menu-components';

export const EntitiesMenu = props => (
  // tslint:disable-next-line:jsx-self-close
  <NavDropdown icon="th-list" name="Entities" id="entity-menu">
    <MenuItem icon="asterisk" to="/entity/travel">
      Travel
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/user-extra">
      User Extra
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/step">
      Step
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/photo">
      Photo
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/reaction">
      Reaction
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/comment">
      Comment
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/check-list-item">
      Check List Item
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/badge">
      Badge
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/answer">
      Answer
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/answer-user">
      Answer User
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/question">
      Question
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/survey">
      Survey
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/place">
      Place
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/city">
      City
    </MenuItem>
    <MenuItem icon="asterisk" to="/entity/country">
      Country
    </MenuItem>
    {/* jhipster-needle-add-entity-to-menu - JHipster will add entities to the menu here */}
  </NavDropdown>
);
