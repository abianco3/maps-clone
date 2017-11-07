import React from 'react';
import PropTypes from 'prop-types';
import ListItem from './ListItem';
import ListItemDetail from './ListItemDetail';

const List = ({ selected, places, updatePlaces }) => {
  if (selected.length) {
    return (
      <div className="list">
        <ListItemDetail selected={selected} />
      </div>
    );
  }
  if (places.length) {
    return (
      <div className="list">
        {places.map((place) => {
          return (
            <ListItem
              key={place.id}
              place={place}
              updatePlaces={updatePlaces}
            />
          );
        })}
      </div>
    );
  }
  return null;
};

List.propTypes = {
  selected: PropTypes.array,
  places: PropTypes.array,
  updatePlaces: PropTypes.func,
};

export default List;
