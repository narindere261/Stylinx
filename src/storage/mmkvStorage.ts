// src/storage/mmkv.ts
import MMKV from 'react-native-mmkv';

export const storage = new MMKV(); // ✅ This is correct

// Redux Persist adapter
export const reduxStorage = {
  setItem: (key: string, value: string) => {
    storage.set(key, value);
    return Promise.resolve(true);
  },
  getItem: (key: string) => {
    const value = storage.getString(key);
    return Promise.resolve(value);
  },
  removeItem: (key: string) => {
    storage.delete(key);
    return Promise.resolve();
  },
};
