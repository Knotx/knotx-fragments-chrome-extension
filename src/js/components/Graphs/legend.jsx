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
import {
  LegendContainer,
  LegendSection,
  LegendItemIcon,
  SquareIcon,
  CircleIcon,
  RectangleIcon,
  LineIcon,
  LegendItemDescription,
  LegendItem,
  LegendHeader,
} from './legend.style';

const legendArrays = {
  nodes: [
    {
      desc: 'missing',
      color: 'yellow',
      shape: 'square',
    },
    {
      desc: 'unprocessed',
      color: 'grey',
      shape: 'square',
    },
    {
      desc: 'success',
      color: 'green',
      shape: 'square',
    },
    {
      desc: 'error',
      color: 'red',
      shape: 'square',
    },
    {
      desc: 'other',
      color: 'blue',
      shape: 'square',
    },
  ],
  composites: [
    {
      desc: 'startNode',
      color: 'white',
      shape: 'circle',
    },
    {
      desc: 'endNode',
      color: 'multi',
      shape: 'circle',
    },
  ],
  labels: [
    {
      desc: '_success',
      color: 'green',
      shape: 'rectangle',
    },
    {
      desc: '_error',
      color: 'red',
      shape: 'rectangle',
    },
    {
      desc: '_[custom]',
      color: 'blue',
      shape: 'rectangle',
    },
  ],
  edges: [
    {
      desc: 'processed',
      color: 'black',
      shape: 'solid',
    },
    {
      desc: 'unprocessed',
      color: 'grey',
      shape: 'dashed',
    },
  ],
};

const createLegend = (title, items) => {
  const getIcon = (shape, color) => {
    switch (shape) {
      case 'square':
        return (<SquareIcon color={color} />);
      case 'circle':
        return (<CircleIcon color={color} />);
      case 'rectangle':
        return (<RectangleIcon color={color} />);
      case 'solid':
        return (<LineIcon color={color} shape="solid" />);
      case 'dashed':
        return (<LineIcon color={color} shape="dashed" />);
      default:
        return (<SquareIcon color={color} />);
    }
  };

  const sectionItems = items.map((item) => (
    <LegendItem key={item.desc}>
      <LegendItemIcon>
        {getIcon(item.shape, item.color)}
      </LegendItemIcon>
      <LegendItemDescription>
        {item.desc}
      </LegendItemDescription>
    </LegendItem>

  ));

  return (
    <LegendSection>
      <LegendHeader>{title}</LegendHeader>
      {sectionItems}
    </LegendSection>
  );
};

const Legend = () => (
  <LegendContainer id="legend">
    {createLegend('Nodes', legendArrays.nodes)}
    {createLegend('Composites', legendArrays.composites)}
    {createLegend('Labels', legendArrays.labels)}
    {createLegend('Edges', legendArrays.edges)}
  </LegendContainer>
);

export default Legend;
