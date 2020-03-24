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
import * as helper from './nodesHelper';

const constructMarkupWithFragment = (id, debugData = '{}', nodes = '') => `
        <span>Not in fragment</span> 
        <!-- data-knotx-id="${id}" -->
        <script data-knotx-id="${id}" type="application/json">
        ${typeof debugData === 'string' ? debugData : JSON.stringify(debugData)}
        </script>
        ${Array.isArray(nodes) ? nodes.join('') : nodes}
        <!-- data-knotx-id="${id}" -->
        <span>Also not in fragment</span>
    `;

function constructMarkupWithFragments(...fragmentsData) {
  return fragmentsData
    .map((data) => constructMarkupWithFragment(data.id, data.debugData, data.nodes))
    .join();
}

beforeEach(() => {
  document.body.innerHTML = '';
});

test('Only comment nodes with KnotX id are recognized as fragment boundaries', () => {
  const comment = document.createComment('data-knotx-id');
  const commentWithId = document.createComment('data-knotx-id="test"');
  const spanWithId = document.createElement('span');

  spanWithId.appendChild(document.createTextNode('data-knotx-id="test"'));

  expect(helper.isFragmentBoundary(comment)).toBe(false);
  expect(helper.isFragmentBoundary(commentWithId)).toBe(true);
  expect(helper.isFragmentBoundary(spanWithId)).toBe(false);
});

test('Only elements and non-empty text nodes are considered correct nodes', () => {
  const emptyElement = document.createElement('div');
  const text = document.createTextNode('Some text');
  const emptyText = document.createTextNode('\n\t ');
  const comment = document.createComment('Some comment');

  expect(helper.isFragmentNode(emptyElement)).toBe(true);
  expect(helper.isFragmentNode(text)).toBe(true);
  expect(helper.isFragmentNode(emptyText)).toBe(false);
  expect(helper.isFragmentNode(comment)).toBe(false);
});

test('KnotX id can be extracted from comments', () => {
  const commentWithId = document.createComment('data-knotx-id="ID"');
  const commentWithoutId = document.createComment('Some comment');

  expect(helper.getFragmentId(commentWithId)).toBe('ID');
  expect(helper.getFragmentId(commentWithoutId)).toBeUndefined();
});

test('Only script elements with KnotX id are considered data nodes', () => {
  const div = document.createElement('div');
  const script = document.createElement('script');
  const scriptWithId = document.createElement('script');

  scriptWithId.setAttribute('data-knotx-id', 'ID');

  expect(helper.isFragmentDataNode(div, 'ID')).toBe(false);
  expect(helper.isFragmentDataNode(script, 'ID')).toBe(false);
  expect(helper.isFragmentDataNode(scriptWithId, 'ID')).toBe(true);
  expect(helper.isFragmentDataNode(scriptWithId, 'different id')).toBe(false);
});

test('Empty DOM results in empty fragment array', () => {
  document.body.innerHTML = '';

  expect(helper.findFragmentsInContent()).toStrictEqual([]);
});

test('DOM without fragments results in empty array', () => {
  document.body.innerHTML = '<div><span>Test</span></div>';

  expect(helper.findFragmentsInContent()).toStrictEqual([]);
});

test('Fragment without data script tag is parsed', () => {
  document.body.innerHTML = `<span>Test</span>
        <!-- data-knotx-id="test" -->
        <div>Test fragment</div>
        <!-- data-knotx-id="test" -->`;

  expect(helper.findFragmentsInContent()).toHaveLength(1);
});

test('Fragment with empty data is parsed', () => {
  document.body.innerHTML = constructMarkupWithFragment('test', '{}', '<div>Test fragment</div>');

  expect(helper.findFragmentsInContent()).toHaveLength(1);
});

test('Empty fragment is parsed', () => {
  document.body.innerHTML = constructMarkupWithFragment('test');

  expect(helper.findFragmentsInContent()).toHaveLength(1);
});

test('Fragment without json have empty object as debug property', () => {
  document.body.innerHTML = constructMarkupWithFragment('test', '', '<div>Test fragment</div>');

  const fragments = helper.findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments[0]).toHaveProperty('debug', {});
});

test('Fragment with incorrect json throws syntax error', () => {
  document.body.innerHTML = constructMarkupWithFragment('test', '{"test": "test"]', '<div>Test fragment</div>');

  const execution = () => helper.findFragmentsInContent();
  expect(execution).toThrow(SyntaxError);
});

test('Multiple fragments can be parsed', () => {
  document.body.innerHTML = constructMarkupWithFragments(
    { id: 'frag1', debugData: '{}', nodes: '<div>Fragment 1</div>' },
    { id: 'frag2', debugData: '{}', nodes: '<div>Fragment 2</div>' },
    { id: 'frag3', debugData: '{}', nodes: '<div>Fragment 3</div>' },
  );

  const fragments = helper.findFragmentsInContent();
  expect(fragments).toHaveLength(3);
});

test('Fragments\' nodes contain a tag name and selector', () => {
  document.body.innerHTML = constructMarkupWithFragments(
    { id: 'test', debugData: '{}', nodes: '<div>Another fragment</div>' },
    {
      id: 'test2',
      debugData: '{}',
      nodes: [
        '<div>Test fragment</div>',
        '<div><span>Lorem ipsum</span></div>',
      ],
    },
  );

  const fragments = helper.findFragmentsInContent();
  expect(fragments).toHaveLength(2);

  expect(fragments[0].nodes).toHaveLength(1);
  expect(fragments[0].nodes[0].tag).toEqual('DIV');

  const { nodes } = fragments[1];
  expect(nodes).toHaveLength(2);
  nodes.forEach((element) => {
    expect(element.tag).toEqual('DIV');
    expect(typeof element.selector).toEqual('string');
  });
});

test('Empty fragment has empty nodes array', () => {
  document.body.innerHTML = constructMarkupWithFragment('test');

  const fragments = helper.findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments[0].nodes).toHaveLength(0);
});

test('Fragment includes text nodes', () => {
  document.body.innerHTML = constructMarkupWithFragment('test', '{}', [
    'A text node',
    '<div>Test fragment</div>',
    '<div><span>Lorem ipsum</span></div>',
    'Another text node',
  ]);

  const fragments = helper.findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments[0].nodes).toHaveLength(4);
});

test('Fragments can exist on different levels of nesting', () => {
  document.body.innerHTML = `
        ${constructMarkupWithFragment('nest0', '{}', '')}
        <div>
            ${constructMarkupWithFragment('nest1', '{}', '')}
            <div>${constructMarkupWithFragment('nest2', '{}', '')}</div>
        <div>
    `;

  const fragments = helper.findFragmentsInContent();
  expect(fragments).toHaveLength(3);
});

test('Nodes debug data is parsed as is', () => {
  const debugData = {
    testProps: 12,
    nested: {
      name: 'lorem ipsum',
      nested2: {
        prop: 42,
        emptyObject: {},
        emptyArray: [],
      },
      array: [
        11,
        { property: 'property' },
        [],
        null,
      ],
    },
  };

  document.body.innerHTML = constructMarkupWithFragment('test', JSON.stringify(debugData));

  const fragments = helper.findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments).toHaveLength(1);
  expect(fragments[0].debug).toStrictEqual(debugData);
});

test('Allow top level arrays as debug data', () => {
  const debugData = [12, { prop: 'prop' }, null];

  document.body.innerHTML = constructMarkupWithFragment('test', JSON.stringify(debugData));

  const fragments = helper.findFragmentsInContent();
  expect(fragments).toHaveLength(1);
  expect(fragments[0].debug).toStrictEqual(debugData);
});

test('Fragments need to be closed', () => {
  document.body.innerHTML = `
        <span>Not in fragment</span> 
        <!-- data-knotx-id="test" -->
        <script data-knotx-id="test" type="application/json">
        {}
        </script>
        <div>This is not in a correct fragment</div>
        <div></div>
        <!-- data-knotx-id="diff-id" -->
        <span>This is also not in a correct fragment</span>
    `;

  const fragments = helper.findFragmentsInContent();
  expect(fragments).toHaveLength(0);
});

test('VisTimeline items are constructed correctly', () => {
  const fragments = [
    { id: 'f1', debugData: { fragment: { id: 'f1' }, startTime: 1000, finishTime: 2000 }, nodes: '<div>F1</div>' },
    { id: 'f1', debugData: { fragment: { id: 'f2' }, startTime: 2000, finishTime: 3000 }, nodes: '<div>F2</div>' },
    { id: 'f1', debugData: { fragment: { id: 'f3' }, startTime: 3000, finishTime: 4000 }, nodes: '<div>F3</div>' },
  ];

  document.body.innerHTML = constructMarkupWithFragments(fragments[0], fragments[1], fragments[2]);

  const { items, groups } = helper.constructFragmentsTimeline(helper.findFragmentsInContent());

  items.get().forEach((item, i) => {
    expect(item).toHaveProperty('id', fragments[i].debugData.fragment.id);
    expect(item).toHaveProperty('content', fragments[i].debugData.fragment.id);
    expect(item).toHaveProperty('start', fragments[i].debugData.startTime);
    expect(item).toHaveProperty('end', fragments[i].debugData.finishTime);
    expect(item).toHaveProperty('group', 1);
  });

  // a dummy group has to exist for items to be able to display
  expect(groups.get()).toStrictEqual([{ id: 1, content: '' }]);
});
