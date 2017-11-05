import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { googleKey } from '../../../apiKeys';
import { initMap, updateMap } from '../utils/mapUtils';

const load = (src) => {
  const ref = window.document.getElementsByTagName('script')[0];
  const script = window.document.createElement('script');
  script.setAttribute('src', src);
  script.async = true;
  ref.parentNode.insertBefore(script, ref);
};

class GoogleMap extends Component {
  constructor(props) {
    super(props);
    this.loadMap = this.loadMap.bind(this);
  }

  componentDidMount() {
    window.loadMap = this.loadMap;
    const src = `https://maps.googleapis.com/maps/api/js?key=${googleKey}&libraries=places&callback=loadMap`;
    load(src);
  }

  componentWillReceiveProps({ markers }) {
    updateMap.call(this, markers);
  }

  loadMap() {
    this.searchNode = findDOMNode(this.refs.search);
    this.mapNode = findDOMNode(this.refs.map);
    initMap.call(this, this.props.location);
  }


  render() {
    return (
      <div className="main">
        <input type="text" ref="search" className="search" />
        <div ref="map" className="map" />
      </div>
    );
  }
}

GoogleMap.propTypes = {
  location: PropTypes.object,
  updatePlaces: PropTypes.func,
  markers: PropTypes.array,
};

export default GoogleMap;
