const read = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from local storage.`, error);
    return fallback;
  }
};

const write = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to save ${key} to local storage.`, error);
  }
};

export const getHistory = () => read('quiz-master-history', []);
export const saveHistory = (history) => write('quiz-master-history', history);
export const getFavorites = () => read('quiz-master-favorites', []);
export const saveFavorites = (favorites) => write('quiz-master-favorites', favorites);
export const getTheme = () => read('quiz-master-theme', 'light');
export const saveTheme = (theme) => write('quiz-master-theme', theme);
