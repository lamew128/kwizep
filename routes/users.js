/*
 * All routes for Users are defined here
 * Since this file is loaded in server.js into api/users,
 *   these routes are mounted onto /users
 * See: https://expressjs.com/en/guide/using-middleware.html#middleware.router
 */

const express = require('express');
const router  = express.Router();
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

//default users database
const users = {
  "1": {
    id: "1",
    email: "1@1",
    password: bcrypt.hashSync("1", 10)
  },
 "2": {
    id: "2",
    email: "2@2",
    password: bcrypt.hashSync("2", 10)
  }
}

module.exports = (db) => {
  router.get("/", (req, res) => {
    db.query(`SELECT * FROM users;`)
      .then(data => {
        const users = data.rows;
        res.json({ users });
      })
      .catch(err => {
        res
          .status(500)
          .json({ error: err.message });
      });
  });

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    console.log(`email: ${email} password: ${password}`)
  });
  return router;
};
