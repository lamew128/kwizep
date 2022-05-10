/* eslint-disable func-style */

function getMyDetails() {
  console.log("getMyDetails");
  return $.ajax({
    url: "/users",
  });
}

function logOut() {
  return $.ajax({
    method: "POST",
    url: "/users/logout",
  })
}

function logIn(data) {
  return $.ajax({
    method: "POST",
    url: "/users/login",
    data
  });
}

function signUp(data) {
  return $.ajax({
    method: "POST",
    url: "/users/register",
    data
  });
}

function createKwiz(data) {
  return $.ajax({
    method: "POST",
    url: "/quiz/create",
    data
  });
}

function getKwiz(data) {
  return $.ajax({
    method: "GET",
    url: "/quiz/:id",
    data
  });
}
