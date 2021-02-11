import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_REQUEST,
  LOGOUT_FAIL,
  AVA_REQUEST,
  AVA_SUCCESS,
  AVA_FAIL,
} from "../actions/UserActions";

const initialState = {
  name: "",
  error: "",
  ava: "",
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
      return { ...state, isFetching: false, name: "", error: "" };
    }
    case LOGOUT_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      };
    }
    case AVA_REQUEST: {
      return { ...state, isFetching: true, error: "" };
    }
    case AVA_SUCCESS: {
      return { ...state, isFetching: false, error: "" };
    }
    case AVA_FAIL: {
      return {
        ...state,
        isFetching: false,
        error: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
}
