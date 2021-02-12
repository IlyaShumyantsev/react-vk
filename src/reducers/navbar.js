import { USER_IS_LOGIN, USER_IS_LOGOUT } from "../actions/NavbarActions";

const initialState = {
  isLogin: false,
  error: "",
  title: new Map([
    ["Главная", "/"],
    ["GitHub", "https://github.com/IlyaShumyantsev/react-vk/tree/develop"],
  ]),
};

export function navbarReducer(state = initialState, action) {
  switch (action.type) {
    case USER_IS_LOGIN: {
      return {
        ...state,
        isLogin: true,
        title: new Map([
          ["Главная", "/"],
          ["Стена", "/"],
          ["Фото", "/"],
          ["Музыка", "/"],
          ["GitHub", "https://github.com/IlyaShumyantsev/react-vk/tree/develop"],
        ]),
      };
    }
    case USER_IS_LOGOUT: {
      return {
        ...state,
        isLogin: true,
        title: new Map([
          ["Главная", "/"],
          ["GitHub", "https://github.com/IlyaShumyantsev/react-vk/tree/develop"],
        ]),
      };
    }
    default: {
      return state;
    }
  }
}
