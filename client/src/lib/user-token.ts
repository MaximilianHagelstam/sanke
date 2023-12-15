const LOCAL_STORAGE_JWT_ID = "sanke-user-token";

export const getUserToken = () => {
  const token = window.localStorage.getItem(LOCAL_STORAGE_JWT_ID);
  return token;
};

export const setUserToken = (token: string) => {
  window.localStorage.setItem(LOCAL_STORAGE_JWT_ID, token);
};

export const removeUserToken = () => {
  window.localStorage.removeItem(LOCAL_STORAGE_JWT_ID);
};
