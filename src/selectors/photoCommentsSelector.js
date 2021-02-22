import { createSelector } from "reselect";

const getPhotoComments = (photos) => photos.comments.items;
const getPhotos = (photos) => photos.photos;
const getUsers = (_, user) => user.users;

export const photoCommentsSelector = createSelector(
  [getPhotoComments, getPhotos, getUsers],
  (allComments, allPhotos, allUsers) => {
    const photosAndComments = [];

    allComments
      ?.sort((firstComment, secondComment) => firstComment.date - secondComment.date)
      ?.forEach((comment) => {
        comment.user = Object.assign(
          {},
          allUsers?.filter((user) => user.id === comment.from_id)
        );
      });

    allPhotos?.forEach((photo) => {
      let comments = allComments?.filter((comment) => comment.pid === photo.id) || {};
      photosAndComments.push({ photo, comments });
    });

    return photosAndComments;
  }
);
