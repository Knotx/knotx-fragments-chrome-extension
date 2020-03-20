import React from 'react';
import { shallow } from 'enzyme';
import GraphComponent from './graph';
import {
  GraphContainer,
  GraphHeader,
  Graph,
} from './graph.style';


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
