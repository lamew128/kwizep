const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

 router.post('/create', (req, res) => {
  //  let quizId;
  //  console.log(quizId);
     // Add a new kwiz
    const kwiz = req.body;
    // console.log("id is" , req.cookies.id);
    kwiz.userId = req.cookies.id;
    // console.log(kwiz);
    if (kwiz.private = 'on') {
      kwiz.public = false;
    } else {
      kwiz.public = true;
    }

    db.addKwiz(kwiz)
      .then(() => {
        // console.log("quizId is",kwiz.quizId);
        db.addKwizQuestions(kwiz.q1,kwiz.quizId)})
      .then (() =>{
        db.addKwizAnswers;
      });
    //bug:only adding the first questionl
    // db.addKwizQuestions(kwiz.q1, quizId);
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
