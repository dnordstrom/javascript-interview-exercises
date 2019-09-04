import React from 'react';

class FilterButton extends React.Component {
  render() {
    const { location, onClick, active } = this.props;
    const className =
      `CompanyList__Filter ${active ? 'CompanyList__Filter--active' : ''}`;

    return (
      <a {...{className}} {...{onClick}}>
        {location}
      </a>
    );
  }
};

export default FilterButton;