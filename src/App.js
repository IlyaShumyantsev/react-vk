import React from "react";
import LogIn from "./components/LogIn";

function App() {
  const TOKEN =
    "53b17d95654f4734f5fb9108ed140e2d9efa1a6cf4242b69573be0c2dfe3706a1c640c08bdb306d714295";

  const param = (params) => new URLSearchParams(Object.entries(params));

  function getUrl(method, params) {
    if (!method) throw new Error("No method");
    params = params || {};
    params["access_token"] = TOKEN;
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
