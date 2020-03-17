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

import React, { useState } from 'react';
import {
  RightNavBarContainer,
  NavBar,
  RightPanel,
  NavBarItem,
  HideRightPanel,
  LegendWrapper,
  NodeInfoWrapper,
} from './navbar.style';
import Legend from '../../Graphs/legend';

const RightNavBar = () => {
  const [currentOption, setCurrentOption] = useState(null);
  const [expanded, setExpanded] = useState(false);

  const navbarOptions = {
    nodeInfo: 'nodeInfo',
    legend: 'legend',
  };

  return (
    <RightNavBarContainer>
      <RightPanel showPanel={expanded}>
        <NodeInfoWrapper
          id="nodeInfo"
          showNodeInfo={currentOption === navbarOptions.nodeInfo}
        />
        <LegendWrapper
          showLegend={currentOption === navbarOptions.legend}
        >
          <Legend />
        </LegendWrapper>

      </RightPanel>
      <NavBar>
        <HideRightPanel
          onClick={() => {
            setCurrentOption(null);
            if (expanded) {
              setExpanded(false);
            }
          }}
        >
          -
        </HideRightPanel>
        <NavBarItem
          onClick={() => {
            setCurrentOption(navbarOptions.nodeInfo);
            if (!expanded) {
              setExpanded(true);
            }
          }}
        >
          info
        </NavBarItem>
        <NavBarItem
          onClick={() => {
            setCurrentOption(navbarOptions.legend);
            if (!expanded) {
              setExpanded(true);
            }
          }}
        >
          Legend
        </NavBarItem>
      </NavBar>
    </RightNavBarContainer>
  );
};

export default RightNavBar;
