import React from 'react';
import Notifier from '../util/Notifier';

export default function CompanyListItem(props) {
  const { name, location } = props.company;

  const onClick = (company) => {
    Notifier.notify(`${name} is located in ${location}`);
  };

  return (
    <li {...{onClick}}>
      {name} ({location})
    </li>
  )
}
