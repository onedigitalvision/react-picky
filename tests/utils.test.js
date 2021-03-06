import {
  isDataObject,
  hasItem,
  keyExtractor,
  hasItemIndex
} from '../src/lib/utils';
describe('Utils', () => {
  describe('isDataObject', () => {
    it('should return false if not an object', () => {
      expect(isDataObject(1, '', '')).toBe(false);
    });
    it('should return false object doesnt have keys', () => {
      expect(isDataObject({ id: 1 }, 'test', 'test')).toBe(false);
    });
    it('should return true object has keys', () => {
      expect(isDataObject({ id: 1, label: 'test' }, 'id', 'label')).toBe(true);
    });
  });

  describe('hasItem', () => {
    let all;
    beforeAll(() => {
      all = Array.from(Array(10).keys()).map(v => {
        return {
          id: v + 1,
          name: `Label ${v + 1}`
        };
      });
    });
    it('should return false if nothing supplied', () => {
      expect(hasItem()).toBeFalsy();
    });

    it('should return false if no all prop supplied', () => {
      expect(hasItem(undefined, 1)).toBe(false);
    });
    it('should return false if no item prop supplied', () => {
      expect(hasItem(1, undefined)).toBe(false);
    });

    it('should return true if array of objects supplied and there is a match', () => {
      expect(hasItem(all, { id: 1, name: 'Item 1' }, 'id', 'name')).toBe(true);
    });
    it('should return false if array of objects supplied and there is no match', () => {
      expect(hasItem(all, { id: 101, name: 'Item 101' }, 'id', 'name')).toBe(
        false
      );
    });
    it('should find simple value if and there is a match', () => {
      expect(hasItem([1, 2, 3, 4, 5], 3)).toBe(true);
    });
    it('should not find simple value if and there is not a match', () => {
      expect(hasItem([1, 2, 3, 4, 5], 7)).toBe(false);
    });
    it('should find single value', () => {
      expect(hasItem(3, 3)).toBe(true);
    });
    it('should not find single value if no match', () => {
      expect(hasItem(3, 7)).toBe(false);
    });
    describe('Find index', () => {
      it('should find correct index', () => {
        expect(
          hasItemIndex(all, { id: 1, name: 'Item 1' }, 'id', 'name')
        ).toEqual(0);
        expect(
          hasItemIndex(all, { id: 10, name: 'Item 10' }, 'id', 'name')
        ).toEqual(9);

        expect(
          hasItemIndex([1, 2, 3, 4], 1, undefined, undefined, true)
        ).toEqual(0);
        expect(
          hasItemIndex([1, 2, 3, 4], 4, undefined, undefined, true)
        ).toEqual(3);
      });
    });
  });

  describe('Key extractor', () => {
    it('should extract correct key if object supplied', () => {
      expect(keyExtractor({ id: 2, label: 'Test' }, 'id', 'label')).toEqual(2);
    });
    it('should extract correct key if simple value supplied', () => {
      expect(keyExtractor(2)).toEqual(2);
    });
  });
});
