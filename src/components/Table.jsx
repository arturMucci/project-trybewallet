import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { ACTION_OVERWRITE_EXPENSES } from '../redux/actions/index';
import Delete from './Delete';

class Table extends Component {
  handleButton = ({ target }) => {
    const { dispatch, wallet: { expenses } } = this.props;
    const newExpenses = expenses
      .filter((each) => each.id !== Number(target.id));

    ACTION_OVERWRITE_EXPENSES(dispatch, newExpenses);
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
                  <Delete
                    labelName="Excluir"
                    id={ each.id }
                    handleButton={ this.handleButton }
                  />
                </td>
              </tr>))}
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
