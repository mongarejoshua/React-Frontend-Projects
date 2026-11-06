const DB_NAME = 'pixel-gallery';
const STORE_NAME = 'photos';
const DB_VERSION = 1;

function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      if (!request.result.objectStoreNames.contains(STORE_NAME)) {
        request.result.createObjectStore(STORE_NAME, { keyPath: 'id' });
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('Unable to open image storage.'));
  });
}

async function withStore(mode, operation) {
  const db = await openDatabase();
  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, mode);
    const request = operation(transaction.objectStore(STORE_NAME));
    let result;
    request.onsuccess = () => { result = request.result; };
    request.onerror = () => reject(request.error ?? new Error('Image storage request failed.'));
    transaction.oncomplete = () => {
      db.close();
      resolve(result);
    };
    transaction.onerror = () => {
      db.close();
      reject(transaction.error ?? new Error('Image storage transaction failed.'));
    };
    transaction.onabort = () => {
      db.close();
      reject(transaction.error ?? new Error('Image storage transaction was aborted.'));
    };
  });
}

export const getStoredPhotos = () => withStore('readonly', (store) => store.getAll());
export const saveStoredPhoto = (photo) => withStore('readwrite', (store) => store.put(photo));
export const deleteStoredPhoto = (id) => withStore('readwrite', (store) => store.delete(id));

export function readLocalStorage(key, fallback) {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch (error) {
    console.error(`Unable to read ${key} from localStorage.`, error);
    return fallback;
  }
}

export function writeLocalStorage(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Unable to save ${key} to localStorage.`, error);
    throw new Error('Your browser could not save this change. Check available storage and try again.');
  }
}
