export const USER_IS_LOGIN = "USER_IS_LOGIN";
export const USER_IS_LOGOUT = "USER_IS_LOGOUT";

export function handleNavbar(isLogin) {
  return (dispatch) => {
    if (isLogin) {
      dispatch({ type: USER_IS_LOGIN });
    } else {
      dispatch({ type: USER_IS_LOGOUT });
    }
  };
}
