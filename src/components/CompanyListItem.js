import React from 'react';

class CompanyListItem extends React.Component {
  render() {
    const { name, location, onClick } = this.props;

    return (
      <li {...{onClick}}>
        {name} ({location})
      </li>
    );
  }
}

export default CompanyListItem;
