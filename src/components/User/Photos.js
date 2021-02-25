import React, { useState, useEffect, useCallback } from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "reactstrap";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import LoadingHOC from "../HOC/LoadingHOC";
import { FACEBOOK_LOADER } from "../../constants/loadersConstants";
import CommetnsModal from "../Modals/CommentsModal";
import "./Photos.css";
import { debounce } from "lodash";

const Photos = ({
  years,
  isFetching,
  error,
  getPhotos,
  photosAndComments,
  handleCommentsModal,
  modal,
  getUsers,
  photos,
}) => {
  const [activeButton, setButtonState] = useState(null);

  const onBtnClick = (index) => (e) => {
    const year = +e.currentTarget.innerText;
    isNaN(year) ? getPhotoDebounce(null) : getPhotoDebounce(year);
    setButtonState(index);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const getPhotoDebounce = useCallback(debounce(getPhotos, 300), []);

  useEffect(() => {
    getUsers([...new Set(photos.comments.items?.map((item) => item.from_id))]);
    photos.years.indexOf(photos.year) !== -1
      ? setButtonState(photos.years.indexOf(photos.year))
      : setButtonState(null);
  }, [getUsers, photos.comments.items, photos.year, photos.years]);

  function renderTemplate() {
    return photosAndComments ? (
      <Gallery>
        {modal.isOpen && <CommetnsModal modal={modal} handleCommentsModal={handleCommentsModal} />}
        {photosAndComments.map((entry, index) => {
          return (
            <Item
              original={entry.photo.sizes[entry.photo.sizes.length - 1].url}
              thumbnail={entry.photo.sizes[0].url}
              width={entry.photo.sizes[entry.photo.sizes.length - 1].width}
              height={entry.photo.sizes[entry.photo.sizes.length - 1].height}
              key={index}
            >
              {({ ref, open }) => {
                return (
                  <div className="image-container">
                    <img
                      ref={ref}
                      onClick={open}
                      src={entry.photo.sizes[entry.photo.sizes.length - 1].url}
                      alt=""
                      className="m-2 border border-warning p-1 card "
                      height="400px"
                    />
                    <div className="btn">
                      <span className="badge badge-danger">{entry.photo.likes.count} ❤</span>
                      <span className="badge badge-success ml-1">
                        {entry.photo.reposts.count} ↩
                      </span>
                      {entry.comments.length ? (
                        <button
                          className="btn btn-warning badge badge-warning ml-1"
                          onClick={() => handleCommentsModal(!modal.isOpen, entry.comments)}
                        >
                          {entry.comments.length} ✉
                        </button>
                      ) : (
                        <span className="badge badge-warning ml-1">{entry.comments.length} ✉</span>
                      )}
                    </div>
                  </div>
                );
              }}
            </Item>
          );
        })}
      </Gallery>
    ) : null;
  }

  return (
    <div>
      <ButtonGroup className="mt-1 col-12">
        <Button
          color="warning"
          className={`btn ${activeButton === null ? "active" : ""}`}
          onClick={onBtnClick(null)}
        >
          Все
        </Button>
        {years.map((item, index) => (
          <Button
            color="warning"
            className={`btn ${activeButton === index ? "active" : ""}`}
            onClick={onBtnClick(index)}
            key={index}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
      <div className="row mt-3 justify-content-center ">{renderTemplate()}</div>
    </div>
  );
};

export const PhotosUI = LoadingHOC(FACEBOOK_LOADER)(Photos);

Photos.propTypes = {
  years: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  getPhotos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  photosAndComments: PropTypes.array.isRequired,
  handleCommentsModal: PropTypes.func.isRequired,
  modal: PropTypes.object.isRequired,
  getUsers: PropTypes.func.isRequired,
  photos: PropTypes.object.isRequired,
};
