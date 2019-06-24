import './search.scss';
import React from 'react';
import { Col } from 'reactstrap';
import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

import { IRootState } from 'app/shared/reducers';
import { getEntities as getAllUsers } from 'app/entities/user-extra/user-extra.reducer';
import { getEntities as getAllTravels } from 'app/entities/travel/travel.reducer';

import SearchSuggestions from 'app/shared/layout/search/search-suggestions';

export interface ISearchProp extends StateProps, DispatchProps {}

export interface IIndexState {
  visibilitySuggestion: boolean;
  usersFilter: any;
  travelsFilter: any;
}

class SearchInput extends React.Component<ISearchProp> {
  state: IIndexState = {
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
        <div className="input-group md-form form-sm form-1 pl-0">
          <div className="input-group-prepend">
            <span className="input-group-text" id="basic-text1">
              <FontAwesomeIcon icon={faSearch} />
            </span>
          </div>
          <input
            onFocus={this.setVisible}
            onBlur={this.setHide}
            className="form-control my-0 py-1"
            type="text"
            placeholder="(In coming) Search user or travel"
            aria-label="Search"
          />
        </div>
        <SearchSuggestions users={userExtraList} travels={travelList} visibility={visibilitySuggestion} />
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
