import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import { createLegend } from './legendHelper';
import { legendArraysMock } from './legend.mock';
import {
  LegendHeader,
  LegendSection,
  LegendItemIcon,
  SquareIcon,
  CircleIcon,
  RectangleIcon,
  LineIcon,
  LegendItemDescription,
  LegendItem,
} from './legend.style';

Enzyme.configure({ adapter: new EnzymeAdapter() });

describe('A suite', () => {
  const getWrapper = (title, itemsProps) => mount(
    <LegendSection>
      <LegendHeader>{title}</LegendHeader>
      {itemsProps.map((item) => (
        <LegendItem key={item.desc}>
          <LegendItemIcon>
            {item.icon}
          </LegendItemIcon>
          <LegendItemDescription>
            {item.desc}
          </LegendItemDescription>
        </LegendItem>
      ))}
    </LegendSection>,
  );

  it('should render message if fragment is not selected', () => {
    let wrapper = getWrapper('Nodes', [{ icon: <SquareIcon color="yellow" />, desc: 'missing' }]);
    expect(wrapper.matchesElement(createLegend('Nodes', legendArraysMock.nodes))).toBe(true);

    wrapper = getWrapper('Composites', [{ icon: <CircleIcon color="white" />, desc: 'startNode' }]);
    expect(wrapper.matchesElement(createLegend('Composites', legendArraysMock.composites))).toBe(true);

    wrapper = getWrapper('Labels', [{ icon: <RectangleIcon color="green" />, desc: '_success' }]);
    expect(wrapper.matchesElement(createLegend('Labels', legendArraysMock.labels))).toBe(true);

    wrapper = getWrapper('Edges', [
      { icon: <LineIcon color="black" shape="solid" />, desc: 'processed' },
      { icon: <LineIcon color="grey" shape="dashed" />, desc: 'unprocessed' },
    ]);
    expect(wrapper.matchesElement(createLegend('Edges', legendArraysMock.edges))).toBe(true);

    wrapper = getWrapper('Undefined', [{ icon: <SquareIcon color="transparent" />, desc: 'undefined' }]);
    expect(wrapper.matchesElement(createLegend('Undefined', legendArraysMock.undefined))).toBe(true);
  });
});
