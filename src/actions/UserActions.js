export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const AVATAR_REQUEST = "AVATAR_REQUEST";
export const AVATAR_SUCCESS = "AVATAR_SUCCESS";
export const AVATAR_FAIL = "AVATAR_FAIL";

/* global VK */

export function handleLogin() {
  const [connected, notAuthorized] = ["connected", "not_authorized"];
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    VK.Auth.login((response) => {
      if (response.status === connected && response.session) {
        dispatch({
          type: LOGIN_SUCCESS,
          userId: response.session.mid,
          payload: response.session.user.first_name,
        });
      } else if (response.status === notAuthorized) {
        dispatch({
          type: LOGIN_FAIL,
          payload: new Error("Доступ к приложению запрещен"),
        });
      } else {
        dispatch({
          type: LOGIN_FAIL,
          payload: new Error("Пользователь не авторизован ВКонтакте"),
        });
      }
    }, 65536); // код доступа
  };
}

export function handleLogout() {
  const [unknown] = ["unknown"];
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    VK.Auth.logout((response) => {
      if (response.status === unknown) {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: response.status,
          avatar: "",
        });
      } else {
        dispatch({
          type: LOGOUT_FAIL,
          payload: new Error("Ошибка выхода"),
        });
      }
    });
  };
}

export function getAvatar(userId) {
  return function (dispatch) {
    dispatch({
      type: AVATAR_REQUEST,
    });
    VK.api(
      "users.get",
      {
        user_ids: userId,
        fields: "photo_100",
        name_case: "nom",
        v: 5.62,
      },
      (response) => {
        if (!response.error) {
          dispatch({
            type: AVATAR_SUCCESS,
            payload: response.response[0].photo_100,
          });
        } else {
          dispatch({
            type: AVATAR_FAIL,
            payload: new Error("Аватарка не была загружена"),
          });
        }
      }
    );
  };
}
