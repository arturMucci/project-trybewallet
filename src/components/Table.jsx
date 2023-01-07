import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import {
  ACTION_DELETE_EXPENSE,
  ACTION_SAVE_IDTOEDIT,
} from '../redux/actions/index';

import Button from './Button';

class Table extends Component {
  handleDelete = ({ target }) => {
    const { dispatch, wallet: { expenses } } = this.props;
    const newExpenses = expenses
      .filter((each) => each.id !== Number(target.id));
    ACTION_DELETE_EXPENSE(dispatch, newExpenses);
  };

  handleEdit = ({ target }) => {
    const { dispatch } = this.props;
    ACTION_SAVE_IDTOEDIT(dispatch, target.id);
  };

  render() {
    const tableTitles = [
      'Descrição',
      'Tag',
      'Método de pagamento',
      'Valor',
      'Moeda',
      'Câmbio utilizado',
      'Valor convertido',
      'Moeda de conversão',
      'Editar/Excluir',
    ];

    const { wallet: { expenses } } = this.props;
    return (
      <table>
        <thead>
          <tr>
            {tableTitles.map((each) => <th key={ each }>{each}</th>)}
          </tr>
        </thead>
        <tbody>
          {expenses
            .map((each) => (
              <tr key={ each.id }>
                <td>{each.description}</td>
                <td>{each.tag}</td>
                <td>{each.method}</td>
                <td>{Number(each.value).toFixed(2)}</td>
                <td>{each.exchangeRates[each.currency].name}</td>
                <td>{Number(each.exchangeRates[each.currency].ask).toFixed(2)}</td>
                <td>
                  {
                    (Number(each.value)
                    * Number(each.exchangeRates[each.currency].ask)).toFixed(2)
                  }
                </td>
                <td>Real</td>
                <td>
                  <Button
                    isDisabled={ false }
                    labelName="Edit"
                    id={ each.id }
                    testid="edit-btn"
                    handleButton={ this.handleEdit }
                  />
                  <Button
                    isDisabled={ false }
                    labelName="Excluir"
                    id={ each.id }
                    handleButton={ this.handleDelete }
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    );
  }
}

const mapStateToProps = (store) => ({
  ...store,
});

Table.propTypes = {
  dispatch: PropTypes.func.isRequired,
  wallet: PropTypes.shape({
    expenses: PropTypes.arrayOf(PropTypes.shape({})),
  }).isRequired,
};

export default connect(mapStateToProps)(Table);
