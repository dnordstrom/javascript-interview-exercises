import React from 'react';

export default function CompanyListItem(props) {
  const { name, location } = props;

  return (
    <li onClick={props.onClick}>{name} ({location})</li>
  )
}
