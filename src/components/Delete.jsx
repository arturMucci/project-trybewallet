import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

class Delete extends Component {
  render() {
    const { labelName, handleButton, id } = this.props;
    return (
      <button
        data-testid="delete-btn"
        id={ id }
        type="button"
        onClick={ handleButton }
      >
        {labelName}
      </button>
    );
  }
}

Delete.propTypes = {
  id: PropTypes.number.isRequired,
  labelName: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default connect()(Delete);
