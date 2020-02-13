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
import { useSelector } from 'react-redux';
import {
  FragmentListWrapper, SortingButton, SortingWrapper,
} from './fragmentList.style';
import FragmentListItem from './FragmentListItem/fragmentListItem';
import { ARROW_DOWN } from '../../helpers/constants';

export function mapDataToComponents({ fragments }) {
  return fragments.map(({ debug, nodes }) => {
    const { fragment } = debug;
    return (
      <FragmentListItem
        key={fragment.id}
        id={fragment.id}
        status={debug.status.toLowerCase()}
        type={fragment.type}
        nodes={nodes}
      />
    );
  });
}

export function sortFragmentsByStatus(fragments) {
  const sortOrder = ['success', 'other', 'missing', 'unprocessed', 'error'];
  const ordering = sortOrder.reduce((result, current, index) => (
    {
      ...result,
      [current]: index,
    }
  ), {});

  const sortedFragments = fragments.concat().sort((a, b) => (
    ordering[a.props.status] - ordering[b.props.status] || a.props.status.localeCompare(b.props.status)
  ));
  return sortedFragments;
}

const FragmentList = () => {
  const data = useSelector(({ pageData }) => pageData);
  const parsedData = mapDataToComponents(data);
  const [fragments, setFragments] = useState(parsedData);

  const typeSortComparator = (
    { props: { type: typeA } },
    { props: { type: typeB } },
  ) => typeA.localeCompare(typeB);

  const idSortComparator = (
    { props: { id: idA } },
    { props: { id: idB } },
  ) => idA.localeCompare(idB);

  return (
    <FragmentListWrapper>
      <SortingWrapper>
        <SortingButton
          status
          onClick={() => setFragments(sortFragmentsByStatus(fragments))}
        >
          {ARROW_DOWN}
        </SortingButton>

        <SortingButton
          onClick={() => setFragments(fragments.concat().sort(idSortComparator))}
        >
          ID
          {ARROW_DOWN}
        </SortingButton>

        <SortingButton
          onClick={() => setFragments(fragments.concat().sort(typeSortComparator))}
        >
          TYPE
          {ARROW_DOWN}
        </SortingButton>

      </SortingWrapper>
      {fragments}
    </FragmentListWrapper>
  );
};

export default FragmentList;
