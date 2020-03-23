import React from 'react';
import { mount } from 'enzyme';
import LegendSection from './legendSection';
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

describe('Legend section component', () => {
  const getExpectedValue = (title, itemsProps) => (
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
    </div>
  );

  const getWrapper = (title, items) => mount(<LegendSection title={title} items={items} />);

  it('Should render legend section and set correctly icon shape and color for nodes', () => {
    const expectedValue = getExpectedValue('Nodes', [{ icon: <SquareIcon color="yellow" />, desc: 'missing' }]);
    const wrapper = getWrapper('Nodes', legendArraysMock.nodes);

    expect(wrapper.contains(expectedValue)).toBe(true);
  });

  it('Should render legend section and set correctly icon shape and color for composite nodes', () => {
    const expectedValue = getExpectedValue('Composites', [{ icon: <CircleIcon color="white" />, desc: 'startNode' }]);
    const wrapper = getWrapper('Composites', legendArraysMock.composites);

    expect(wrapper.contains(expectedValue)).toBe(true);
  });

  it('Should render legend section and set correctly icon shape and color for labels', () => {
    const expectedValue = getExpectedValue('Labels', [{ icon: <RectangleIcon color="green" />, desc: '_success' }]);
    const wrapper = getWrapper('Labels', legendArraysMock.labels);

    expect(wrapper.contains(expectedValue)).toBe(true);
  });

  it('Should render legend section and set correctly icon shape and color for edges', () => {
    const expectedValue = getExpectedValue('Edges', [
      { icon: <LineIcon color="black" shape="solid" />, desc: 'processed' },
      { icon: <LineIcon color="grey" shape="dashed" />, desc: 'unprocessed' },
    ]);
    const wrapper = getWrapper('Edges', legendArraysMock.edges);

    expect(wrapper.contains(expectedValue)).toBe(true);
  });

  it('Should render legend section and set correctly icon shape and color for undefined elements', () => {
    const expectedValue = getExpectedValue('Undefined', [{ icon: '', desc: 'undefined' }]);
    const wrapper = getWrapper('Undefined', legendArraysMock.undefined);

    expect(wrapper.contains(expectedValue)).toBe(true);
  });
});
