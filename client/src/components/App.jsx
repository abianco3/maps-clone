import React, { Component } from 'react';
import GoogleMap from './GoogleMap.jsx';

class App extends Component {
  
  constructor(props) {
    super(props);
    this.state = {};
  }
  
  setLocation() {
    if ('geolocation' in navigator) {
      const success = (pos) => {
        this.setState({
          location: {lat: pos.coords.latitude, lng: pos.coords.longitude}
        });
      };

      const error = () => {
        this.setState({
          location: {lat: -25.363, lng: 131.044}
        });
      };

      navigator.geolocation.getCurrentPosition(success, error);
    } else {
      this.setState({
        location: {lat: -25.363, lng: 131.044}
      });
    }
  }

  componentDidMount() {
    this.setLocation();
  }

  render() {
    const { location } = this.state;
    if (location) {
      return (
        <div>
          <GoogleMap location={this.state.location} />
        </div>
      );
    }
    return '';
  }
}

export default App;