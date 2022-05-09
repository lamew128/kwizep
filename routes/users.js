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


module.exports = (db) => {
  router.get("/", (req, res) => {
    db.getAllUser()
    .then(users => {
      res.json({ users });
    })
    .catch(e => res.send(e));
  });


  /**
   * Check if a user exists with a given username and password
   * @param {String} email
   * @param {String} password encrypted
   */
   const login =  function(email, password) {
    return db.getUserWithEmail(email)
    .then(user => {
      if (password === user.password) {
        return user;
      }
      return null;
    });
  }
  exports.login = login;

  router.post("/login", (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    login(email, password)
    .then(user => {
      if (!user) {
        res.send({error: "error"});
        return;
      }
      //req.session.userId = user.id;
      console.log("login success!");
      res.send({user: {name: user.name, email: user.email, id: user.id}});
    })
    .catch(e => res.send(e));
  });
  return router;
};
