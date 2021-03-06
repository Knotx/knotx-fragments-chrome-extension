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
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer from '../../state/reducers/index';
import MainPanel from './MainPanel';
import { FRAGMENT_NOT_SELECTED_MSG } from '../../helpers/constants';

const store = {
  pageData: {
    1: {
      renderedGraph: null,
    },
  },
};

describe('Main panel component', () => {
  it('should render message if fragment is not selected', () => {
    const wrapper = mount(
      <Provider store={createStore(reducer, store)}>
        <MainPanel
          tabId={1}
        />
      </Provider>,
    );
    expect(wrapper.text()).toEqual(FRAGMENT_NOT_SELECTED_MSG);
  });
});
