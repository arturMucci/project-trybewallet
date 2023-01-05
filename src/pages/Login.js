import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Input from '../components/Input';
import Button from '../components/Button';
import * as actions from '../redux/actions/index';

const SIX = 6;

class Login extends React.Component {
  state = {
    email: '',
    password: '',
    btnIsDisabled: true,
  };

  handleButton = (ev) => {
    ev.preventDefault();
    const { email } = this.state;
    const { dispatch, history } = this.props;
    dispatch(actions.ACTION_SAVE_EMAIL(email));
    history.push('/carteira');
  };

  checkBtnIsDisabled = () => {
    const regExp = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const { email, password } = this.state;
    const isEmail = regExp.test(email);
    this.setState((prev) => ({
      ...prev,
      btnIsDisabled: !(isEmail && password.length >= SIX),
    }));
  };

  handleInput = ({ target }) => {
    this.setState(
      (prev) => ({
        ...prev,
        [target.type]: target.value,
      }),
      this.checkBtnIsDisabled,
    );
  };

  render() {
    const { email, password, btnIsDisabled } = this.state;
    return (

      <section className="login-form-container">
        <Input
          type="email"
          id="email-input"
          value={ email }
          name="email"
          labelName="Email:"
          onChange={ this.handleInput }
        />
        <Input
          type="password"
          id="password-input"
          name="password"
          value={ password }
          labelName="Password:"
          onChange={ this.handleInput }
        />
        <Button
          isDisabled={ btnIsDisabled }
          action={ actions.ACTION_SAVE_EMAIL }
          email={ email }
          handleButton={ this.handleButton }
          labelName="Entrar"
        />
      </section>
    );
  }
}

const mapStateToProps = (store) => ({
  ...store.email,
});

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Login);
