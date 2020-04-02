# Knot.x Fragments Chrome Extension
Extends the Developer Tools, adding a sidebar that displays Fragments data associated with the 
selected DOM element.

// TODO why do we need this?

## How to start?
You can easily build the extension and select `dist` directory from Chrome extensions page. Follow 
the instructions below:

- Build the extension:
  - go to the project folder
  - run command: `yarn install`
  - run command: `yarn run dev`
- Load the extension from disk (more details [here](https://developer.chrome.com/extensions/getstarted) )
  - open the Chrome Extension Management page by navigating to `chrome://extensions`.
  - enable Developer Mode by clicking the toggle switch next to *Developer mode*.
  - click the *LOAD UNPACKED* button and select the `dist` directory.
- Run `samples`
  - go to the `samples` folder
  - run command: `npm install http-server -g`
  - run command: `npx http-server`
- See the extension in action
  - open the sample pate by navigating to [127.0.0.1:8080/payments.html](http://127.0.0.1:8080/payments.html)
  - activate the Chrome Dev Tools (`F12`)
  - select the Knot.x panel

## How does it work?

### Debug fragment data

Knot.x Fragments, when run in debug mode, injects information about fragments into the output.
This information can then be read, parsed and displayed by various tools. Knot.x Fragments Chrome Extension is the official tool for this purpose.

Of course fragments' outputs can have various formats. Currently, Knot.x supports injecting debug information into HTML only. 
Therefore, this tool only works for fragment-generated HTML pages. 
JSON support is planned for the near future. 

### HTML structure

When the HTML document is generated by the Fragments Engine in debug mode, special comments and tags are injected to indicate what data comes from which fragment.

For example, a page like this:

```html
<body>
  <header>
    Weather Service
  </header>
  
  <knotx:snippet data-knotx-task="weather-task">
    <span>
      {{fetch-weather-info._result.temperatue}} in {{fetch-weather-info._result.location}}
    </span>
  </knotx:snippet>
</body>
```

could result in:

```html
<body>
  <header>
    Weather Service
  </header>
  
  <!-- data-knotx-id="auto-generated-id" -->
  <script data-knotx-debug="log" data-knotx-id="auto-generated-id" type="application/json">{ debug-data-here }</script>

  <span>
    -2°C in Reykjavík
  </span>

  <!-- data-knotx-id="auto-generated-id" -->
</body>
```

Note that the browser displays the page as usual, the injected information does not affect the presentation.
There are two parts of the debug information:
- The data that was part of the Knot.x snippet is surrounded by special comments with auto-generated IDs. This is mainly used by the tool to provide highlighting functionality.
- The script tag with a JSON inside precedes the fragment content.  All important data is stored here. It mainly contains information about the processing of the fragment nodes: which nodes were triggered, what transition they activated, how much time they took etc.

### HTML parsing

The chrome extension uses 3 parsers to read the fragment data in HTML.

```
•
└── helpers
    ├── graph
    │   └── declarationHelper.js
    ├── timeline
    │   └── declarationHelper.js
    └── nodesHelper.js
```

#### Nodes parser

The `nodesHelper.js` lists all the fragments on the page.
It provides `parseFragments` method that takes an HTML element (the whole document, in practice) and returns a list of all fragments like this:

```json5
[
  {
    "debug": {}, // raw debug data from the fragment's script tag
    "nodes": [
      {
        "tag": "div",
        "selector": "css-selector-for-this-node-only"
      },
      // more nodes ...
    ]
  },
  // more fragments ...
]
```

It works by traversing all HTML nodes using [Node Iterator](https://developer.mozilla.org/en-US/docs/Web/API/NodeIterator) and finding pairs of Knot.x comments that mark the beginning and end of a fragment.
It then:
- finds all top-level nodes in between (comments' siblings),
- reads debug data from the first one (which is always a script tag with debug data),
- and transforms the data into the above form

#### Graph parser

The `graph/declarationHelper.js` parses a given fragment's debug JSON (from the fragment's script tag) into a form understandable by (Vis.js Network)[https://visjs.github.io/vis-network/docs/network/], a library for displaying graphs.
It provides `constructGraph` method that takes fragment's JSON as input and returns Vis.js-compatible datasets:

```json5
{
  "nodes": [
    {
      "id": "node-id",
      "label": "A node",
      "group": "success",
      "level": 0
    },
    // ...
  ],
  "edges": [
    {
      "from": "node-id",
      "to": "another-node-id",
      "label": "_success",
      "dashes": false,
      "font": {
        "color": "00CC00"
      },
      "color": "#000000"
    },
    // ...
  ]
}
```

It is then ready to be displayed in the form of a graph (specifically a tree unless there are composite nodes in the fragment).

Internally the parser consists of two phases:
- flattening - The fragment's graph is normally a tree (an undirected graph in which any two vertices are connected by exactly one path). However, composite nodes reference subtasks which are another tree each. This phase creates a new graph structure where all the nodes are part of this graph (there are no sub-graphs).
- datasets creation - In this phase, the flattened graph is traversed depth-first and the above datasets are constructed.

Flattening of the graph transforms a structure like this:

```json5
{
  "id": "composite-node",
  // ...
  "on": {
    "_success": {
      "id": "next-node"
      // ...
    }
  },
  "subtasks": [
    {
      "id": "subtask-1",
      // ...
    },
    {
      "id": "subtask-2",
      // ...
    }
  ]
}
```

Into a graph like this:

```json5
{
  "id": "composite-node_virtual",
  // ...
  "on": {
    "_subtask_0": {
      "id": "subtask-1",
      // ...
      "on": {
        "_subtask_end": {
          "id": "composite-node_virtual_end",
          // ...
          "on": {
            "_success": { // original transition
              "id": "next-node",
              // ...
            }
          }
        }
      }
    },
    "_subtask_1": {
      "id": "subtask-2",
      // ...
      "on": {
        "_subtask_end": "composite-node_virtual_end" // note this is only an ID (!)
      }
    }
  }
}
```

An important thing to note is that, while all subtasks end with a transition to the `composite-node_virtual_end` node, only one of them (the deepest) contains an actual object in the transition.
All other subtasks end with a transition into a string. It's termed `a reference` in the code and it's an ID of the actual node.
It is like that to avoid duplication. Without it, the dataset-creation algorithm would treat transisions to the same node as transitions to multiple unique nodes.
It'd result in parts of graph being copied multiple times, instead of multiple transitions transitioning to the same node.

#### Timeline parser

The `timeline/declarationHelper.js` parses a given fragment's debug JSON (from the fragment's script tag) into a form understandable by (Vis.js Timeline)[https://visjs.github.io/vis-timeline/docs/timeline/], a library for displaying Gantt charts.
It provides `constructTimeline` method that takes fragment's JSON as input and returns Vis.js datasets.

Output looks like this:

```json5
{
  "items": [ // not an actual array, a vis.DataSet object
    {
      "id": "a-node",
      "start": 100000, // timestamp
      "end": 20000, // timestamp
      "content": "", // items have no labels in the currect implementation
      "group": "A group"
    },
    // ...
  ],
  "groups": [ // not an actual array, a vis.DataSet object
    {
      "id": "A group",
      "order": 0,
      "content": "A group",
      "nestedGroups": ["another group id", "and another one"] // null in case of no subgroups (can't be an empty array because of how Vis.js displays it)
    },
    // ...
  ]
}
```

Parser consists of the following phases:
- constructing a unique-labeled graph - node labels are later used as group names/IDs so they have to be unique. In case of duplicated IDs they are numerated: `label`, `label (#2)`, `label (#3)`, etc
- filtering processed nodes - for this chart we're interested in the processed nodes only
- creating `itmes` and `groups` datasets

## Used technologies

### Extensions / Plugins

### CI

## Testing
Currently we test our app only through the unit tests. To testing we use two main technologies: Jest + Enzyme. 
All js files (components & helpers) have own test. We follow the convention to create test file next to js file.
 
 ```
•
├── exampleComponent.js
├── exampleComponent.spec.js
├── exampleHelper.js
└── exampleHelper.spec.js 
```

We use jest-coverage tool. After run tests in root direactory jest create build direactory. In this folder you can find an index.html with coverage raport. We try to stay on 80 - 100% coverage level.

## Implementation details

### Data flow
Extension get information about knot.x from html markup. Knot.x provide a tag with all necessery data. In next step our content script get this data and change structure to comfortable for us. Content script pass this data to background script whitch save them in redux.

```
KNOT.x -> HTML MARKUP -> CONTENT SCRIPT -> BACKGROUND SCRIPT -> REDUX -> COMPONENTS
                               ^
                               |
                         Parsing helper
```

### Components
The components structure look like this:

```
•
└── App:
    ├── SidePanel
    │   ├── FragmenList
    │   │   └── FragmentListItem
    │   │       └── NodeList
    │   └── FragmentGannt
    │
    └── MainPanel
        └── Graph
            ├──  Timeline
            ├──  Legend
            │    └── LegendSection 
            └──  NodeInfo
```

#### Graph

#### Timelines

### Data storage
All datas about fragments and pages are store in redux. We store separate data set and app state for all active pages to allow using few devtools console for few Knot.x pages. Every pageData-set has own ID (chrome tab id). The structure of redux looks like this: 

  
```
•
└── pageData:
    ├── 78: // tab id
    │   ├── fragments: [] // list of fragments
    │   ├── url: "https://example.com // page url
    │   ├── sidebarExpanded: true // side panel expanded switch
    │   └── renderedGraph: null // id of currently selected fragment
    └── 110: 
        └── ...
```

The pageData item is create on page load and destroy on page close. We create item for all active pages. If page doesn't use Knot.x , fragments propertie is empty.

## Contributors

### How to run?
1. go to the project folder
2. run command: `yarn install`
3. run command: `yarn run dev`

### How to test?
1. run command to fire all tests: `yarn run test`
2. run command to fire specific test: `yarn run test [path_to_test]`
