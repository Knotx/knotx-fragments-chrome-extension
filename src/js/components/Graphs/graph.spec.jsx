import React from 'react';
import EnzymeAdapter from 'enzyme-adapter-react-16';
import Enzyme, { shallow, mount } from 'enzyme';
import { act } from 'react-dom/test-utils';
import {
  toBeInTheDocument,
} from '@testing-library/jest-dom/matchers';
import GraphComponent from './graph';
import RightNavBar from '../Navbars/rightNavbar/navbar';
import {
  GraphContainer,
  GraphHeader,
  Graph,
} from './graph.style';
import {
  NodeInfoWrapper,
} from '../Navbars/rightNavbar/navbar.style';

import { singleNode } from '../../helpers/graph/declarationHelper.mock';


Enzyme.configure({ adapter: new EnzymeAdapter() });
expect.extend({ toBeInTheDocument });

describe('A suite', () => {
  it('should render without throwing an error', () => {
    expect(shallow(<GraphComponent fragmentId="1" />).contains(
      <GraphContainer className="graphContainer">
        <GraphHeader>
          <h2>ID: 1</h2>
        </GraphHeader>
        <Graph className="graph" />
      </GraphContainer>,
    )).toBe(true);
  });


  // TODO: Provide test for rendering graph. Currently jest return an error, becouse cannot render a canva.
  // it('should render  throwing an error', () => {
  //   let component;
  //   act(() => {
  //     component = mount(
  //       <>
  //         <GraphComponent graphJson={singleNode} fragmentId="1" />
  //         <RightNavBar />
  //       </>,
  //     );
  //   });
  //   expect(component.find(NodeInfoWrapper).text()).toEqual('');
  // });
});
