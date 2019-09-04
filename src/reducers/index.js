import companies from '../api';
import Actions from '../actions';

const initialState = {
  companies,
  filters: [],
  filteredCompanies: companies
}

const toggleFilter = (state, action) => {
  const filters = [...state.filters];
  const index = filters.indexOf(action.data);
  let filteredCompanies;
  
  // Add or remove the filter from state
  if (index !== -1) {
    filters.splice(index, 1);
  } else {
    filters.push(action.data);
  }

  // Update filtered company list
  if (filters.length) {
    filteredCompanies = companies.filter(
      company => filters.includes(company.location)
    );
  } else {
    filteredCompanies = companies;
  }

  // Return new state
  return { ...state, filters, filteredCompanies };
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case Actions.Types.TOGGLE_FILTER:
      return toggleFilter(state, action);
    default:
      return state;
  }
}

export default reducer;