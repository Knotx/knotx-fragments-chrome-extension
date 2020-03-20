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
        return (<SquareIcon color="transparent" />);
    }
  };

  const sectionItems = items.map(({ desc, shape, color }) => (
    <LegendItem key={desc}>
      <LegendItemIcon>
        {getIcon(shape, color)}
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
