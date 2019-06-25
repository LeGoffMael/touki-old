import './search.scss';
import React from 'react';
import { Col } from 'reactstrap';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { IRootState } from 'app/shared/reducers';
import { getEntities as getAllUsers } from 'app/entities/user-extra/user-extra.reducer';
import { getEntities as getAllTravels } from 'app/modules/travel/travel.reducer';

import SearchSuggestions from 'app/shared/layout/search/search-suggestions';

export interface ISearchProp extends StateProps, DispatchProps {}

export interface ISearchState {
  visibilitySuggestion: boolean;
  usersFilter: any;
  travelsFilter: any;
}

class SearchInput extends React.Component<ISearchProp, ISearchState> {
  state: ISearchState = {
    visibilitySuggestion: false,
    usersFilter: null,
    travelsFilter: null
  };

  componentDidMount() {
    // TODO : filter with value input (see filtering Jhipster)
    this.props.getAllUsers();
    this.props.getAllTravels();
  }

  setVisible = event => {
    this.setState({ visibilitySuggestion: true });
  };

  setHide = event => {
    this.setState({ visibilitySuggestion: false });
  };

  render() {
    const { userExtraList, travelList } = this.props;
    const { visibilitySuggestion } = this.state;

    return (
      <Col md="4">
        <div className="input-group md-form form-sm">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-text1">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          <input
            onFocus={this.setVisible}
            onBlur={this.setHide}
            className="form-control"
            type="text"
            placeholder="(In coming) Search user or travel"
            aria-label="Search"
          />
          <SearchSuggestions users={userExtraList} travels={travelList} visibility={visibilitySuggestion} />
        </div>
      </Col>
    );
  }
}

const mapStateToProps = ({ userExtra, travel }: IRootState) => ({
  userExtraList: userExtra.entities,
  travelList: travel.entities
});

const mapDispatchToProps = { getAllUsers, getAllTravels };

type StateProps = ReturnType<typeof mapStateToProps>;
type DispatchProps = typeof mapDispatchToProps;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchInput);
