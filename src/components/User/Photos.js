import React, { useState } from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "reactstrap";
import "photoswipe/dist/photoswipe.css";
import "photoswipe/dist/default-skin/default-skin.css";

import { Gallery, Item } from "react-photoswipe-gallery";
import RippleLoader from "../Loaders/RippleLoader";
import "./Photos.css";

const Photos = ({ photos, years, isFetching, error, getPhotos }) => {
  const [activeButton, setButtonState] = useState(null);

  const onBtnClick = (index) => (e) => {
    const year = +e.currentTarget.innerText;
    isNaN(year) ? getPhotos(null) : getPhotos(year);
    setButtonState(index);
    // console.log(e.currentTarget);
    // e.currentTarget.classList.toggle("active");
    // setButtonsState(e.currentTarget.classList.toggle("active"));
  };

  function renderTemplate() {
    if (error) {
      return <p>{error}</p>;
    } else if (isFetching) {
      return <RippleLoader />;
    } else {
      // return photos.map((entry) => (
      //   <div key={entry.id} className="m-2 border border-warning p-1  card img_wrapper">
      //     <img src={entry.sizes[entry.sizes.length - 1].url} alt="" className="card-img" />

      //     <hr></hr>
      //     <div className="card-body text-center">
      //       <h4 className="font-weight-bold blue-text">{entry.likes.count} ❤</h4>
      //     </div>
      //   </div>
      // ));
      const IMAGES = [];
      photos.map((entry) => {
        return IMAGES.push({
          src: entry.sizes[entry.sizes.length - 1].url,
          thumbnail: entry.sizes[0].url,
          thumbnailWidth: 320,
          thumbnailHeight: 212,
        });
      });
      return IMAGES ? (
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
                    <img
                      ref={ref}
                      onClick={open}
                      src={entry.sizes[entry.sizes.length - 1].url}
                      alt=""
                      className="m-2 border border-warning p-1 card "
                      height="400px"
                    />
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
};
