export function authHeader(rest) {
  let user = JSON.parse(localStorage.getItem("user"));
  let token = localStorage.getItem("token");

  if (user && token) {
    return { Authorization: "Bearer " + token, ...rest };
  } else {
    return {};
  }
}
