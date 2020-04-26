import { authHeader } from "../_helpers/authHeader";

export const settingsService = {
  uploadAvatar
};

const API_BASE = process.env.API_BASE

function uploadAvatar(file) {
  let data = new FormData();
  data.append("file", file);

  const requestOptions = {
    method: "POST",
    headers: authHeader(),
    body: data
  };

  return fetch(`https://${API_BASE}/settings/avatar`, requestOptions)
    .then(handleResponse)
    .then(user => {
      localStorage.setItem("user", JSON.stringify(user.user));

      return user.user.avatar;
    });
}

function handleResponse(response) {
  return response.text().then(text => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      const error = (data && data.payload.message) || response.statusText;
      return Promise.reject(error);
    }

    return data.payload;
  });
}
