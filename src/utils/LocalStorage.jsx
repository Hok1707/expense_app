const localStorageUtil = {
    localStorage: {
      setItem: (key, value) => {
        localStorage.setItem(key, JSON.stringify(value));
      },
      getItem: (key) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      },
      removeItem: (key) => {
        localStorage.removeItem(key);
      },
      clear: () => {
        localStorage.clear();
      }
    },
    sessionStorage: {
      setItem: (key, value) => {
        sessionStorage.setItem(key, JSON.stringify(value));
      },
      getItem: (key) => {
        const value = sessionStorage.getItem(key);
        return value ? JSON.parse(value) : null;
      },
      removeItem: (key) => {
        sessionStorage.removeItem(key);
      },
      clear: () => {
        sessionStorage.clear();
      }
    }
  };
  
  export default localStorageUtil;
  