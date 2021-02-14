import { GET_PHOTOS_REQUEST, GET_PHOTOS_SUCCESS, GET_PHOTOS_FAIL } from "../actions/PhotosActions";

const initialState = {
  year: 2021,
  years: [],
  photos: [],
  isFetching: false,
  error: "",
};

export function photosReducer(state = initialState, action) {
  switch (action.type) {
    case GET_PHOTOS_REQUEST: {
      return {
        ...state,
        year: action.payload,
        isFetching: true,
        error: "",
        years: [],
      };
    }
    case GET_PHOTOS_SUCCESS: {
      return {
        ...state,
        photos: action.payload,
        isFetching: false,
        error: "",
        years: action.years,
      };
    }
    case GET_PHOTOS_FAIL: {
      return {
        ...state,
        error: action.payload.message,
        isFetching: false,
        years: [],
      };
    }
    default: {
      return state;
    }
  }
}
