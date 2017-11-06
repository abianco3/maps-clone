import React from 'react';
import PropTypes from 'prop-types';

const ListItemDetail = ({ selected }) => {
  const { name, rating, photos, types, opening_hours, formatted_address, formatted_phone_number, url, website } = selected[0];
  let style = {};

  if (photos && photos[0].getUrl) {
    const background = photos[0].getUrl({ maxWidth: 400, maxHeight: 500 });
    style = { backgroundImage: `url(${background})` };
  }

  return (
    <div className="detail">
      <div className="header" style={style}>
        <div>
          <h4>{name}</h4>
          <p>{rating}  {types[0].replace('_', ' ')}</p>
        </div>
      </div>
      <div>
        <p>{opening_hours.open_now ? 'Open Now' : 'Closed'}</p>
        <p>{formatted_address || 'Suggest an Address'}</p>
        <p>{formatted_phone_number || 'Add a phone number'}</p>
        <p><a href={website || '#'}>{website ? website.replace(/http:\/\/|https:\/\//, '') : 'Add a website'}</a></p>
        <p><a href={url || '#'}>{url ? 'Google Site' : 'Add this business to Google'}</a></p>
      </div>
    </div>
  );
};

ListItemDetail.propTypes = {
  selected: PropTypes.array,
};

export default ListItemDetail;
