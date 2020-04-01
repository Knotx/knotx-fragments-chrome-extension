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

import React, { useEffect, useState, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronUp, faChevronDown } from '@fortawesome/free-solid-svg-icons';
import { constructFragmentsTimeline } from '../../helpers/nodes/nodesHelper';
import { drawTimeline } from '../../helpers/timeline/drawHelper';
import { GanntContainer, Timeline, TimelineBar } from './fragmentGannt.style';
import { setRenderedGraph } from '../../state/actions/pageData';


const FragmentGannt = ({ tabId }) => {
  const [timeline, setTimeline] = useState(null);
  const [expanded, setExpanded] = useState(true);
  const timelineContainer = useRef(null);
  const dispatch = useDispatch();
  const fragments = useSelector(({ pageData }) => pageData[tabId].fragments);
  const activeFragment = useSelector(({ pageData }) => pageData[tabId].renderedGraph);

  useEffect(() => {
    const timelineDeclaration = constructFragmentsTimeline(fragments);
    const newTimeline = drawTimeline(timelineContainer.current, timelineDeclaration);

    const onSelect = (properties) => {
      const selectedId = properties.items[properties.items.length - 1];

      if (selectedId) {
        dispatch(setRenderedGraph({
          id: tabId,
          renderedGraph: selectedId,
        }));
      }
    };

    newTimeline.on('select', onSelect);

    setTimeline(newTimeline);

    return () => {
      newTimeline.off('select', onSelect);
    };
  }, []);

  useEffect(() => {
    if (timeline) {
      timeline.setSelection([activeFragment], { focus: true });
    }
  }, [activeFragment]);

  return (
    <GanntContainer className="fragmentGanntContainer">
      <TimelineBar
        onClick={() => setExpanded(!expanded)}
      >
        <span>Fragments performance</span>
        {expanded
          ? (<FontAwesomeIcon icon={faChevronDown} />)
          : (<FontAwesomeIcon icon={faChevronUp} />) }
      </TimelineBar>
      <Timeline
        className="timeline"
        ref={timelineContainer}
        expanded={expanded}
      />
    </GanntContainer>
  );
};

FragmentGannt.propTypes = {
  tabId: PropTypes.number.isRequired,
};

export default FragmentGannt;
