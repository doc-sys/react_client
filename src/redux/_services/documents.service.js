import { authHeader } from "../_helpers/authHeader";

export const documentService = {
  getOwn,
  getShared,
  getSingle,
  delete: _delete,
  share,
  checkout
};

const API_BASE = process.env.API_BASE

function getOwn() {
  const requestOptions = {
    method: "GET",
    headers: authHeader({ "Content-Type": "application/json" })
  };

  return fetch(`https://${API_BASE}/document/own`, requestOptions).then(
    handleResponse
  );
}

function getShared() {
  const requestOptions = {
    method: "GET",
    headers: authHeader({ "Content-Type": "application/json" })
  };

  return fetch(`https://${API_BASE}/document/shared`, requestOptions).then(
    handleResponse
  );
}

function getSingle(fileid) {
  const requestOptions = {
    method: "GET",
    headers: authHeader({ "Content-Type": "application/json" })
  };

  return fetch(`https://${API_BASE}/document/${fileid}`, requestOptions).then(
    handleResponse
  );
}

function _delete(fileid) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader({ "Content-Type": "application/json" })
  };

  return fetch(`https://${API_BASE}/document/${fileid}`, requestOptions).then(
    handleResponse
  );
}

function share(fileid, whom) {
  const requestOptions = {
    method: "POST",
    headers: authHeader({ "Content-Type": "application/json" }),
    body: JSON.stringify({ who: whom })
  };

  return fetch(`https://${API_BASE}/document/share`, requestOptions).then(
    handleResponse
  );
}

function checkout(fileId) {
  const requestOptions = {
    method: "GET",
    headers: authHeader()
  };

  return fetch(
    `https://${API_BASE}/document/checkout/${fileId}`,
    requestOptions
  ).then(handleDownloadResponse);
}

function handleDownloadResponse(response) {
  return response.blob().then(blob => {
    if (!response.ok) {
      const error = response.statusText || "Something went wrong";
      return Promise.reject(error);
    }

    let link = document.createElement("a");
    link.href = window.URL.createObjectURL(blob);

    document.body.appendChild(link);
    link.click();

    document.body.removeChild(link);
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
