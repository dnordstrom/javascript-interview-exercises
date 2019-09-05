import React from 'react';
import { connect } from 'react-redux';
import Actions from '../actions';

class FilterButton extends React.Component {
  /**
   * Handles location filter clicks.
   *
   * @param {Event} event
   * @memberof CompanyList
   */
  onClick(event) {
    event.preventDefault();

    this.props.toggleFilter(event.target.innerText);
  }

  render() {
    const { location } = this.props;
    const active = this.props.filters.includes(location);
    const className =
      `CompanyList__Filter ${active ? 'CompanyList__Filter--active' : ''}`;

    return (
      <a {...{className}} onClick={this.onClick.bind(this)}>
        {location}
      </a>
    );
  }
};


const mapStateToProps = state => ({
  filters: state.filters
});

const mapDispatchToProps = dispatch => ({
  toggleFilter: location => dispatch(Actions.toggleFilter(location))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FilterButton);