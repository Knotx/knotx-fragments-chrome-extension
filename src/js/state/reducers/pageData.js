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
  SET_PAGE_DATA,
  REMOVE_PAGE_DATA,
  SET_RENDERED_GRAPH,
  SET_SIDEPANEL_EXPANDED,
} from '../actionTypes/pageData';

export const initState = {};

export default (state = initState, { type, pageData }) => {
  switch (type) {
    case SET_PAGE_DATA:
      return {
        ...state,
        [pageData.id]: {
          fragments: pageData.fragments,
          url: pageData.url,
          sidebarExpanded: true,
          renderedGraph: null,
        },
      };

    case REMOVE_PAGE_DATA: {
      const newState = state;
      if (newState[pageData.id]) delete newState[pageData.id];
      return newState;
    }

    case SET_RENDERED_GRAPH:
      return {
        ...state,
        [pageData.id]: {
          ...state[pageData.id],
          renderedGraph: pageData.renderedGraph,
        },
      };

    case SET_SIDEPANEL_EXPANDED:
      return {
        ...state,
        [pageData.id]: {
          ...state[pageData.id],
          sidebarExpanded: pageData.sidebarExpanded,
        },
      };
    default:
      return state;
  }
};
