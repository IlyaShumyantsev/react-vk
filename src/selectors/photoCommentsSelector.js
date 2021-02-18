import { createSelector } from "reselect";

const getPhotoComments = (photos) => photos.comments.items;
const getPhotos = (photos) => photos.photos;

export const photoCommentsSelector = createSelector(
  [getPhotoComments, getPhotos],
  (allComments, allPhotos) => {
    const photosAndComments = [];
    allPhotos.forEach((photo) => {
      let comments = allComments.filter((comment) => comment.pid === photo.id) || {};
      photosAndComments.push({ photo, comments });
    });
    console.log(photosAndComments);
    return photosAndComments;
  }
);
