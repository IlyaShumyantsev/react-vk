export const GET_PHOTOS_REQUEST = "GET_PHOTOS_REQUEST";
export const GET_PHOTOS_SUCCESS = "GET_PHOTOS_SUCCESS";
export const GET_PHOTOS_FAIL = "GET_PHOTOS_FAIL";

export const GET_PHOTO_COMMENTS_REQUEST = "GET_PHOTO_COMMENTS_REQUEST";
export const GET_PHOTO_COMMENTS_SUCCESS = "GET_PHOTO_COMMENTS_SUCCESS";
export const GET_PHOTO_COMMENTS_FAIL = "GET_PHOTO_COMMENTS_FAIL";

let photosArr = [];
let cachedPhotos = false;

function makeYearPhotos(photos, selectedYear) {
  let createdYear,
    yearPhotos = [],
    years = new Set([]);

  photos.forEach((item) => {
    createdYear = new Date(item.date * 1000).getFullYear();
    years.add(createdYear);
    if (createdYear === selectedYear) {
      yearPhotos.push(item);
    } else if (selectedYear === null) {
      yearPhotos.push(item);
    }
  });

  yearPhotos.sort((a, b) => b.likes.count - a.likes.count);

  return {
    yearPhotos,
    years: [...years],
  };
}

function getMorePhotos(offset, count, year, dispatch) {
  VK.Api.call(
    "photos.getAll",
    {
      extended: 1,
      count: count,
      offset: offset,
      v: "5.80",
    },
    (r) => {
      try {
        photosArr = photosArr.concat(r.response.items);
        if (offset <= r.response.count) {
          offset += 200;
          getMorePhotos(offset, count, year, dispatch);
        } else {
          let photos = makeYearPhotos(photosArr, year);
          cachedPhotos = true;
          dispatch({
            type: GET_PHOTOS_SUCCESS,
            payload: photos.yearPhotos,
            years: photos.years,
          });
        }
      } catch (e) {
        dispatch({
          type: GET_PHOTOS_FAIL,
          error: true,
          payload: new Error(e),
        });
      }
    }
  );
}

function getPhotoComments(dispatch) {
  dispatch({ type: GET_PHOTO_COMMENTS_REQUEST });
  VK.Api.call(
    "photos.getAllComments",
    {
      count: 100,
      v: "5.130",
    },
    (r) => {
      if (r.response) {
        dispatch({
          type: GET_PHOTO_COMMENTS_SUCCESS,
          payload: r.response,
        });
      } else {
        dispatch({
          type: GET_PHOTO_COMMENTS_FAIL,
          payload: new Error("Ошибка загрузки комментариев"),
        });
      }
    }
  );
}

export function getPhotos(year) {
  return (dispatch) => {
    dispatch({ type: GET_PHOTOS_REQUEST, payload: year });
    if (cachedPhotos) {
      let photos = makeYearPhotos(photosArr, year);
      dispatch({
        type: GET_PHOTOS_SUCCESS,
        payload: photos.yearPhotos,
        years: photos.years,
      });
    } else {
      getMorePhotos(0, 200, year, dispatch);
    }
    getPhotoComments(dispatch);
  };
}
