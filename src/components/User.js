import React from "react";
import PropTypes from "prop-types";

export function User({ name, error, isFetching, handleLogin }) {
  function renderTemplate() {
    if (error) {
      return <p>Во время запроса произошла ошибка, обновите страницу</p>;
    }

    if (isFetching) {
      return <p>Загружаю...</p>;
    }

    if (name) {
      return <p>Привет, {name}!</p>;
    } else {
      return (
        <button className="btn" onClick={handleLogin}>
          Войти
        </button>
      );
    }
  }
  return <div className="ib user">{renderTemplate()}</div>;
}

User.propTypes = {
  name: PropTypes.string.isRequired,
  error: PropTypes.string,
  isFetching: PropTypes.bool.isRequired,
  handleLogin: PropTypes.func.isRequired,
};
