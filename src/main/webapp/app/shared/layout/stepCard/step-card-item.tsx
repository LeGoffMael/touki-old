import './step-card-item.scss';

import React from 'react';
import { NavLink as Link } from 'react-router-dom';

export interface IStepCardItem {
  step: any;
}

export default class StepCardItem extends React.Component<IStepCardItem> {
  render() {
    const { step } = this.props;
    console.log(step);
    return (
      <div className="step-list-bloc">
        <div className="step-list-node"/>
        <div className="step-content">
          <h2>{step.title}</h2>
          <p className="step-description">{step.description}</p>
          {step.photos[0] !== undefined && (
              <img src={step.photos[0].link}/>
          )}          
          <p className="step-date">
            From {step.startDate} to {step.endDate}
          </p>
        </div>
      </div>
    );
  }
}
