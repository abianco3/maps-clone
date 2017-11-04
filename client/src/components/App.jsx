import React, { Component } from 'react';
import GoogleMap from './GoogleMap.jsx';
import { formatMarkers } from '../utils/mapUtils';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {
      markers: [],
      places: [],
      selected: null
    };
  }
  
  setLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((pos) => {
        this.setState({
          location: {lat: pos.coords.latitude, lng: pos.coords.longitude}
        });
      }, (err) => {
        this.setState({
          location: {lat: -25.363, lng: 131.044}
        });
      });
    } else {
      this.setState({
        location: {lat: -25.363, lng: 131.044}
      });
    }
  }

  updatePlaces(selected, places) {
    this.setState({
      places: places || [],
      selected: selected,
      markers: formatMarkers(selected, places)
    });
  }

  componentDidMount() {
    this.setLocation();
  }

  render() {
    const { location } = this.state;
    if (location) {
      return (
        <div>
          <GoogleMap 
            location={this.state.location}
            updatePlaces={this.updatePlaces.bind(this)}
            markers={this.state.markers}
          />
        </div>
      );
    }
    return '';
  }
}

export default App;