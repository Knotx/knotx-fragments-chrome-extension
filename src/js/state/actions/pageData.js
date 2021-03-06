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

export const setPageData = (pageData) => ({
  type: SET_PAGE_DATA,
  pageData,
});

export const removePageData = (pageData) => ({
  type: REMOVE_PAGE_DATA,
  pageData,
});

export const setRenderedGraph = (pageData) => ({
  type: SET_RENDERED_GRAPH,
  pageData,
});

export const setSidePanelExpanded = (pageData) => ({
  type: SET_SIDEPANEL_EXPANDED,
  pageData,
});
