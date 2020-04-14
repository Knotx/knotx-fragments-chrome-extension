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

import React from 'react';
import { storiesOf } from '@storybook/react';
import { withKnobs, object } from '@storybook/addon-knobs';
import NodePerformanceTimeline from './Timeline';
import { singleNodeWithTransition } from '../../../helpers/timeline/declerationHelper.mock';
import 'vis-timeline/dist/vis-timeline-graph2d.min.css';

storiesOf('Logic Components | MainPanel.Graph.NodePerformanceTimeline', module)
  .addDecorator(withKnobs)
  .add('NodePerformanceTimeline', () => (
    <NodePerformanceTimeline graphJson={object('graphJson', singleNodeWithTransition)} />
  ));
