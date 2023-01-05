import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

class Button extends Component {
  render() {
    const { isDisabled, labelName, handleButton } = this.props;
    return (
      <button
        type="button"
        disabled={ isDisabled }
        onClick={ handleButton }
      >
        {labelName}
      </button>
    );
  }
}

Button.propTypes = {
  isDisabled: PropTypes.bool.isRequired,
  labelName: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
};

export default connect()(Button);
