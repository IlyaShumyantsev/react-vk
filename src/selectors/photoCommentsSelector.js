import { createSelector } from "reselect";

const getPhotoComments = (store) => store.photos.comments.items;
const getPhotos = (store) => store.photos.photos;

export const photoCommentsSelector = createSelector(
  [getPhotoComments, getPhotos],
  (allComments, allPhotos) => {
    console.log(allComments, allPhotos);
    const photosAndComments = [];
    allPhotos.forEach((photo) => {
      let comments = allComments.filter((comment) => comment.pid === photo.id) || {};
      photosAndComments.push({ photo, comments });
    });
    console.log(photosAndComments);
    return photosAndComments;
  }
);
