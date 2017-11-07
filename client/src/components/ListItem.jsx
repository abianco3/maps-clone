import React from 'react';
import PropTypes from 'prop-types';

const ListItem = ({ place, updatePlaces }) => {
  const {
    name,
    rating,
    types,
    formatted_address,
  } = place;

  const streetAddress = formatted_address && formatted_address.split(',')[0];

  return (
    <div
      role="navigation"
      className="list-item"
      onClick={() => updatePlaces([place], [])}
      onKeyPress={(e) => {
        if (e.keyCode === 13) {
          updatePlaces([place], []);
        }
      }}
    >
      <h4>{name}</h4>
      <p>{rating} stars</p>
      <p>{streetAddress}</p>
      {types && <p>{types[0].replace(/_/g, ' ')}</p>}
    </div>
  );
};

ListItem.propTypes = {
  place: PropTypes.object,
  updatePlaces: PropTypes.func,
};

export default ListItem;
