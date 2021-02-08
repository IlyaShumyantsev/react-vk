import React from "react";
import LogIn from "./components/LogIn";

function App() {
  const TOKEN =
    "bf2f66a107a710d62369f94e71d7582c8eaaeb6c7a2d1eb5d4d16da10cc84771b2b8ace1935dec7ddfc31";

  const param = (params) => new URLSearchParams(Object.entries(params));

  function getUrl(method, params) {
    if (!method) throw new Error("No method");
    params = params || {};
    params["access_token"] = TOKEN;
    params["scope"] = "offline";
    return `https://api.vk.com/method/${method}?` + param(params) + `&v=5.52`;
  }

  function sendRequest(method, url) {
    const headers = {
      "Content-Type": "application/json",
    };
    return fetch(url, {
      method: method,
      mode: "cors",
      //body: JSON.stringify(body),
      headers: headers,
    }).then((response) => {
      if (response.ok) {
        return response.json();
      }
      return response.json().then((err) => {
        const e = new Error("Something went wrong");
        e.data = err;
        throw e;
      });
    });
  }

  sendRequest("GET", getUrl("friends.search", { count: 90, fields: "photo_100" }))
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });

  return (
    <div className="wrapper">
      <LogIn prop={getUrl}></LogIn>
    </div>
  );
}

export default App;
