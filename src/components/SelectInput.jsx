import { Component } from 'react';
import PropTypes from 'prop-types';

class SelectInput extends Component {
  render() {
    const { data, id, onChange, name } = this.props;
    return (
      <select
        data-testid={ id }
        onChange={ onChange }
        name={ name }
      >
        {data.map((currency) => (
          <option
            key={ currency }
            value={ currency }
          >
            {currency}
          </option>
        ))}
      </select>
    );
  }
}

SelectInput.propTypes = {
  id: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
}.isRequired;

export default SelectInput;
