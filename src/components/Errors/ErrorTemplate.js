import React from "react";
import "./ErrorTemplate.css";

class ErrorTemplate extends React.Component {
  render() {
    return (
      <section className="page_404">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 ">
              <div className="col-sm-10 col-sm-offset-1  text-center">
                <div className="four_zero_four_bg">
                  <h1 className="text-center">404</h1>
                </div>
                <div className="contant_box_404">
                  <h3 className="h2">Похоже что-то пошло не так</h3>
                  <p>страница временно недоступна!</p>
                  <a href="/" className="link_404">
                    На главную
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default ErrorTemplate;
