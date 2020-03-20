
import React from 'react';

import {
  LegendHeader,
  LegendItemIcon,
  SquareIcon,
  CircleIcon,
  RectangleIcon,
  LineIcon,
  LegendItemDescription,
  LegendItem,
} from './legend.style';

export const legendArrays = {
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

export const createLegend = (title, items) => {
  /* eslint-disable react/display-name */
  const getIcon = {
    square: (color) => (<SquareIcon color={color} />),
    circle: (color) => (<CircleIcon color={color} />),
    rectangle: (color) => (<RectangleIcon color={color} />),
    solid: (color) => (<LineIcon color={color} shape="solid" />),
    dashed: (color) => (<LineIcon color={color} shape="dashed" />),
  };
  /* eslint-enable react/display-name */

  const sectionItems = items.map(({ desc, shape, color }) => (
    <LegendItem key={desc}>
      <LegendItemIcon>
        {getIcon[shape] ? getIcon[shape](color) : ''}
      </LegendItemIcon>
      <LegendItemDescription>
        {desc}
      </LegendItemDescription>
    </LegendItem>
  ));

  return (
    <div className="legendSection">
      <LegendHeader>{title}</LegendHeader>
      {sectionItems}
    </div>
  );
};
