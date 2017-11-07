const getPlaceDetails = (map, place) => {
  return new Promise((resolve, reject) => {
    const detailsReq = new google.maps.places.PlacesService(map);

    detailsReq.getDetails(place, (result, status) => {
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        resolve(result);
      } else {
        reject(result);
      }
    });
  });
};

const initMap = function initMap(loc) {
  this.map = new google.maps.Map(this.mapNode, {
    zoom: 15,
    center: loc,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM,
    },
  });

  this.searchBox = new google.maps.places.SearchBox(this.searchNode);
  this.searchBox.bindTo('bounds', this.map);

  this.searchBox.addListener('places_changed', () => {
    const places = this.searchBox.getPlaces();
    let selected = [];

    Promise.all(places.map((place) => {
      return getPlaceDetails(this.map, place)
        .catch(() => place);
    }))
      .then((details) => {
        let placeDetails = details;
        if (details.length === 1) {
          selected = placeDetails;
          placeDetails = [];
        }

        this.props.updatePlaces(selected, placeDetails);
      });
  });
};


const updateMap = function updateMap(newMarkers) {
  const bounds = new google.maps.LatLngBounds();

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

const icon = (place) => {
  return {
    url: place.icon,
    size: new google.maps.Size(25, 30),
    origin: new google.maps.Point(0, 0),
    scaledSize: new google.maps.Size(20, 20),
  };
};


const clean = (obj) => {
  const temp = obj;
  Object.keys(temp).forEach((key) => {
    if (temp[key] === null) {
      delete temp[key];
    }
  });
  return temp;
};

const formatMarkers = function formatMarkers(selected, places) {
  return (selected[0] && selected || places).map((place) => {
    const marker = {};
    marker.marker = new google.maps.Marker(clean({
      title: place.name,
      icon: !selected ? icon(place) : null,
      position: place.geometry.location,
    }));
    marker.place = place;
    return marker;
  });
};

export { initMap, updateMap, formatMarkers, clean, icon };
