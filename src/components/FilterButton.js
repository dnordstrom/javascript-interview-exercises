import React from 'react';

export default function FilterButton(props) {
  const { location, active, onClick } = props;
  const className =
    `CompanyList__Filter ${active ? 'CompanyList__Filter--active' : ''}`;

  return (
    <a
      href="#ESLintComplainsALot"
      {...{className}}
      {...{onClick}}>

        {location}

    </a>
  );
}