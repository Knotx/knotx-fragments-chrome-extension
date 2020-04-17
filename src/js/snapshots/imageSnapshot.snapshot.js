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

/* eslint-disable no-undef */

// page object is from jest-puppeteer API

const config = {
  failureThreshold: 0.01,
  failureThresholdType: 'percent',
};


describe('SidePanel', () => {
  it('visually looks correct', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=logic-components-sidepanel--sidepanel');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(config);
  });
});

describe('FragmentGantt', () => {
  it('FragmentGantt visually looks correct', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=logic-components-sidepanel-fragmentgantt--fragmentgantt');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(config);
  });
});

describe('FragmentList', () => {
  it('FragmentList visually looks correct', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=logic-components-sidepanel-fragmentlist--fragmentlist');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(config);
  });

  it('FragmentListItem visually looks correct', async () => {
    // eslint-disable-next-line max-len
    await page.goto('http://localhost:6006/iframe.html?id=logic-components-sidepanel-fragmentlist-fragmentlistitem--fragmentlistitem');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(config);
  });
});


describe('Legend', () => {
  it('Legend visually looks correct', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=logic-components-mainpanel-graph-legend--legend');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(config);
  });
});

describe('NodeInfo', () => {
  it('NodeInfo visually looks correct', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=logic-components-mainpanel-graph-nodeinfo--nodeinfo');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(config);
  });
});

describe('NodePerformanceTimeline', () => {
  it('NodePerformanceTimeline visually looks correct', async () => {
    // eslint-disable-next-line max-len
    await page.goto('http://localhost:6006/iframe.html?id=logic-components-mainpanel-graph-nodeperformancetimeline--nodeperformancetimeline');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(config);
  });
});

describe('Graph', () => {
  it('Graph visually looks correct', async () => {
    await page.goto('http://localhost:6006/iframe.html?id=logic-components-mainpanel-graph--graph');
    const image = await page.screenshot();

    expect(image).toMatchImageSnapshot(config);
  });
});
