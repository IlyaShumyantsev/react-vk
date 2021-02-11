import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import App from "./containers/App";
import { store } from "./store/configureStore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById("root"));

// https://oauth.vk.com/authorize?client_id=7755211&display=page&redirect_uri=https://oauth.vk.com/blank.html&scope=friends,notify,photos,audio,video,stories,pages,status,notes,messages,wall,ads,docs,groups,notifications,stats,email,market,offline&response_type=token&v=5.52
// TOKEN = 5a85e05f6ae9df4de12aae9e6b7df777bbaf6453efc436bec78b54400e9c9487ee438456e3528dc3f1e95
// 6ee3a56cd640bdd0757efe2f4a2a6d53f168cc4e8c6334a57102361a2958bde7eccc5a1c2f51230de1e89
