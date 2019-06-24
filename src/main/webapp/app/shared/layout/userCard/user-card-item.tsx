import './user-card-item.scss';

import React from 'react';
import { Media, Col, Card, CardImg, CardBody, CardTitle, CardSubtitle, CardText } from 'reactstrap';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt } from '@fortawesome/free-solid-svg-icons';

export interface IUserCardItem {
  id: string;
  login: string;
  firstName: string;
  lastName: string;
  imageUrl: string;
  description: string;
}

export default class UserCardItem extends React.Component<IUserCardItem> {
  render() {
    const { id, login, firstName, lastName, imageUrl, description } = this.props;

    return (
      <Col sm="3" xs="6" className="card user-card">
        <Media className="card-img-top" src={imageUrl} alt={`Card image of ${login}`} />
        <div className="card-body">
          <h4 className="card-title">
            {firstName} {lastName}
          </h4>
          <h5 className="card-subtitle">
            <FontAwesomeIcon icon={faAt} />
            {login}
          </h5>
          <p className="card-text">{description}</p>
          <a href={`/profile/${id}`} className="stretched-link" />
        </div>
      </Col>
    );
  }
}
