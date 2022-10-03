const useLocalStorage = {
  get: (KEY: string) => {
    try {
      const item = window.localStorage.getItem(KEY);
      return item;
      // return window.localStorage.getItem(KEY);
    } catch (err) {
      console.error(err);
    }
  },
  set: (KEY: string, VALUE: string) => {
    try {
      window.localStorage.setItem(KEY, VALUE);
    } catch (err) {
      console.error(err);
    }
  },
};

export default useLocalStorage;

// function refreshExpiredToken(res) {
//   if (res.status === 401) {
//   }
// }
