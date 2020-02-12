/*
 * Copyright (C) 2020 Knot.x Project
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import * as data from './fragmentList.mock.json';
import reducer from '../../state/reducers/index';
import FragmentList from './fragmentList';
import FragmentListItem from './FragmentListItem/fragmentListItem';
import NodeList from './NodeList/nodeList';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('<FragmentList /> unit test', () => {
  const mockStore = createStore(reducer, { pageData: data });

  const getWrapper = () => mount(
    <Provider store={mockStore}>
      <FragmentList />
    </Provider>,
  );

  it('should render exactly 5 fragments', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(FragmentListItem))
      .toHaveLength(5);
  });

  it('should render 1 fragment with status success', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'success',
      ))
      .toHaveLength(1);
  });

  it('should render 1 fragment with status error', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'error',
      ))
      .toHaveLength(1);
  });

  it('should render 1 fragment with status missing', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'missing',
      ))
      .toHaveLength(1);
  });

  it('should render 1 fragment with status unprocessed', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'unprocessed',
      ))
      .toHaveLength(1);
  });

  it('should render 1 fragment with status other', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .findWhere(
        (n) => n.name() === 'FragmentListItem' && n.prop('status') === 'other',
      ))
      .toHaveLength(1);
  });

  it('should render node list under each fragment', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .find(FragmentListItem)
      .contains(NodeList)).toEqual(true);
  });

  it('nodelist should not be expanded by default', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .find(FragmentListItem)
      .first()
      .find(NodeList)
      .prop('expanded')).toEqual(false);
  });

  it('nodelist should be displayed after first click', () => {
    const wrapper = getWrapper();
    wrapper
      .find(FragmentListItem)
      .first()
      .simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .find(NodeList)
      .prop('expanded')).toEqual(true);
  });

  it('nodelist should not be displayed after second click', () => {
    const wrapper = getWrapper();
    wrapper
      .find(FragmentListItem)
      .first()
      .simulate('click')
      .simulate('click');

    expect(wrapper
      .find(FragmentListItem)
      .first()
      .find(NodeList)
      .prop('expanded')).toEqual(false);
  });

  it('first fragment should render exactly 2 nodes in nodelist', () => {
    const wrapper = getWrapper();
    expect(wrapper
      .find(FragmentListItem)
      .first()
      .find('button')).toHaveLength(2);
  });
});
