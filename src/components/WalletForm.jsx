import { Component } from 'react';
import { connect } from 'react-redux';
import Input from './Input';
import SelectInput from './SelectInput';
import Button from './Button';
import {
  ACTION_FETCH_CURRENCIES,
  ACTION_ADD_NEW_EXPENSE,
  ACTION_OVERWRITE_EXPENSES,
} from '../redux/actions';
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

  editExpense = () => {
    const { dispatch, wallet: { idToEdit } } = this.props;
    ACTION_OVERWRITE_EXPENSES(dispatch, { ...this.state, id: Number(idToEdit) });
  };

  render() {
    const { wallet: { currencies, isEditing } } = this.props;
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
          {isEditing
            ? (
              <Button
                isDisabled={ false }
                id="edit-btn"
                labelName="Editar despesa"
                handleButton={ this.editExpense }
              />
            )
            : (
              <Button
                isDisabled={ false }
                labelName="Adicionar despesa"
                handleButton={ this.handleButton }
              />
            )}
        </section>
        <section>
          <Table />
        </section>
      </>
    );
  }
}

const mapStateToProps = (store) => ({
  ...store,
});

WalletForm.propTypes = {
}.isRequired;

export default connect(mapStateToProps)(WalletForm);
