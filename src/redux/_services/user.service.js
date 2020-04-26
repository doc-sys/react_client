import { history } from "../_helpers/history";

export const userService = {
  login,
  logout,
  register
};

const API_BASE = process.env.API_BASE

function login(username, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password })
  };

  return fetch(`https://${API_BASE}/user/login`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user.user));
      localStorage.setItem("token", user.token);

      history.push("/");

      return user.user;
    });
}

function logout() {
  localStorage.removeItem("user");
  localStorage.removeItem("token");

  history.push("/login");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user)
  };

  return fetch(`https://${API_BASE}/user/signup`, requestOptions).then(
    handleResponse
  );
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status >= 400) {
        logout();
        window.location.reload(true);
      }

      const error = (data && data.payload.message) || response.statusText;
      return Promise.reject(error);
    }

    return data.payload;
  });
}
