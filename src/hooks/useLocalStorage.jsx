const userKey = "user";
const tokenKey = "accessToken";

export function saveToken(accessToken) {
  saveToStorage(tokenKey, accessToken);
}

export function getToken() {
  const accessToken = getFromStorage(tokenKey);

  return accessToken;
}

export function saveUser(name) {
  const existingUser = getFromStorage(userKey);

  if (existingUser) {
    const updatedUser = { ...existingUser, ...name };
    saveToStorage(userKey, updatedUser);
  } else {
    saveToStorage(userKey, name);
  }
}

const getUser = () => {
  const userData = getFromStorage(userKey);
  return userData;
};

export { getUser };

export const isLoggedIn = () => !!getToken();

function saveToStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

function getFromStorage(key) {
  const data = localStorage.getItem(key);
  try {
    return data ? JSON.parse(data) : null;
  } catch (e) {
    console.error(`Error parsing storage item ${key}:`, e);
    return null;
  }
}

export const clearStorage = () => {
  localStorage.clear();
};

/*const tokenKey = "accessToken";
const userKey = "user";

export const saveToken = (accessToken) => setItem(tokenKey, accessToken);
export const getToken = () => getItem(tokenKey);
export const isLoggedIn = () => !!getToken();

export const saveUser = (user) => {
    const existingUser = getItem(userKey);
    setItem(userKey, { ...existingUser, ...user });
};

export const getUser = () => getItem(userKey);
export const clearStorage = () => localStorage.clear();

function setItem(key, data) {
  try {
      if (data === undefined) {
          console.error(`Attempted to set undefined data for ${key}`);
      } else {
          localStorage.setItem(key, JSON.stringify(data));
      }
  } catch (e) {
      console.error(`Error saving ${key} to storage:`, e);
  }
}

function getItem(key) {
  try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : null;
  } catch (e) {
      console.error(`Error parsing ${key} from storage:`, e);
      return null;
  }
}



/*const storage = {

  getToken() {
    return localStorage.getItem('token');
  },
  setToken(token) {
    localStorage.setItem('token', token);
  },
  clearToken() {
    localStorage.removeItem('token');
  }
};

export default storage;*/
