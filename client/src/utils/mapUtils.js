const initMap = function(loc) {
  this.map = new google.maps.Map(this.mapNode, {
    zoom: 15,
    center: loc,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  });

  //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.searchNode);
  this.searchBox = new google.maps.places.SearchBox(this.searchNode);
  this.searchBox.bindTo('bounds', this.map);

  this.searchBox.addListener('places_changed', () => {
    let places = this.searchBox.getPlaces();
    let selected = null;

    if (places.length === 1) {
      selected = places[0];
      places = null;
    }
    this.props.updatePlaces(selected, places);
  });
};

const updateMap = function(newMarkers) {
  let bounds = new google.maps.LatLngBounds();

  this.props.markers.forEach(({ marker }) => {
    marker.setMap(null);
  });

  newMarkers.forEach(({ marker, place }) => {
    marker.setMap(this.map);
    if (place.geometry.viewport) {
      bounds.union(place.geometry.viewport);
    } else {
      bounds.extend(place.geometry.location);
    }
  });

  this.map.fitBounds(bounds);
};

const formatMarkers = function(selected, places) {
  return (selected && [selected] || places).map(place => {
    let marker = {};
    marker.marker = new google.maps.Marker(
      clean({
        title: place.name,
        icon: !selected ? icon(place) : null,
        position: place.geometry.location
      })
    );
    marker.place = place;
    return marker;
  });
};

const icon = place => {
  return {
    url: place.icon,
    size: new google.maps.Size(25, 30),
    origin: new google.maps.Point(0, 0),
    scaledSize: new google.maps.Size(20, 20)
  };
};

const clean = (obj) => {
  for (let key in obj) {
    if (!obj[key]) {
      delete obj[key];
    }
  }
  return obj;
}

export { initMap, updateMap, formatMarkers };