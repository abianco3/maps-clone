import React from 'react';
import { shallow } from 'enzyme';
import List from '../client/src/components/List';
import ListItemDetail from '../client/src/components/ListItemDetail';

describe('should render conditionally based on props', () => {
  const places = [
    { loc: 'here', id: 0 },
    { loc: 'there', id: 1 },
    { loc: 'anywhere', id: 2 },
  ];

  const selected = [
    { loc: 'bibliomania', id: 4 },
  ];

  test('should render ListItems for each place in props', () => {
    const wrapper = shallow(<List places={places} selected={[]} updatePlaces={() => {}} />);
    expect(wrapper.find('.list').children()).toHaveLength(places.length);
  });

  test('should render ListItemDetail if passed a selection', () => {
    const wrapper = shallow(<List places={[]} selected={selected} updatePlaces={() => {}} />);
    expect(wrapper.find(ListItemDetail).exists()).toBe(true);
  });
});
