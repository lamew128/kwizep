const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const { stringify } = require('querystring');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

  router.post('/create', (req, res) => {
    //  let quizId;
    //  console.log(quizId);
    // Add a new kwiz
    const kwiz = req.body;
    kwiz.userId = req.cookies.id;
    if (kwiz.private) {
      kwiz.public = false;
    } else {
      kwiz.public = true;
    }

    const keys = Object.keys(kwiz).sort();
    const answerKeys = keys.slice(4, keys.length - 2);

    const correctAnswerKeys = answerKeys.filter(key => key[key.length - 1] === 's');
    const correctAnswers = correctAnswerKeys.map(key => kwiz[key]);
    const actualOptions = answerKeys.filter(key => key[key.length - 1] !== 's');

    const answerArr = [];
    for (let i = 0; i < actualOptions.length; i++) {
      const key = actualOptions[i];
      const questionIndex = parseInt(key.substring(1, key.length - 1)) - 1;
      let correct = false;
      if (correctAnswers.includes(key)) {
        correct = true;
      }

      const answerObj = {
        option: key[key.length - 1],
        correct,
        answer: kwiz[key]
      };

      if (answerArr.length >= questionIndex + 1) {
        const ansListForQuestion = answerArr[questionIndex];
        ansListForQuestion.push(answerObj);
        answerArr[questionIndex] = ansListForQuestion;
      } else {
        answerArr.push([answerObj]);
      }
    }
    // console.log(answerArr);
    db.addKwiz(kwiz)
      .then(() => db.addKwizQuestions(kwiz.q1, kwiz.quizId, answerArr))
      .then(() => {
        res.send({});
      });
  });


  router.get('/:quizId', (req, res) => {
    db.takeKwiz(req.params.quizId);
    //add complete server response
  });


  router.get('/:id', (req, res) => {
    db.getUserWithId(req.cookies.id)
      .then((data) => {
        const kwizId = req.params.id;
        const templateVars = { user: data, id: kwizId };
        res.render("kwiz", templateVars);
      });
  });



  router.get('/:id/questions', (req, res) => {
    //db.Kwiz(req.params.id)..

    const kwizId = req.params.id;
    res.send(questionsDb[kwizId]);
  });

  return router;

  //STORE CORRECT OR NOT AS BOOLEAN IN AN ARRAY
  //RENDER THE QUIZ INCREMENTAL
};
