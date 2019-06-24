import './search.scss';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/free-solid-svg-icons';

export interface ISearchSuggestion {
  key: number;
  id: string;
  text: string;
  link: string;
  image: string;
  icon: IconDefinition;
}

export default class SearchSuggestion extends React.Component<ISearchSuggestion> {
  linkSuggestion = event => {
    document.location.href = this.props.link;
  };

  render() {
    const { key, id, text, link, image, icon } = this.props;

    return (
      <li className="result-entry" data-suggestion={`Target ${key}`} data-position={key} data-type="type" data-analytics-type="merchant">
        <a href={link} className="result-link" onMouseDown={this.linkSuggestion}>
          <div className="media">
            <div className="media-left">
              <img src={image} className="media-object" />
            </div>
            <div className="media-body">
              <h4 className="media-heading">
                <FontAwesomeIcon icon={icon} /> {text}
              </h4>
            </div>
          </div>
        </a>
      </li>
    );
  }
}
