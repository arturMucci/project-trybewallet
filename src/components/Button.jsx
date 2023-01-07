import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

const menosum = -1;
class Button extends Component {
  render() {
    const { isDisabled = false, labelName, handleButton, id, testid } = this.props;
    return (
      <button
        data-testid={ testid }
        id={ id }
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
  id: PropTypes.string,
  testid: PropTypes.string.isRequired,
  labelName: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
};

Button.defaultProps = {
  id: ('nada' || menosum),
};

export default connect()(Button);
