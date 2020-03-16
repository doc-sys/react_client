export function authHeader(rest) {
  let user = JSON.parse(localStorage.getItem("user"));

  if (user && user.token) {
    return { Authorization: "Bearer " + user.token, ...rest };
  } else {
    return {};
  }
}
