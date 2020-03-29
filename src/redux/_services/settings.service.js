import { authHeader } from "../_helpers/authHeader";

export const settingsService = {
  uploadAvatar
};

const API_BASE = "localhost:3001";

function uploadAvatar(fileList) {
  let data = new FormData();
  data.append("file", fileList[0]);

  const requestOptions = {
    method: "POST",
    headers: authHeader({
      "Content-Type": "application/x-www-form-urlencoded"
    }),
    body: data
  };

  return fetch(`http://${API_BASE}/settings/avatar`, requestOptions)
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
