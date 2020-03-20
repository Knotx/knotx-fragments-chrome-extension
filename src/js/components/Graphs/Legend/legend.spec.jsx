import React from 'react';
import Enzyme, { mount } from 'enzyme';
import EnzymeAdapter from 'enzyme-adapter-react-16';
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

Enzyme.configure({ adapter: new EnzymeAdapter() });

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

  it('Should render legend section and set correctly icon shape and color', () => {
    const NodesSectionWrapper = getWrapper('Nodes', [{ icon: <SquareIcon color="yellow" />, desc: 'missing' }]);
    expect(NodesSectionWrapper.matchesElement(createLegend('Nodes', legendArraysMock.nodes))).toBe(true);

    const compositesSectionWrapper = getWrapper(
      'Composites',
      [{ icon: <CircleIcon color="white" />, desc: 'startNode' }],
    );
    expect(compositesSectionWrapper.matchesElement(createLegend('Composites', legendArraysMock.composites))).toBe(true);

    const labelsSectionWrapper = getWrapper('Labels', [{ icon: <RectangleIcon color="green" />, desc: '_success' }]);
    expect(labelsSectionWrapper.matchesElement(createLegend('Labels', legendArraysMock.labels))).toBe(true);

    const edgesSectionWrapper = getWrapper('Edges', [
      { icon: <LineIcon color="black" shape="solid" />, desc: 'processed' },
      { icon: <LineIcon color="grey" shape="dashed" />, desc: 'unprocessed' },
    ]);
    expect(edgesSectionWrapper.matchesElement(createLegend('Edges', legendArraysMock.edges))).toBe(true);

    const undefinedSEctionWrapper = getWrapper(
      'Undefined',
      [{ icon: <SquareIcon color="transparent" />, desc: 'undefined' }],
    );
    expect(undefinedSEctionWrapper.matchesElement(createLegend('Undefined', legendArraysMock.undefined))).toBe(true);
  });
});
