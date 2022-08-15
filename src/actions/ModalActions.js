export const COMMENTS_MODAL_OPEN = "COMMENTS_MODAL_OPEN";
export const COMMENTS_MODAL_CLOSED = "COMMENTS_MODAL_CLOSED";

export function handleCommentsModal(isOpen, comments) {
  return (dispatch) => {
    if (isOpen) {
      dispatch({ type: COMMENTS_MODAL_OPEN, payload: comments });
    } else {
      dispatch({ type: COMMENTS_MODAL_CLOSED });
    }
  };
}
