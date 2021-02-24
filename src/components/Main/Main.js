import React from "react";
import MainLogo from "./MainLogo.svg";
import "./Main.css";

class Main extends React.Component {
  render() {
    return (
      <div className="Main">
        <header className="Main-header">
          <img src={MainLogo} className="Main-logo" alt="logo" />
          <p>Тестовый проект для обучения работы с VK api</p>
          <a
            className="Main-link"
            href="https://vk.com/dev/manuals"
            target="_blank"
            rel="noopener noreferrer"
          >
            Документация VK api
          </a>
        </header>
      </div>
    );
  }
}

export default Main;
