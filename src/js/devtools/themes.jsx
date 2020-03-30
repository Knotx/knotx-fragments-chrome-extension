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

import { COLORS } from '../helpers/constants';

export const defaultTheme = {
  WHITE_BLACK: '#FFF', // White on light theme | Black on dark theme
  BLACK_WHITE: '#FFF', // Black on light theme | White on dark theme

  TEXT: '#707070',
  MENU_TOGGLE_BUTTON: '#707070',
  BORDER: '#707070',
  BACKGROUND: '#F5F5F5',
  TABLE_HEADER_BG: '#707070',
  TABLE_CELL_BG: '#FFF',
  TABLE_CELL_HOVER_BG: '#D0ECFF',
  TABLE_CELL_ACTIVE_BG: '#BFD6E5',
  NODE_LIST_ITEM_BG: '#E8E8E8',

  textColor: COLORS.TEXT_COLOR,
  buttonBgColor: COLORS.BUTTON_BG_COLOR,
  fragmentHighlight: COLORS.FRAGMENT_HIGHLIGHT,
  fragmentActive: COLORS.FRAGMENT_ACTIVE,
  borderColor: COLORS.BORDER_COLOR,
  oddFragmentBgColor: COLORS.ODD_FRAGMENT_BG_COLOR,
  nodeHighlight: COLORS.NODE_HIGHLIGHT,
  oddNodeBgColor: COLORS.ODD_NODE_BG_COLOR,
  sidePanelBgColor: COLORS.SIDE_PANEL_BG_COLOR,
  buttonHover: COLORS.BUTTON_HOVER,
  success: COLORS.SUCCESS,
  error: COLORS.ERROR,
  unprocessed: COLORS.UNPROCESSED,
  warning: COLORS.WARNING,
  expandNodeListBgHover: COLORS.EXPAND_NODE_LIST_BG_HOVER,
  expandNodeListBg: COLORS.EXPAND_NODE_LIST_BG,

};

export const darkTheme = {
  TEXT: '#FFFFFF',
  MENU_TOGGLE_BUTTON: '#FFFFFF',
  BACKGROUND: '#3A3A3A',
  TABLE_HEADER_BG: '#707070',
  TABLE_CELL_BG: '#505050',
  TABLE_CELL_HOVER_BG: '#617888',
  TABLE_CELL_ACTIVE_BG: '#50626F',
  NODE_LIST_ITEM_BG: '#9A9A9A',

  textColor: COLORS.DARK.TEXT_COLOR,
  buttonBgColor: COLORS.DARK.BUTTON_BG_COLOR,
  fragmentHighlight: COLORS.DARK.FRAGMENT_HIGHLIGHT,
  fragmentActive: COLORS.DARK.FRAGMENT_ACTIVE,
  borderColor: COLORS.DARK.BORDER_COLOR,
  oddFragmentBgColor: COLORS.DARK.ODD_FRAGMENT_BG_COLOR,
  nodeHighlight: COLORS.DARK.NODE_HIGHLIGHT,
  oddNodeBgColor: COLORS.DARK.ODD_NODE_BG_COLOR,
  sidePanelBgColor: COLORS.DARK.SIDE_PANEL_BG_COLOR,
  buttonHover: COLORS.DARK.BUTTON_HOVER,
  success: COLORS.SUCCESS,
  error: COLORS.ERROR,
  unprocessed: COLORS.UNPROCESSED,
  warning: COLORS.WARNING,
  expandNodeListBgHover: COLORS.EXPAND_NODE_LIST_BG_HOVER,
  expandNodeListBg: COLORS.EXPAND_NODE_LIST_BG,
  menuToggleButton: COLORS.DARK.MENU_TOGGLE_BUTTON,
};
