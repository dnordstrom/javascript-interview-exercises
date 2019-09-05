import React from 'react';
import Notifier from '../util/Notifier';

class CompanyListItem extends React.Component {
  /**
   * Handles list item clicks.
   *
   * @param {object} company
   * @memberof CompanyList
   */
  onClick() {
    const { name, location } = this.props.company;

    Notifier.notify(`${name} is located in ${location}`);
  }

  render() {
    const { name, location } = this.props.company;

    return (
      <li onClick={this.onClick.bind(this)}>
        {name} ({location})
      </li>
    );
  }
}

export default CompanyListItem;
