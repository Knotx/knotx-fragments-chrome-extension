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

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  chromeConnections,
  chromeActions,
} from '../../helpers/constants';
import { DumpBtn, Spinner } from './dumpButton.styled';


const DumpButton = ({ tabId }) => {
  const [inProgressStatus, setInProgressStatus] = useState(false);

  const dumpPage = () => {
    const portConnection = chrome.runtime.connect({ name: chromeConnections.KNOTX_DEVTOOL_CONNECTION });
    portConnection.postMessage({ type: chromeActions.DUMP_PAGE, data: { tabId } });
    setInProgressStatus(true);
    chrome.runtime.onConnect.addListener((port) => {
      port.onMessage.addListener((request) => {
        if (request.status === 'dump_complete') {
          setInProgressStatus(false);
        }
      });
    });
  };

  return (
    <DumpBtn
      type="button"
      onClick={() => dumpPage()}
    >
      DUMP PAGE
      { inProgressStatus
        ? (<Spinner />)
        : '' }
    </DumpBtn>
  );
};

DumpButton.propTypes = {
  tabId: PropTypes.number.isRequired,
};

export default DumpButton;
