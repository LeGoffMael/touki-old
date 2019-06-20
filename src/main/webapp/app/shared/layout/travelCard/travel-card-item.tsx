import './travel-card-item.scss';

import React from 'react';
import { Row, Col } from 'reactstrap';
import { NavLink as Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconProp } from '@fortawesome/fontawesome-svg-core';

export interface ITravelCardItem {
  image: string;
  title: string;
  description: string;
  id: number;
}

export default class TravelCardItem extends React.Component<ITravelCardItem> {
  render() {
    const { image, title, description, id } = this.props;

    return (
      <Col md="4">
        <a className="travel-card-link" href={'/entity/travel/' + id}>
          <div className="travel-card">
            <img className="card-image" src={image}/>
            <div className="card-body">
              <h4 className="card-title">
                {title}
              </h4>
              <p className="card-text">
                {description}
              </p>
            </div>
          </div>
        </a>
      </Col>
    );
  }
}
