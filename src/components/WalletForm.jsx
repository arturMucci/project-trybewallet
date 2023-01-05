import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import SelectInput from './SelectInput';
import Button from './Button';
import { ACTION_FETCH_CURRENCIES, ACTION_ADD_NEW_EXPENSE } from '../redux/actions';
import Table from './Table';

const INITIAL_CURRENCY = 'USD';
const INITIAL_METHOD = 'Dinheiro';
const INITIAL_TAG = 'Alimentação';

class WalletForm extends Component {
  state = {
    description: '',
    tag: INITIAL_TAG,
    method: INITIAL_METHOD,
    value: '',
    currency: INITIAL_CURRENCY,
    id: 0,
  };

  async componentDidMount() {
    const { dispatch } = this.props;
    await ACTION_FETCH_CURRENCIES(dispatch);
  }

  handleButton = () => {
    const { dispatch } = this.props;
    const { id } = this.state;

    ACTION_ADD_NEW_EXPENSE(dispatch, this.state);

    this.setState({
      description: '',
      tag: INITIAL_TAG,
      method: INITIAL_METHOD,
      value: '',
      currency: INITIAL_CURRENCY,
      id: id + 1,
    });
  };

  handleInput = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value });
  };

  render() {
    const { currencies } = this.props;
    const { value, description } = this.state;
    const methods = ['Dinheiro', 'Cartão de crédito', 'Cartão de débito'];
    const tags = ['Alimentação', 'Lazer', 'Trabalho', 'Transporte', 'Saúde'];
    return (
      <>
        <section>
          <Input
            type="text"
            id="value-input"
            name="value"
            value={ value }
            labelName="Value:"
            onChange={ this.handleInput }
          />
          <Input
            type="text"
            id="description-input"
            name="description"
            value={ description }
            labelName="Description:"
            onChange={ this.handleInput }
          />
          <SelectInput
            id="currency-input"
            data={ currencies }
            name="currency"
            onChange={ this.handleInput }
          />
          <SelectInput
            id="method-input"
            data={ methods }
            name="method"
            onChange={ this.handleInput }
          />
          <SelectInput
            id="tag-input"
            data={ tags }
            name="tag"
            onChange={ this.handleInput }
          />
          <Button
            isDisabled={ false }
            labelName="Adicionar despesa"
            handleButton={ this.handleButton }
          />
        </section>
        <section>
          <Table />
        </section>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  currencies: store.wallet.currencies,
  value: store.wallet.value,
});

WalletForm.propTypes = {
  dispatch: PropTypes.func.isRequired,
  currencies: PropTypes
    .arrayOf(PropTypes.string)
    .isRequired || PropTypes
    .shape({ map: PropTypes.func })
    .isRequired,
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
