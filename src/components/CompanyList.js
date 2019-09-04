import React from 'react';
import { connect } from 'react-redux';
import CompanyListItem from './CompanyListItem';
import FilterButton from './FilterButton';
import Actions from '../actions';
import Notifier from '../util/Notifier';

class CompanyList extends React.Component {
  /**
   * Handles location filter clicks.
   *
   * @param {Event} event
   * @memberof CompanyList
   */
  onFilterClick(event) {
    event.preventDefault();

    this.props.toggleFilter(event.target.innerText);
  }

  /**
   * Handles list item clicks.
   *
   * @param {object} company
   * @memberof CompanyList
   */
  onItemClick(company) {
    Notifier.notify(`${company.name} is located in ${company.location}`);
  }

  /**
   * Renders location filter buttons.
   *
   * @returns Location filter buttons
   * @memberof CompanyList
   */
  renderFilters() {
    const { companies, filters } = this.props;
    const locations = [...new Set(companies.map(company => company.location))];

    return locations.map(location => (
      <FilterButton
        active={filters.includes(location)}
        key={location}
        location={location}
        onClick={this.onFilterClick.bind(this)}>
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
            <CompanyListItem
              key={company.id}
              onClick={this.onItemClick.bind(this, company)}
              {...company}>
            </CompanyListItem>
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