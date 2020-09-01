
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

import {
  COLOR_SUCCESS, COLOR_ERROR, COLOR_OTHER, COLOR_UNPROCESSED, COLOR_MISSING,
} from '../../../helpers/graph/drawingHelper';

export const legendArrays = {
  nodes: [
    {
      desc: 'missing',
      color: COLOR_MISSING,
      shape: 'square',
      docs: 'README.md',
    },
    {
      desc: 'unprocessed',
      color: COLOR_UNPROCESSED,
      shape: 'square',
      docs: '',
    },
    {
      desc: 'success',
      color: COLOR_SUCCESS,
      shape: 'square',
      docs: '',
    },
    {
      desc: 'error',
      color: COLOR_ERROR,
      shape: 'square',
      docs: '',
    },
    {
      desc: 'other',
      color: COLOR_OTHER,
      shape: 'square',
      docs: '',
    },
  ],
  composites: [
    {
      desc: 'startNode',
      color: 'white',
      shape: 'circle',
      docs: '',
    },
    {
      desc: 'endNode',
      color: 'multi',
      shape: 'circle',
      docs: '',
    },
  ],
  labels: [
    {
      desc: '_success',
      color: COLOR_SUCCESS,
      shape: 'rectangle',
      docs: '',
    },
    {
      desc: '_error',
      color: COLOR_ERROR,
      shape: 'rectangle',
      docs: '',
    },
    {
      desc: '_[custom]',
      color: COLOR_OTHER,
      shape: 'rectangle',
      docs: '',
    },
  ],
  edges: [
    {
      desc: 'processed',
      color: 'black',
      shape: 'solid',
      docs: '',
    },
    {
      desc: 'unprocessed',
      color: 'grey',
      shape: 'dashed',
      docs: '',
    },
  ],
};
