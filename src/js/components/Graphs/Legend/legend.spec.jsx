import React from 'react';
import { mount } from 'enzyme';
import { createLegend } from './legendHelper';
import { legendArraysMock } from './legend.mock';
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

describe('Correctly render legend component', () => {
  const getWrapper = (title, itemsProps) => mount(
    <div className="legendSection">
      <LegendHeader>{title}</LegendHeader>
      {itemsProps.map(({ icon, desc }) => (
        <LegendItem key={desc}>
          <LegendItemIcon>
            {icon}
          </LegendItemIcon>
          <LegendItemDescription>
            {desc}
          </LegendItemDescription>
        </LegendItem>
      ))}
    </div>,
  );

  it('Should render legend section and set correctly icon shape and color for nodes', () => {
    const wrapper = getWrapper('Nodes', [{ icon: <SquareIcon color="yellow" />, desc: 'missing' }]);
    expect(wrapper.matchesElement(createLegend('Nodes', legendArraysMock.nodes))).toBe(true);
  });

  it('Should render legend section and set correctly icon shape and color for composite nodes', () => {
    const wrapper = getWrapper('Composites', [{ icon: <CircleIcon color="white" />, desc: 'startNode' }]);
    expect(wrapper.matchesElement(createLegend('Composites', legendArraysMock.composites))).toBe(true);
  });

  it('Should render legend section and set correctly icon shape and color for labels', () => {
    const wrapper = getWrapper('Labels', [{ icon: <RectangleIcon color="green" />, desc: '_success' }]);
    expect(wrapper.matchesElement(createLegend('Labels', legendArraysMock.labels))).toBe(true);
  });

  it('Should render legend section and set correctly icon shape and color for edges', () => {
    const wrapper = getWrapper('Edges', [
      { icon: <LineIcon color="black" shape="solid" />, desc: 'processed' },
      { icon: <LineIcon color="grey" shape="dashed" />, desc: 'unprocessed' },
    ]);
    expect(wrapper.matchesElement(createLegend('Edges', legendArraysMock.edges))).toBe(true);
  });

  it('Should render legend section and set correctly icon shape and color for undefined elements', () => {
    const wrapper = getWrapper('Undefined', [{ icon: '', desc: 'undefined' }]);
    expect(wrapper.matchesElement(createLegend('Undefined', legendArraysMock.undefined))).toBe(true);
  });
});
