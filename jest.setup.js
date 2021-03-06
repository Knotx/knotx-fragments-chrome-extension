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

import Adapter from 'enzyme-adapter-react-16';
import { toBeVisible } from '@testing-library/jest-dom/matchers';
import { configure } from 'enzyme';
import { configureToMatchImageSnapshot } from 'jest-image-snapshot';
import crypto from 'crypto';

configure({ adapter: new Adapter() });

const toMatchImageSnapshot = configureToMatchImageSnapshot({
  failureThreshold: 0.03,
  failureThresholdType: 'percent',
});

expect.extend({ toBeVisible, toMatchImageSnapshot });

const cryptoPolyfill = {
  ...crypto,
  getRandomValues: function (buffer) {
    return crypto.randomFillSync(buffer);
  }
};

global.crypto = cryptoPolyfill;
