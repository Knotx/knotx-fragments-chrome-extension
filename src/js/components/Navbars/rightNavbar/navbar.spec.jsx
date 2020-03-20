import React from 'react';
import { mount } from 'enzyme';
import { toBeVisible } from '@testing-library/jest-dom/matchers';
import RightNavBar from './navbar';
import {
  NavBarItem,
  RightPanel,
  NodeInfoWrapper,
  LegendWrapper,
  HideRightPanel,
} from './navbar.style';

expect.extend({ toBeVisible });

describe('A suite', () => {
  const getWrapper = () => mount(
    <RightNavBar />,
  );

  it('Should display node info container in right panel.', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(RightPanel).prop('showPanel')).toBe(false);
    expect(wrapper.find(RightPanel).getDOMNode()).not.toBeVisible();

    const navbarItems = wrapper.find(NavBarItem);
    navbarItems.at(0).simulate('click');

    expect(wrapper.find(RightPanel).prop('showPanel')).toBe(true);
    expect(wrapper.find(RightPanel).getDOMNode()).toBeVisible();

    expect(wrapper.find(NodeInfoWrapper).prop('showNodeInfo')).toBe(true);
    expect(wrapper.find(NodeInfoWrapper).getDOMNode()).toBeVisible();
  });

  it('Should display legend container in right panel.', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(RightPanel).prop('showPanel')).toBe(false);
    expect(wrapper.find(RightPanel).getDOMNode()).not.toBeVisible();

    const navbarItems = wrapper.find(NavBarItem);
    navbarItems.at(1).simulate('click');

    expect(wrapper.find(RightPanel).prop('showPanel')).toBe(true);
    expect(wrapper.find(RightPanel).getDOMNode()).toBeVisible();

    expect(wrapper.find(LegendWrapper).prop('showLegend')).toBe(true);
    expect(wrapper.find(LegendWrapper).getDOMNode()).toBeVisible();
  });

  it('Should hide right panel after click on "-" button.', () => {
    const wrapper = getWrapper();
    expect(wrapper.find(RightPanel).prop('showPanel')).toBe(false);
    expect(wrapper.find(RightPanel).getDOMNode()).not.toBeVisible();

    wrapper.find(NavBarItem).first().simulate('click');

    wrapper.find(HideRightPanel).simulate('click');

    expect(wrapper.find(RightPanel).getDOMNode()).not.toBeVisible();
  });
});
