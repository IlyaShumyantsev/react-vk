export const LOGIN_REQUEST = "LOGIN_REQUEST";
export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_FAIL = "LOGIN_FAIL";

export const LOGOUT_REQUEST = "LOGOUT_REQUEST";
export const LOGOUT_SUCCESS = "LOGOUT_SUCCESS";
export const LOGOUT_FAIL = "LOGOUT_FAIL";

export const AVATAR_REQUEST = "AVATAR_REQUEST";
export const AVATAR_SUCCESS = "AVATAR_SUCCESS";
export const AVATAR_FAIL = "AVATAR_FAIL";

export const GET_USERS_REQUEST = "GET_USERS_REQUEST";
export const GET_USERS_SUCCESS = "GET_USERS_SUCCESS";
export const GET_USERS_FAIL = "GET_USERS_FAIL";

export function handleLogin() {
  const [connected, notAuthorized] = ["connected", "not_authorized"];
  return function (dispatch) {
    dispatch({
      type: LOGIN_REQUEST,
    });
    VK.Auth.login((data) => {
      if (data.status === connected && data.session) {
        dispatch({
          type: LOGIN_SUCCESS,
          userId: data.session.mid,
          payload: data.session.user.first_name,
        });
      } else if (data.status === notAuthorized) {
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
    }, 12); // код доступа
  };
}

export function handleLogout() {
  const unknown = "unknown";
  return function (dispatch) {
    dispatch({
      type: LOGOUT_REQUEST,
    });
    VK.Auth.logout((data) => {
      if (data.status === unknown) {
        dispatch({
          type: LOGOUT_SUCCESS,
          payload: data.status,
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
      (data) => {
        if (!data.error) {
          dispatch({
            type: AVATAR_SUCCESS,
            payload: data.response[0].photo_100,
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

export function getUsers(userIds) {
  return function (dispatch) {
    dispatch({ type: GET_USERS_REQUEST });
    VK.api(
      "users.get",
      {
        user_ids: userIds,
        name_case: "Nom",
        v: "5.130",
        fields: "photo_50",
      },
      (data) => {
        if (!data.response) {
          dispatch({
            type: GET_USERS_FAIL,
            payload: new Error("Таких пользователей не существует!"),
          });
        } else {
          dispatch({ type: GET_USERS_SUCCESS, payload: data.response });
        }
      }
    );
  };
}
