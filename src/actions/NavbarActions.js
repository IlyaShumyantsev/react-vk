export const USER_IS_LOGINED = "USER_IS_LOGINED";
export const USER_IS_LOGOUT = "USER_IS_LOGOUT";

export function handleNavbar(isLogin) {
  return (dispatch) => {
    if (isLogin) {
      dispatch({ type: USER_IS_LOGINED });
    } else {
      dispatch({ type: USER_IS_LOGOUT });
    }
  };
}
