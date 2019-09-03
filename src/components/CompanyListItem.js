import React from 'react';

export default function CompanyListItem(props) {
  const { name, location, onClick } = props;

  return (
    <li {...{onClick}}>
      {name} ({location})
    </li>
  )
}
