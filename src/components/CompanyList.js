import React, { useState } from 'react';
import CompanyListItem from './CompanyListItem';
import FilterButton from './FilterButton';

export default function CompanyList(props) {
  const { companies } = props;
  const [state, setState] = useState({ filters: [] });
  const locations = [...new Set(companies.map(company => company.location))];
  
  // Returns companies that should be visible according to active filter
  const getFilteredCompanies = () => {
    let filteredCompanies;

    if (state.filters.length) {
      filteredCompanies = companies.filter(
        company => state.filters.includes(company.location)
      )
    } else {
      filteredCompanies = companies;
    }

    return filteredCompanies;
  }

  // Filter click handler
  const onFilterClick = ({ target }) => {
    const newState = { ...state }; // Create new state from old
    const index = state.filters.indexOf(target.innerText);

    // Modify filter state accordingly
    if (index !== -1) {
      newState.filters.splice(index, 1);
    } else {
      newState.filters.push(target.innerText);
    }

    setState(newState);
  }

  return (
    <div>
      {locations.map(location => (
        <FilterButton
          key={location}
          active={state.filters.includes(location)}
          location={location}
          onClick={onFilterClick}>
        </FilterButton>
      ))}

      <ul>
        {getFilteredCompanies().map(company => (
          <CompanyListItem
            key={company.id}
            company={company}>
          </CompanyListItem>
        ))}
      </ul>
    </div>
  )
}
