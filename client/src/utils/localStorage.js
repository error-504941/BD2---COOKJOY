export function setItemWithTTL(key, value, ttlInSeconds) {
    const expirationTime = Date.now() + ttlInSeconds * 1000;
    const item = {
      value,
      expires: expirationTime,
    };
    sessionStorage.setItem(key, JSON.stringify(item));
  }
  
export function getItemWithTTL(key) {
  const storedItem = sessionStorage.getItem(key);
  if (storedItem) {
      const parsedItem = JSON.parse(storedItem);
      if (parsedItem.expires && parsedItem.expires < Date.now()) {
          sessionStorage.removeItem(key);
          return null;
      }

    return parsedItem.value;
  }

  return null;
}

export function deleteItemWithTTL(key){
  const storedItem = sessionStorage.getItem(key);
  if (storedItem) {
        sessionStorage.removeItem(key);
  }
}