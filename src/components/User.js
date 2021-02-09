import React from "react";
import PropTypes from "prop-types";

export class User extends React.Component {
  renderTemplate() {
    if (this.props.error) {
      return <p>Во время запроса произошла ошибка, обновите страницу</p>;
    }
    if (this.props.isFetching) {
      return <p>Загружаю...</p>;
    }
    if (this.props.name) {
      return <p>Привет, {this.props.name}!</p>;
    }
    return (
      <button className="btn" onClick={this.props.handleLogin}>
        Войти
      </button>
    );
  }

  render() {
    return <div className="ib user">{this.renderTemplate()}</div>;
  }
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
