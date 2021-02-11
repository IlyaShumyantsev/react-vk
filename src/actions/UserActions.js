import axios from "axios";

export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const AVA_REQUEST = "AVA_REQUEST";
export const AVA_SUCCESS = "AVA_SUCCESS";
export const AVA_FAIL = "AVA_FAIL";

/* global VK */

export function handleLogin() {
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    VK.Auth.login(
      (response) => {
        if (response.status === "connected" && response.session) {
          dispatch({
            type: LOGIN_SUCCESS,
            error: false,
            payload: response.session.user.first_name,
          });
          getAva();
        } else if (response.status === "not_authorized ") {
          dispatch({
            type: LOGIN_FAIL,
            error: true,
            payload: new Error("Доступ к приложению запрещен"),
          });
        } else {
          dispatch({
            type: LOGIN_FAIL,
            error: true,
            payload: new Error("Пользователь не авторизован ВКонтакте"),
          });
        }
      },
      4,
      2
    ); // код доступа
  };
}

export function handleLogout() {
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    VK.Auth.logout((response) => {
      if (response.status === "unknown") {
        dispatch({
          type: LOGOUT_SUCCESS,
          error: false,
          payload: response.status,
        });
      } else {
        dispatch({
          type: LOGOUT_FAIL,
          error: true,
          payload: new Error("Ошибка выхода"),
        });
      }
    });
  };
}

export function getAva() {
  return function (dispatch) {
    axios({
      url: "https://api.vk.com/method/users.get?user_ids=" + "nsx345" + "&fields=photo_max_orig",
      type: "GET",
      dataType: "jsonp",
      crossDomain: true,
    }).then((response) => {
      dispatch({
        type: AVA_REQUEST,
      });
      if (!response.error) {
        dispatch({
          type: AVA_SUCCESS,
          error: false,
        });
        console.log(response);
      } else {
        dispatch({
          type: AVA_FAIL,
          error: true,
          payload: new Error("Ошибка загрузки аватарки"),
        });
        console.log(response);
      }
    });
  };
}
