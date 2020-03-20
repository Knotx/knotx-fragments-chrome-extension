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
     height: 50%;
     flex: 1 1 auto;
`;

export const GraphHeader = styled.div`
    color: wheat;
    padding: 0 5px;
    margin-left: 40px;
`;

export const GraphToogleViewButton = styled.button`
    position: relative;
    bottom: 80px;
    left: 50px;
    width: fit-content;
    border: 1px solid white;
    padding: 5px;
    font-size: 18px;
    color: red;
`;

export const GraphFullScreenPanel = styled.div`
    position: fixed;
    z-index: 1;
    background-color: #3a3a3a;
    width: 100%;
    height: 100%;
    display: ${({ shouldDisplay }) => (shouldDisplay ? 'block' : 'none')};
`;
