import React from 'react';
import { shallow } from 'enzyme';
import App from '../client/src/components/App';
import GoogleMap from '../client/src/components/GoogleMap';

describe('should render the app', () => {
  test('should render null if no location', () => {
    const wrapper = shallow(<App />);
    wrapper.setState({ location: null });
    expect(wrapper.find('.app')).toHaveLength(0);
  });

  test('should render app if default location', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find('.app')).toHaveLength(1);
  });

  test('should pass selected to props', () => {
    const wrapper = shallow(<App />);
    const isMarkersArray = Array.isArray(wrapper.find(GoogleMap).props().markers);
    expect(isMarkersArray).toEqual(true);
  });

  test('should pass updatePlaces to props', () => {
    const wrapper = shallow(<App />);
    const updatePlacesType = typeof wrapper.find(GoogleMap).props().updatePlaces;
    expect(updatePlacesType).toBe('function');
  });
});
