import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "reactstrap";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";
import { Gallery, Item } from "react-photoswipe-gallery";
import RippleLoader from "../Loaders/RippleLoader";
import "./Photos.css";

const Photos = ({ photos, years, isFetching, error, getPhotos, photosAndComments }) => {
  const [activeButton, setButtonState] = useState(null);

  const onBtnClick = (index) => (e) => {
    const year = +e.currentTarget.innerText;
    isNaN(year) ? getPhotos(null) : getPhotos(year);
    setButtonState(index);
    console.log(photosAndComments);
  };

  function renderTemplate() {
    if (error) {
      return <p>{error}</p>;
    } else if (isFetching) {
      return <RippleLoader />;
    } else {
      return photos ? (
        <Gallery>
          {photos.map((entry, index) => {
            return (
              <Item
                original={entry.sizes[entry.sizes.length - 1].url}
                thumbnail={entry.sizes[0].url}
                width={entry.sizes[entry.sizes.length - 1].width}
                height={entry.sizes[entry.sizes.length - 1].height}
                key={index}
              >
                {({ ref, open }) => {
                  return (
                    <div className="image-container">
                      <img
                        ref={ref}
                        onClick={open}
                        src={entry.sizes[entry.sizes.length - 1].url}
                        alt=""
                        className="m-2 border border-warning p-1 card "
                        height="400px"
                      />
                      <div className="btn">
                        <span className="badge badge-danger">{entry.likes.count} ❤</span>
                        <span className="badge badge-success ml-1">{entry.reposts.count} ↩</span>
                        <span className="badge badge-warning ml-1">{entry.reposts.count} ✉</span>
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
  }

  return (
    <div className="">
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
            id={index}
          >
            {item}
          </Button>
        ))}
      </ButtonGroup>
      <div className="row mt-3 justify-content-center ">{renderTemplate()}</div>
    </div>
  );
};

export default Photos;

Photos.propTypes = {
  years: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
  photosAndComments: PropTypes.object.isRequired,
};
