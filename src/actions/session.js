export const setSession = (data) => {
  const expirationDate = new Date();
  expirationDate.setDate(expirationDate.getDate() + 7);
  document.cookie = `userSession=${encodeURIComponent(JSON.stringify(data))}; expires=${expirationDate.toUTCString()}; path=/`;
};

export const getSession = () => {
  const name = "userSession=";
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return JSON.parse(c.substring(name.length, c.length));
    }
  }
  return null;
};

export const clearSession = () => {
  document.cookie = "userSession=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
};
