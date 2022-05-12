/* eslint-disable func-style */

function logOut() {
  return $.ajax({
    method: "POST",
    url: "/users/logout",
  });
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
    url: "/kwiz/create",
    data
  });
}

function getKwiz(url) {
  return $.ajax({
    method: "GET",
    url: `${url}/questions`
  });
}

function generateResult(data) {
  return $.ajax({
    method: "POST",
    url: `/kwiz/result`,
    data
  });
}

