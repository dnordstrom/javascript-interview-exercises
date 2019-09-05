import React from 'react';
import { connect } from 'react-redux';
import CompanyListItem from './CompanyListItem';
import FilterButton from './FilterButton';
import Actions from '../actions';

class CompanyList extends React.Component {
  /**
   * Renders location filter buttons.
   *
   * @returns Location filter buttons
   * @memberof CompanyList
   */
  renderFilters() {
    const { companies } = this.props;
    const locations = [...new Set(companies.map(company => company.location))];

    return locations.map(location => (
      <FilterButton
        key={location}
        location={location}>
      </FilterButton>
    ));
  }

  /**
   * Renders company list items based on location filters.
   *
   * @returns Unordered list of companies
   * @memberof CompanyList
   */
  renderList() {
    const { filteredCompanies } = this.props;

    return (
      <ul className="CompanyList__List">
          {filteredCompanies.map(company => (
            <CompanyListItem company={company} key={company.id}></CompanyListItem>
          ))}
        </ul>
    );
  }

  /**
   * Renders the component.
   *
   * @returns
   * @memberof CompanyList
   */
  render() {
    return (
      <div className="CompanyList">
        {this.renderFilters()}
        {this.renderList()}
      </div>
    );
  }
};

const mapStateToProps = state => ({
  companies: state.companies,
  filters: state.filters,
  filteredCompanies: state.filteredCompanies
});

const mapDispatchToProps = dispatch => ({
  toggleFilter: location => dispatch(Actions.toggleFilter(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompanyList);