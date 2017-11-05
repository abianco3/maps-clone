import React, { Component } from 'react';
import GoogleMap from './GoogleMap';
import { formatMarkers } from '../utils/mapUtils';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      places: [],
      location: null,
      selected: null,
    };
    this.updatePlaces = this.updatePlaces.bind(this);
  }

  componentDidMount() {
    this.setLocation();
  }

  setLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({
          location: { lat: pos.coords.latitude, lng: pos.coords.longitude },
        });
      }, () => {
        this.setState({
          location: { lat: -25.363, lng: 131.044 },
        });
      });
    } else {
      this.setState({
        location: { lat: -25.363, lng: 131.044 },
      });
    }
  }

  updatePlaces(selected, places) {
    this.setState({
      places: places || [],
      selected: selected,
      markers: formatMarkers(selected, places),
    });
  }


  render() {
    const { location } = this.state;
    if (location) {
      return (
        <div className="app">
          <GoogleMap
            location={this.state.location}
            updatePlaces={this.updatePlaces}
            markers={this.state.markers}
          />
        </div>
      );
    }
    return null;
  }
}

export default App;
