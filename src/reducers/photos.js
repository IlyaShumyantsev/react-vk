import {
  GET_PHOTOS_REQUEST,
  GET_PHOTOS_SUCCESS,
  GET_PHOTOS_FAIL,
  GET_PHOTO_COMMENTS_REQUEST,
  GET_PHOTO_COMMENTS_SUCCESS,
  GET_PHOTO_COMMENTS_FAIL,
} from "../actions/PhotosActions";

const initialState = {
  year: 2021,
  years: [],
  photos: [],
  comments: [],
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
      console.log("state.photos - ", state);
      console.log("action.payload - ", action.payload);
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
    case GET_PHOTO_COMMENTS_REQUEST: {
      return {
        ...state,
        isFetching: true,
        comments: [],
        error: "",
      };
    }
    case GET_PHOTO_COMMENTS_SUCCESS: {
      return {
        ...state,
        isFetching: false,
        comments: action.payload,
        error: "",
      };
    }
    case GET_PHOTO_COMMENTS_FAIL: {
      return {
        ...state,
        isFetching: false,
        comments: [],
        error: action.payload.message,
      };
    }
    default: {
      return state;
    }
  }
}
