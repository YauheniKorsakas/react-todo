const getRepository = (storageKey) => ({
  save: (data) => {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(storageKey, serializedData);
  },
  load: () => {
    const serializedData = localStorage.getItem(storageKey);

    return serializedData ? JSON.parse(serializedData) : null;
  }
});

export default getRepository;
