import React, { useState } from 'react';
import PropTypes from 'prop-types';

const StarRating = ({
  starCount = 10,
  value,
  editing = true,
  starColor = '#ffb400',
  emptyStarColor = '#333333',
  onStarClick: clickHandler,
  name,
  renderStarIcon,
  renderStarIconHalf,
  xtraStyles = {}
}) => {
  const [rating, setRating] = useState(value);

  const onChange = inputValue => {
    if (!editing) {
      return;
    }

    // do not update internal state based on input value if prop passed
    if (value != null) {
      return;
    }
    return setRating(inputValue);
  };

  const onStarClick = (index, value, name, e) => {
    e.stopPropagation();

    if (!editing) {
      return;
    }
    setRating(index);
    return clickHandler(index, value, name, e);
  };

  const renderStars = () => {
    const starStyles = (i, value) => ({
      float: 'right',
      cursor: editing ? 'pointer' : 'default',
      color: value >= i ? starColor : emptyStarColor
    });
    const radioStyles = {
      display: 'none',
      position: 'absolute',
      marginLeft: -9999
    };

    // populate stars
    const starNodes = [];

    for (let i = starCount; i > 0; i--) {
      const id = `${name}_${i}`;
      const starNodeInput = (
        <input
          key={`input_${id}`}
          style={radioStyles}
          className="dv-star-rating-input"
          type="radio"
          name={name}
          id={id}
          value={i}
          checked={rating === i}
          onChange={() => onChange(i, name)}
        />
      );
      const starNodeLabel = (
        <label
          key={`label_${id}`}
          style={starStyles(i, rating)}
          className={`dv-star-rating-star ${
            rating >= i ? 'dv-star-rating-full-star' : 'dv-star-rating-empty-star'
          }`}
          htmlFor={id}
          onClick={e => onStarClick(i, rating, name, e)}
        >
          {renderIcon(i, rating, name, id)}
        </label>
      );

      starNodes.push(starNodeInput);
      starNodes.push(starNodeLabel);
    }

    return starNodes.length ? starNodes : null;
  };

  const renderIcon = (index, ratingVal, nameInput, id) => {
    if (
      typeof renderStarIconHalf === 'function' &&
      Math.ceil(ratingVal) === index &&
      ratingVal % 1 !== 0
    ) {
      return renderStarIconHalf(index, ratingVal, nameInput, id);
    }

    if (typeof renderStarIcon === 'function') {
      return renderStarIcon(index, ratingVal, nameInput, id);
    }

    return (
      <i
        key={`icon_${id}`}
        style={{ fontStyle: 'normal', marginLeft: '5px', fontSize: '24px', ...xtraStyles }}
      >
        &#9733;
      </i>
    );
  };

  return (
    <div
      style={{
        display: 'flex',
        position: 'relative',
        flexDirection: 'row-reverse',
        justifyContent: 'center',
        marginBottom: '20px'
      }}
      className={`dv-star-rating ${!editing ? 'dv-star-rating-non-editable' : ''}`}
    >
      {renderStars()}
    </div>
  );
};

StarRating.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.number,
  editing: PropTypes.bool,
  starCount: PropTypes.number,
  starColor: PropTypes.string,
  renderStarIcon: PropTypes.func,
  renderStarIconHalf: PropTypes.func,
  xtraStyles: PropTypes.object
};

export default StarRating;
