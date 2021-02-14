import React from "react";
import PropTypes from "prop-types";

const Photos = ({ photos, year, years, isFetching, error, getPhotos }) => {
  const onBtnClick = (e) => {
    const year = +e.currentTarget.innerText;
    isNaN(year) ? getPhotos(null) : getPhotos(year);
  };

  function renderTemplate() {
    if (error) {
      return <p>Во время загрузки фото произошла ошибка</p>;
    } else if (isFetching) {
      return <p>Загрузка</p>;
    } else {
      return photos.map((entry) => (
        <div key={entry.id}>
          <p>
            <img src={entry.sizes[0].url} alt="" />
          </p>
          <p>{entry.likes.count} ❤</p>
        </div>
      ));
    }
  }

  return (
    <div className="ib page">
      <button className="btn" onClick={onBtnClick}>
        все
      </button>
      {years.map((item, index) => (
        <button className="btn" onClick={onBtnClick} key={index}>
          {item}
        </button>
      ))}
      <h3>{!year ? <p>Все</p> : <p>{year} год</p>}</h3>
      {renderTemplate()}
    </div>
  );
};

export default Photos;

Photos.propTypes = {
  year: PropTypes.number,
  photos: PropTypes.array.isRequired,
  getPhotos: PropTypes.func.isRequired,
  isFetching: PropTypes.bool.isRequired,
};
