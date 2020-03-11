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

/* eslint no-new: 0 */

import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import renderjson from 'renderjson';
import { renderJsonDefaultConfig } from '../../helpers/renderjsonHelper';
import { drawGraph } from '../../helpers/graph/drawingHelper';
import { constructGraph } from '../../helpers/graph/declarationHelper';
import {
  GraphContainer,
  Graph,
  Info,
} from './graph.style';

const selectors = {
  GRAPH: '.graphContainer .graph',
};

const GraphComponent = ({
  graphJson,
}) => {
  // const [graphInfo, setGraphInfo] = React.useState({});

  useEffect(() => {
    if (graphJson) {
      const graphDeclaration = constructGraph(graphJson);
      const network = drawGraph(graphDeclaration, document.querySelector(selectors.GRAPH));

      const infoContainer = document.getElementById('info');
      infoContainer.innerHTML = '';

      network.on('click', (e) => {
        const nodeId = e.nodes[0];

        if (nodeId) {
          const { info } = graphDeclaration.nodes.find((el) => el.id === nodeId);

          infoContainer.innerHTML = '';

          renderJsonDefaultConfig();

          infoContainer.appendChild(renderjson(info));
        }
      });
    }
  }, [graphJson]);

  return (
    <GraphContainer className="graphContainer">
      <Graph className="graph" />
      <Info id="info" />
    </GraphContainer>
  );
};


GraphComponent.defaultProps = {
  graphJson: null,
};

GraphComponent.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  graphJson: PropTypes.object,
};


export default GraphComponent;
