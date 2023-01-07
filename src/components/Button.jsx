import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

const menosum = -1;
class Button extends Component {
  render() {
    const { isDisabled = false, labelName, handleButton, id, testId } = this.props;
    return (
      <button
        data-testid={ testId }
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
  testId: PropTypes.string,
  labelName: PropTypes.string.isRequired,
  handleButton: PropTypes.func.isRequired,
};

Button.defaultProps = {
  id: ('nada' || menosum),
  testId: ('nada' || menosum),
};

export default connect()(Button);
