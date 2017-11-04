const initMap = function(loc) {
  this.map = new google.maps.Map(this.mapNode, {
    zoom: 15,
    center: loc,
    mapTypeControlOptions: {
      position: google.maps.ControlPosition.LEFT_BOTTOM
    }
  });
  google.maps.event.addListener(this.map, 'bounds_changed', () => {
    let bounds = this.map.getBounds();
    let options = {
      bounds: bounds
    };
    //this.map.controls[google.maps.ControlPosition.TOP_LEFT].push(this.searchNode);
    this.autocomplete = new google.maps.places.Autocomplete(this.searchNode, options);
  })
}

export { initMap };