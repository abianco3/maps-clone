import React from 'react';
import PropTypes from 'prop-types';

const buildBgStyle = (photo, width, height) => {
  const url = photo.getUrl({ maxWidth: width, maxHeight: height });
  return { backgroundImage: `url(${url})` };
};

const ListItemDetail = ({ selected }) => {
  const { name, rating, photos, types, opening_hours, formatted_address, formatted_phone_number, url, website } = selected[0];
  let style = {};

  if (photos && photos[0].getUrl) {
    style = buildBgStyle(photos[0], 400, 500);
  }

  return (
    <div className="detail">
      <div className="header" style={style}>
        <div>
          <h4>{name}</h4>
          <p>{rating}  {types && types[0].replace(/_/g, ' ')}</p>
        </div>
      </div>
      <div>
        {opening_hours && <p>{opening_hours.open_now ? 'Open Now' : 'Closed'}</p>}
        <p>{formatted_address || 'Suggest an Address'}</p>
        <p>{formatted_phone_number || 'Add a phone number'}</p>
        <p><a href={website || '#'}>{website ? website.replace(/http:\/\/|https:\/\//, '') : 'Add a website'}</a></p>
        <p><a href={url || '#'}>{url ? 'Google Site' : 'Add this business to Google'}</a></p>
      </div>
      <div className="gallery">
        {photos && photos.map((photo, i) => {
          return <div key={i} style={buildBgStyle(photo, 200, 200)} />;
        })}
      </div>
    </div>
  );
};

ListItemDetail.propTypes = {
  selected: PropTypes.array,
};

export default ListItemDetail;
