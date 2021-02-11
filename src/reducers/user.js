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
} from "../actions/UserActions";

const initialState = {
  name: "",
  error: "",
  avatar: "",
  userId: "",
  avatarIsLoaded: false,
  isFetching: false,
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
      };
    }
    case LOGIN_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
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
      };
    }
    case LOGOUT_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
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
    default: {
      return state;
    }
  }
}
