import { LOCAL_STORAGE_KEY } from '@/shared/constants';

// utils/auth.js
export const saveTokenToLocalStorage = (token: string) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY.TOKEN, token);
  } catch (error) {
    console.error('Error saving token to local storage:', error);
  }
};

export const getTokenFromLocalStorage = () => {
  try {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN);
    return token;
  } catch (error) {
    console.error('Error getting token from local storage:', error);
    return null;
  }
};
