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
  users?: any;
  fromProfile: boolean;
}

export default class TravelCardItem extends React.Component<ITravelCardItem> {
  render() {
    const { image, title, description, id, users, fromProfile } = this.props;
    console.log(this.props);
    if(fromProfile == true){
      return (
        <Col md="4">
          <a className="travel-card-link" href={'travel/' + id}>
            <div className="travel-card">
              <img className="card-image" src={image} />
              <div className="card-body">
                <h4 className="card-title">{title}</h4>
                <p className="card-text">{description}</p>
              </div>
            </div>
          </a>
        </Col>
      );
    }else{
      return (
        <Col md="12">
          <a className="travel-card-link" href={'travel/' + id}>
            <div className="travel-card">
              <Row>
                <Col sm="4">
                  <img className="card-image-large my-auto" src={image} />
                </Col>
                <Col sm="8">
                  <div className="card-body">
                    <h4 className="card-title">{title}</h4>
                    <p className="card-text">{description}</p>
                    <p className="card-users">Jean, Jacques, Goldman</p>
                  </div>
                </Col>
              </Row>
            </div>
          </a>
        </Col>
      );
    }
  }
}
