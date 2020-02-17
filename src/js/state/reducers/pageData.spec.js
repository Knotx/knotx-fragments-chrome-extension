
import pageDataReducer, { initState } from './pageData';
import {
  SET_PAGE_DATA, REMOVE_PAGE_DATA, SET_RENDERED_GRAPH, SET_SIDEBAR_EXPANDED,
} from '../actionTypes/pageData';


const currentPageData = {
  id: 'example_id_0',
  url: 'www.exampleurl0.com',
  fragments: [],
  renderedGraph: '123',
  sidebarExpanded: false,
};

const nextPageData = {
  id: 'example_id_1',
  url: 'www.exampleurl1.com',
  fragments: [],
  renderedGraph: null,
  sidebarExpanded: true,
};


describe('pageData reducer', () => {
  test('Handles empty action', () => {
    const state = pageDataReducer(undefined, {});
    expect(state).toEqual(initState);
  });

  describe('SET_PAGE_DATA', () => {
    test('Handles SET_PAGE_DATA action with initial state', () => {
      const expectedData = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
          renderedGraph: null,
          sidebarExpanded: true,
        },
      };

      const state = pageDataReducer(undefined, { type: SET_PAGE_DATA, pageData: currentPageData });
      expect(state).toEqual(expectedData);
    });

    test('Handles SET_PAGE_DATA action with some data already existing in state', () => {
      const initialState = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
          renderedGraph: null,
          sidebarExpanded: true,
        },
      };

      const expectedData = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
          renderedGraph: null,
          sidebarExpanded: true,
        },
        [nextPageData.id]: {
          url: nextPageData.url,
          fragments: nextPageData.fragments,
          renderedGraph: null,
          sidebarExpanded: true,
        },
      };

      const state = pageDataReducer(initialState, { type: SET_PAGE_DATA, pageData: nextPageData });
      expect(state).toEqual(expectedData);
    });
  });

  describe('REMOVE_PAGE_DATA', () => {
    test('Handles REMOVE_PAGE_DATA action with initial state', () => {
      const state = pageDataReducer(undefined, { type: REMOVE_PAGE_DATA, pageData: { id: currentPageData.id } });
      expect(state).toEqual(initState);
    });

    test('Handles REMOVE_PAGE_DATA action with some data already existing in state', () => {
      const initialState = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
          renderedGraph: null,
          sidebarExpanded: true,
        },
      };

      const expectedData = {
        [nextPageData.id]: {
          url: nextPageData.url,
          fragments: nextPageData.fragments,
          renderedGraph: null,
          sidebarExpanded: true,
        },
      };

      const state = pageDataReducer(initialState, { type: SET_PAGE_DATA, pageData: nextPageData });
      pageDataReducer(state, { type: REMOVE_PAGE_DATA, pageData: { id: currentPageData.id } });
      expect(state).toEqual(expectedData);
    });
  });

  describe('SET_SIDEBAR_EXPANDED', () => {
    test('Handles SET_SIDEBAR_EXPANDED', () => {
      const initialState = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
          renderedGraph: null,
          sidebarExpanded: true,
        },
      };

      const expectedData = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
          renderedGraph: null,
          sidebarExpanded: false,
        },
      };

      const state = pageDataReducer(initialState,
        {
          type: SET_SIDEBAR_EXPANDED,
          pageData:
          { ...currentPageData, sidebarExpanded: false },
        });
      expect(state).toEqual(expectedData);
    });
  });

  describe('SET_RENDERED_GRAPH', () => {
    test('Handles SET_RENDERED_GRAPH', () => {
      const initialState = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
          renderedGraph: null,
          sidebarExpanded: true,
        },
      };

      const expectedData = {
        [currentPageData.id]: {
          url: currentPageData.url,
          fragments: currentPageData.fragments,
          renderedGraph: '123',
          sidebarExpanded: true,
        },
      };

      const state = pageDataReducer(initialState,
        {
          type: SET_RENDERED_GRAPH,
          pageData:
          {
            ...currentPageData,
            renderedGraph: '123',
          },
        });

      expect(state).toEqual(expectedData);
    });
  });
});
