import {
  SearchParams,
  SearchResult,
  SearchResultProps,
} from '../repository-contracts';

describe('Search Unit Tests', () => {
  describe('Repository Contracts - SearchParams', () => {
    test('property page', () => {
      const arrange = [
        { page: null, expected: 1 },
        { page: undefined, expected: 1 },
        { page: -1, expected: 1 },
        { page: 0, expected: 1 },
        { page: '0' as any, expected: 1 },
        { page: '11', expected: 11 },
        { page: 'kicks', expected: 1 },
        { page: 30, expected: 30 },
        { page: [], expected: 1 },
        { page: {}, expected: 1 },
      ];

      arrange.forEach((props) => {
        const params = new SearchParams(props);
        expect(params.page).toBe(props.expected);
      });
    });

    test('property per_page', () => {
      const arrange = [
        { per_page: null, expected: 15 },
        { per_page: undefined, expected: 15 },
        { per_page: -1, expected: 15 },
        { per_page: 0, expected: 15 },
        { per_page: '0' as any, expected: 15 },
        { per_page: '11', expected: 11 },
        { per_page: 'kicks', expected: 15 },
        { per_page: 30, expected: 30 },
        { per_page: [], expected: 15 },
        { per_page: {}, expected: 15 },
      ];

      arrange.forEach((props) => {
        const params = new SearchParams(props);
        expect(params.per_page).toBe(props.expected);
      });
    });

    test('property sort', () => {
      const arrange = [
        { sort: null, expected: null },
        { sort: undefined, expected: null },
        { sort: '', expected: null },
        { sort: 7 as any, expected: '7' },
        { sort: true as any, expected: 'true' },
        { sort: false as any, expected: 'false' },
        { sort: -1 as any, expected: '-1' },
        { sort: 'example', expected: 'example' },
      ];

      arrange.forEach((props) => {
        const params = new SearchParams(props);
        expect(params.sort).toBe(props.expected);
      });
    });

    test('property sort_dir', () => {
      const arrange = [
        { sort_dir: null as any, expected: 'desc' },
        { sort_dir: undefined as any, expected: 'desc' },
        { sort_dir: '', expected: 'desc' },
        { sort_dir: 'desc', expected: 'desc' },
        { sort_dir: 'asc', expected: 'asc' },
      ];

      arrange.forEach((props) => {
        const params = new SearchParams(props);
        expect(params.sort_dir).toBe(props.expected);
      });
    });

    test('property filter', () => {
      const arrange = [
        { filter: null, expected: null },
        { filter: undefined, expected: null },
        { filter: '', expected: null },
        { filter: 7 as any, expected: '7' },
        { filter: true as any, expected: 'true' },
        { filter: false as any, expected: 'false' },
        { filter: -1 as any, expected: '-1' },
        { filter: 'example', expected: 'example' },
      ];

      arrange.forEach((props) => {
        const params = new SearchParams(props);
        expect(params.filter).toBe(props.expected);
      });
    });
  });

  describe('Repository Contracts - SearchResult', () => {
    test('constructor props', () => {
      let params: SearchResultProps<any> = {
        items: ['entity2', 'entity1', 'entity3'],
        total: 4,
        current_page: 1,
        per_page: 2,
        sort: null,
        sort_dir: null,
        filter: null,
      };
      let result = new SearchResult(params);
      expect(result.toJSON()).toStrictEqual({
        ...params,
        last_page: 2,
      });

      params = {
        items: ['entity2', 'entity1', 'entity3'],
        total: 45,
        current_page: 1,
        per_page: 7,
        sort: 'name',
        sort_dir: 'asc',
        filter: 'teste',
      };
      result = new SearchResult(params);
      expect(result.toJSON()).toStrictEqual({
        ...params,
        last_page: 7,
      });
    });

    it('should test last_page = 1 when per_page field is greater thant total field', () => {
      const params: SearchResultProps<any> = {
        items: ['entity2', 'entity1', 'entity3'],
        total: 4,
        current_page: 1,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      };
      const result = new SearchResult(params);
      expect(result.toJSON()).toStrictEqual({
        ...params,
        last_page: 1,
      });
    });
  });
});
