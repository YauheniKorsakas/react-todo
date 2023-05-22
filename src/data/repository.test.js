import getRepository from "./repository";

describe('repository:', () => {
  describe('getRepository:', () => {
    let repository = null;
    const localStorageKey = 'storageKey';
    const mockLocalStorage = {
      setItem: jest.fn(),
      getItem: jest.fn()
    };
    const data = Object.freeze({ dataToSaveKey: 'some value' });

    beforeEach(() => {
      repository = getRepository(localStorageKey);
      Object.defineProperty(window, 'localStorage', {
        value: mockLocalStorage
      });
    });

    afterEach(() => {
      jest.restoreAllMocks();
    });

    test('should return correct object', () => {
      expect(repository.save).toBeDefined();
      expect(repository.load).toBeDefined();
    });

    test('save method should save data by key in local storage', () => {
      const serializedData = JSON.stringify(data);

      repository.save(data);

      expect(mockLocalStorage.setItem).toHaveBeenCalledWith(localStorageKey, serializedData);
      expect(mockLocalStorage.setItem).toHaveBeenCalledTimes(1);
    });

    test('load method should return parsed object from localStorage by key', () => {
      const serializedData = JSON.stringify(data);
      mockLocalStorage.getItem.mockImplementation((key) => serializedData);

      const result = repository.load();

      expect(result).toEqual(data);
      expect(mockLocalStorage.getItem).toHaveBeenCalled();
    });

    test('load method should return null if there is no data in localStorage by key', () => {
      mockLocalStorage.getItem.mockImplementation(() => null);

      const result = repository.load();

      expect(result).toBeNull();
    });
  });
});
