import React, { Component } from 'react';
import { connect } from 'react-redux';

class Header extends Component {
  render() {
    const { user: { email }, wallet: { expenses } } = this.props;
    const totalValue = expenses
      .reduce((acc, each) => acc
        + Number(each.value)
        * Number(each.exchangeRates[each.currency].ask), 0).toFixed(2);

    return (
      <header>
        <span data-testid="total-field">{totalValue}</span>
        <span data-testid="header-currency-field">BRL</span>
        <span data-testid="email-field">{email}</span>
      </header>
    );
  }
}

const mapStateToProps = (store) => ({
  ...store,
});

Header.propTypes = {}.isRequired;

export default connect(mapStateToProps)(Header);
