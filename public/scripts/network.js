function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/api/users/login",
    data
  });
}
