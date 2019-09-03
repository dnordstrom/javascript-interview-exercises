import React, { useState } from 'react';
import CompanyListItem from './CompanyListItem';
import Filter from './Filter';
import Notifier from '../util/Notifier';

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

  // Company item click handler
  const onItemClick = (company) => {
    Notifier.notify(`${company.name} is located in ${company.location}`);
  };

  return (
    <div>
      {locations.map(location => (
        <Filter
          key={location}
          active={state.filters.includes(location)}
          location={location}
          onClick={onFilterClick}>
        </Filter>
      ))}

      <ul>
        {getFilteredCompanies().map(company => (
          <CompanyListItem
            key={company.id}
            onClick={onItemClick.bind(null, company)}
            {...company}>
          </CompanyListItem>
        ))}
      </ul>
    </div>
  )
}
