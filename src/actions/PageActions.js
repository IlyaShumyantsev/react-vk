export const GET_PHOTOS_REQUEST = "GET_PHOTOS_REQUEST";
export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";

export function getPhotos(year) {
  return (dispatch) => {
    dispatch({ type: GET_PHOTOS_REQUEST, payload: year });

    setTimeout(() => {
      dispatch({ type: GET_PHOTOS_SUCCESS, payload: [12, 432, 2, 4, 3, 23, 2434, 2] });
    }, 1000);
  };
}
