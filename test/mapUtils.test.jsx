import * as funcs from '../client/src/utils/mapUtils';

describe('remove all null properties from config object', () => {
  const { clean } = funcs;

  test('should not remove any non-null value properties', () => {
    const noNulls = {
      a: 'a',
      b: 'b',
      c: 'c',
    };
    const dirty = Object.keys(noNulls).length;
    const scrubbed = Object.keys(clean(noNulls)).length;
    expect(scrubbed).toEqual(dirty);
  });

  test('should remove all null value properties', () => {
    const nulls = {
      a: 'a',
      b: null,
      c: 'c',
    };
    const dirty = Object.keys(nulls).length;
    const scrubbed = Object.keys(clean(nulls)).length;
    expect(scrubbed).not.toEqual(dirty);
  });
});


