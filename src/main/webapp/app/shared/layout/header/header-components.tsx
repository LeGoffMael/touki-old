import React from 'react';

import { NavItem, NavLink, NavbarBrand } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import appConfig from 'app/config/constants';
import { faPlane } from '@fortawesome/free-solid-svg-icons';

// TODO : Update app logo
export const BrandIcon = props => (
  <div {...props} className="brand-icon">
    {false && <img src="content/images/logo-jhipster.png" alt="Logo" />}
  </div>
);

export const Brand = props => (
  <NavbarBrand tag={Link} to="/home" className="brand-logo">
    <BrandIcon />
    <span className="brand-title">
      <FontAwesomeIcon icon={faPlane} /> Touki
    </span>
  </NavbarBrand>
);

export const Home = props => (
  <NavItem>
    <NavLink tag={Link} to="/home" className="d-flex align-items-center">
      <FontAwesomeIcon icon="home" />
      <span>Home</span>
    </NavLink>
  </NavItem>
);
