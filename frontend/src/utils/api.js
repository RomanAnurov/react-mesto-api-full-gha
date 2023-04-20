class Api {
  constructor(data) {
    this.baseUrl = data.baseUrl;
  }

  _getResponseData(res) {
    if (res.ok) {
      return res.json();
    }

    return Promise.reject(`Что-то пошло не так: ${res.status}`);
  }

  getUserInfo() {
    return fetch (`${this.baseUrl}/users/me`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData)
  }

  getInitialCards() {
    return fetch (`${this.baseUrl}/cards`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData)
  }
  editUserData(data) {
    return fetch(`${this.baseUrl}/users/me`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then(this._getResponseData)
  }
  postNewCard(data) {
    return fetch(`${this.baseUrl}/cards`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then(this._getResponseData)
  }
  deleteCardApi(_id) {
    return fetch(`${this.baseUrl}/cards/${_id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData)
  }

  changeLikeCardStatus(_id, isLiked) {
    return fetch(`${this.baseUrl}/cards/${_id}/likes`, {
      method: !isLiked ? "DELETE" : "PUT",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
    }).then(this._getResponseData)
  }

  updateAvatar(data) {
    return fetch(`${this.baseUrl}/users/me/avatar `, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then(this._getResponseData)
  }
}

const api = new Api({
  baseUrl: "https://anurovbackmesto.nomoredomains.monster",
});

export default api;
