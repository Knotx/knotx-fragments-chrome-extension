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

import { findFragmentsInContent } from '../helpers/nodes/nodesHelper';
import { status } from '../helpers/constants';
import { dump } from './dump';

window.onload = () => {
  chrome.runtime.sendMessage({ fragmentsData: findFragmentsInContent(), type: 'INIT_STORE' }, (response) => {
    if (response.status === status.succes) {
      // eslint-disable-next-line no-console
      console.log(response.msg);
    }
  });
};

window.dump = dump;
