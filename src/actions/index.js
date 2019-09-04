export const Types = {
  TOGGLE_FILTER: 'TOGGLE_FILTER'
};

export const toggleFilter = location => ({
  type: Types.TOGGLE_FILTER,
  data: location
});

export default {
  Types,
  toggleFilter
};