import React from "react";
import PropTypes from "prop-types";

export function Page({ year, photos, isFetching, getPhotos }) {
  function onBtnClick(e) {
    const year = +e.currentTarget.innerText;
    getPhotos(year);
  }

  return (
    <div className="ib page">
      <p>
        <button className="btn" onClick={onBtnClick}>
          2021
        </button>
        <button className="btn" onClick={onBtnClick}>
          2020
        </button>
        <button className="btn" onClick={onBtnClick}>
          2019
        </button>
      </p>
      <h3>{year} год</h3>
      {isFetching ? <p>Загрузка</p> : <p>У тебя {photos.length} фото.</p>}
    </div>
  );
}

Page.propTypes = {
  year: PropTypes.number.isRequired,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};
