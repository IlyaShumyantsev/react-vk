import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { Button, ButtonGroup } from "reactstrap";
import DotsLoader from "../Loaders/DotsLoader";

const Photos = ({ photos, year, years, isFetching, error, getPhotos }) => {
  const [activeButton, setButtonState] = useState(null);

  const onBtnClick = (index) => (e) => {
    const year = +e.currentTarget.innerText;
    isNaN(year) ? getPhotos(null) : getPhotos(year);
    return () => setButtonState(index);
    // console.log(e.currentTarget);
    // e.currentTarget.classList.toggle("active");
    // setButtonsState(e.currentTarget.classList.toggle("active"));
  };

  useEffect(() => {
    document.title = activeButton;
    console.log(activeButton);
  });

  function renderTemplate() {
    if (error) {
      return <p>{error}</p>;
    } else if (isFetching) {
      return <DotsLoader />;
    } else {
      return photos.map((entry) => (
        <div key={entry.id} className="m-2 border border-warning p-1">
          <p>
            <img src={entry.sizes[0].url} alt="" />
          </p>
          <p>{entry.likes.count} ❤</p>
        </div>
      ));
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
      <div className="row mt-3">
        <h3>{!year ? <p>Все</p> : <p>{year} год</p>}</h3>
        {renderTemplate()}
      </div>
    </div>
  );
};

export default Photos;

Photos.propTypes = {
  year: PropTypes.number,
  years: PropTypes.array.isRequired,
  error: PropTypes.string.isRequired,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};
