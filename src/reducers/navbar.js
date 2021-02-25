import { USER_IS_LOGINED, USER_IS_LOGOUT } from "../actions/NavbarActions";

const initialState = {
  isLogin: false,
  error: "",
  title: [
    ...new Map([
      ["Главная", "/"],
      ["GitHub", "https://github.com/IlyaShumyantsev/react-vk/tree/develop"],
    ]),
  ],
};

export function navbarReducer(state = initialState, action) {
  switch (action.type) {
    case USER_IS_LOGINED: {
      return {
        ...state,
        isLogin: true,
        title: [
          ...new Map([
            ["Главная", "/"],
            ["Стена", "/wall"],
            ["Фото", "/photos"],
            ["Музыка", "/music"],
            ["GitHub", "https://github.com/IlyaShumyantsev/react-vk/tree/develop"],
          ]),
        ],
      };
    }
    case USER_IS_LOGOUT: {
      return {
        ...state,
        isLogin: false,
        title: [
          ...new Map([
            ["Главная", "/"],
            ["GitHub", "https://github.com/IlyaShumyantsev/react-vk/tree/develop"],
          ]),
        ],
      };
    }
    default: {
      return state;
    }
  }
}
