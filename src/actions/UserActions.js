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
            userId: response.session.mid,
            payload: response.session.user.first_name,
          });
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
      65536,
      2,
      1,
      4
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

// VK.api("users.get", { user_ids: "315353653", fields:"photo_100", name_case: "nom", v: 5.62}, (k) => console.log('k',k))

export function getAva(userId) {
  return function (dispatch) {
    dispatch({
      type: AVA_REQUEST,
    });
    VK.api(
      "user.get",
      {
        user_ids: userId,
        fields: "photo_100",
        name_case: "nom",
        v: 5.62,
      },
      (response) => {
        dispatch({
          type: AVA_SUCCESS,
          payload: "",
        });
        console.log(response);
      }
    );
  };
}
