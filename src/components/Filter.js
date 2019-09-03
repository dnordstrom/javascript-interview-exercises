import React from 'react';

export default function Filter(props) {
  const { location, active, onClick } = props;

  return (
    <a
      href="#ESLintComplainsALot"
      style={{ marginRight: '1em', fontWeight: active ? 'bold' : 'normal' }}
      onClick={onClick}>
        
        {location}
        
    </a>
  );
}