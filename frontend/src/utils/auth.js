export const BASE__URL = "https://anurovbackmesto.nomoredomains.monster";

const getResponse = (res) => {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Что-то пошло не так: ${res.status}`);
}

export const register = (email, password) => {
  return fetch(`${BASE__URL}/signup`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponse);
};

export const login = (email, password) => {
  return fetch(`${BASE__URL}/signin`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  }).then(getResponse)
  .then((data) => {
    localStorage.setItem('token', data.token);
    return data;
  })
};


export const chekToken = (jwt) => {
  return fetch(`${BASE__URL}/users/me`, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      authorization: `Bearer ${jwt}`,
    },
  })
    
};
