import './search.scss';
import React from 'react';
import { Row } from 'reactstrap';
import SearchSuggestion from 'app/shared/layout/search/search-suggestion';
import { faAt, faPlane } from '@fortawesome/free-solid-svg-icons';

export interface ISearchSuggestion {
  users: any;
  travels: any;
  visibility: boolean;
}

export default class SearchSuggestions extends React.Component<ISearchSuggestion> {
  render() {
    const { users, travels, visibility } = this.props;

    return (
      <Row className={`instant-results ${visibility && ' active'}`}>
        <ul className="list-unstyled result-bucket">
          <div className="container">
            {users && users.length > 0 && (
              <Row className="search-group">
                <span>Users</span>
                {users.map((user, i) => (
                  <SearchSuggestion
                    key={i}
                    id={user.id}
                    text={user.user !== null ? user.user.login : 'Error'}
                    link={`/profile/${user.id}`}
                    image={user.user !== null ? user.user.imageUrl : 'Error'}
                    icon={faAt}
                  />
                ))}
              </Row>
            )}
            {travels && travels.length > 0 && (
              <Row className="search-group">
                <span>Travels</span>
                {travels.map((travel, i) => (
                  <SearchSuggestion
                    key={i}
                    id={travel.id}
                    text={travel.title}
                    link={`/entity/travel/${travel.id}`}
                    image={travel.steps !== null ? travel.steps[0].photos[0].link : 'content/images/default-photo.png'}
                    icon={faPlane}
                  />
                ))}
              </Row>
            )}
          </div>
        </ul>
      </Row>
    );
  }
}
