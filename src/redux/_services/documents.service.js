import { authHeader } from "../_helpers/authHeader";

export const documentService = {
  getOwn,
  getShared,
  getSingle,
  delete: _delete,
  share
};

const API_BASE = "localhost:3001";

function getOwn() {
  const requestOptions = {
    method: "GET",
    headers: authHeader({ "Content-Type": "application/json" })
  };

  return fetch(`http://${API_BASE}/documents/own`, requestOptions).then(
    handleResponse
  );
}

function getShared() {
  const requestOptions = {
    method: "GET",
    headers: authHeader({ "Content-Type": "application/json" })
  };

  return fetch(`http://${API_BASE}/documents/shared`, requestOptions).then(
    handleResponse
  );
}

function getSingle(fileid) {
  const requestOptions = {
    method: "GET",
    headers: authHeader({ "Content-Type": "application/json" })
  };

  return fetch(`${API_BASE}/documents/${fileid}`, requestOptions).then(
    handleResponse
  );
}

function _delete(fileid) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader({ "Content-Type": "application/json" })
  };

  return fetch(`${API_BASE}/documents/${fileid}`, requestOptions).then(
    handleResponse
  );
}

function share(fileid, whom) {
  const requestOptions = {
    method: "POST",
    headers: authHeader({ "Content-Type": "application/json" }),
    body: JSON.stringify({ who: whom })
  };

  return fetch(`${API_BASE}/documents/share`, requestOptions).then(
    handleResponse
  );
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
