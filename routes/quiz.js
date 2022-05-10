const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

  router.post('/create', (req, res) => {
    const quiz = req.body;
    db.addQuiz(quiz)
      .then(user => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        res.cookie('id', user.id);
        res.send("🤗");
      })
      .catch(e => res.send(e));
  });

  router.get('/:id', (req, res) => {
    const quizId = req.params.id;
    db.addQuiz(user)
      .then(user => {
        if (!user) {
          res.send({ error: "error" });
          return;
        }
        res.cookie('id', user.id);
        res.send("🤗");
      })
      .catch(e => res.send(e));
  });
  return router;
};
