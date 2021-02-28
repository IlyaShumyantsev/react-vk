import { COMMENTS_MODAL_OPEN, COMMENTS_MODAL_CLOSED } from "../actions/ModalActions";

const initialState = {
  isOpen: false,
  comments: [],
};

export function modalReducer(state = initialState, action) {
  switch (action.type) {
    case COMMENTS_MODAL_OPEN: {
      return {
        ...state,
        isOpen: true,
        comments: action.payload,
      };
    }
    case COMMENTS_MODAL_CLOSED: {
      return {
        ...state,
        isOpen: false,
        comments: [],
      };
    }
    default: {
      return state;
    }
  }
}
