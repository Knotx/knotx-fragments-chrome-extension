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
import { ThemeProvider } from 'styled-components';
import PropTypes from 'prop-types';
import { defaultTheme, darkTheme } from './themes';
import SidePanel from '../components/SidePanel/sidePanel';
import MainPanel from '../components/MainPanel/mainPanel';

import 'vis-timeline/dist/vis-timeline-graph2d.min.css';

const App = ({ tabId }) => {
  const { themeName: chromeTheme } = chrome.devtools.panels;
  const theme = chromeTheme === 'default' ? defaultTheme : darkTheme;

  return (
    <ThemeProvider theme={theme}>
      <SidePanel tabId={tabId} />
      <MainPanel tabId={tabId} />
    </ThemeProvider>
  );
};

App.propTypes = {
  tabId: PropTypes.number.isRequired,
};

export default App;
