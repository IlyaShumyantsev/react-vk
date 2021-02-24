import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAIL,
  AVATAR_REQUEST,
  AVATAR_SUCCESS,
  AVATAR_FAIL,
  GET_USERS_REQUEST,
  GET_USERS_SUCCESS,
  GET_USERS_FAIL,
} from "../actions/UserActions";

const initialState = {
  name: "",
  error: "",
  avatar: "",
  userId: "",
  avatarIsLoaded: false,
  isFetching: false,
  isLogin: false,
  users: [],
  isFetchingUsers: false,
};

export function userReducer(state = initialState, action) {
  switch (action.type) {
    case LOGIN_REQUEST: {
      return { ...state, isFetching: true, error: "" };
    }
    case LOGIN_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        name: action.payload,
        userId: action.userId,
        isLogin: true,
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
        isLogin: false,
      };
    }
    case LOGOUT_REQUEST: {
      return { ...state, isFetching: true, error: "" };
    }
    case LOGOUT_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        name: "",
        userId: "",
        error: "",
        avatar: "",
        avatarIsLoaded: false,
        isLogin: false,
      };
    }
    case LOGOUT_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
        isLogin: true,
      };
    }
    case AVATAR_REQUEST: {
      return { ...state, isFetching: true, error: "" };
    }
    case AVATAR_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        error: "",
        avatarIsLoaded: true,
        avatar: action.payload,
      };
    }
    case AVATAR_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
        avatarIsLoaded: false,
      };
    }
    case GET_USERS_REQUEST: {
      return {
        ...state,
        isFetchingUsers: true,
        error: "",
      };
    }
    case GET_USERS_SUCCESS: {
      return {
        ...state,
        isFetchingUsers: false,
        error: "",
        users: action.payload,
      };
    }
    case GET_USERS_FAIL: {
      return {
        ...state,
        isFetchingUsers: false,
        error: action.payload,
        users: [],
      };
    }
    default: {
      return state;
    }
  }
}
