import styled from 'styled-components';
import { PAGE_BREAK } from '../../helpers/constants';

export const GraphContainer = styled.div`
    display: flex;
    height: 80vh;

    @media (max-width: ${PAGE_BREAK}px) {
      flex-direction: column;
    }
`;

export const Graph = styled.div`
    height: 100%;
    width: 50%;
    border-right: 1px solid white;

    @media (max-width: ${PAGE_BREAK}px) {
      height: 50%;
      width: 100%;
      border-right: none;
      border-bottom: 1px solid white;
    }
`;

export const Info = styled.div`
    height: 100%;
    width: 50%;
    overflow: scroll;

    @media (max-width: ${PAGE_BREAK}px) {
      height: 50%;
      width: 100%;
    }
`;
