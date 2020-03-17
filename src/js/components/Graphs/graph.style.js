import styled from 'styled-components';
import { PAGE_BREAK } from '../../helpers/constants';

export const GraphContainer = styled.div`
    display: flex;
    height: 100vh;
    flex-direction: column;
    width: 100%;

    @media (max-width: ${PAGE_BREAK}px) {
      height: 50%;
      flex: 1 1 auto;
    }
`;

export const Graph = styled.div`
    height: 100%;

    @media (max-width: ${PAGE_BREAK}px) {
      height: 50%;
      flex: 1 1 auto;
    }
`;

export const GraphHeader = styled.div`
    color: wheat;
    padding: 0 5px;
    margin-left: 40px;
`;
