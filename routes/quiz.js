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
    //console.log({ kwiz });
    if (kwiz.private === 'on') {
      kwiz.public = false;
    } else {
      kwiz.public = true;
    }
    let keys = Object.keys(kwiz).sort();
    let answerKeys = keys.slice(4, keys.length - 2);
    //console.log({answerKeys},{keys});
    let answerArr = [];
    for (let i = 0; i < answerKeys.length; i++) {
      let ans = answerKeys[i];
      // console.log(ans);
      if (ans[ans.length - 1] !== 's') {
        let questionId = ans.substring(1, ans.length - 1);
        // console.log(questionId);
        let option = ans[ans.length - 1];
        let correct;
        let answer = kwiz[ans];
        if (i !== answerKeys.length - 1 && answerKeys[i + 1][answerKeys[i + 1].length - 1] == 's') {
          correct = true;
        } else {
          correct = false;
        }

        let answerObj = {};
        answerObj.questionId = questionId;
        answerObj.option = option;
        answerObj.correct = correct;
        answerObj.answer = answer;
        answerArr.push(answerObj);
      }
    }
    //console.log(answerArr);
    db.addKwiz(kwiz)
      .then(() => {
        db.addKwizQuestions(kwiz.q1, kwiz.quizId);
      })
      .then(() => {
        db.addKwizAnswers(kwiz.quizId, answerArr);
      })
      .then(() => {
        res.send({});
      });
    // bug:the last answer cannot be converted to the answer arr
    // db.addKwizQuestions(kwiz.q1, quizId);
  });



  router.get('/:id', (req, res) => {
    db.getUserWithId(req.cookies.id)
      .then((data) => {
        const kwizId = req.params.id;
        const templateVars = { user: data, id: kwizId };
        res.render("kwiz", templateVars);
      });
  });

  const questionsDb = {
    1: {
      1: {
        q1: 'QUESTION 1',
        q1a: 'AAAAAAAAAA',
        q1b: 'BBBBBBBBBB',
        q1c: 'CCCCCCCC',
        q1d: 'DDDDDDDDD',
        qans: 'q1a'
      },
      2: {
        q2: 'QUESTION 2',
        q2a: 'Q2AAAAAAAAAAAAAAA',
        q2b: 'Q2B',
        q2c: 'Q2C',
        q2d: 'Q2D',
        qans: 'q2b'
      },
      3: {
        q3: 'QUESTION 3',
        q3a: 'Q3A',
        q3b: 'Q3B',
        q3c: 'Q3C',
        q3d: 'Q3D',
        qans: 'q3c'
      },
      4: {
        q4: 'QUESTION 4',
        q4a: 'Q4A',
        q4b: 'Q4B',
        q4c: 'Q4C',
        q4d: 'Q4D',
        qans: 'q4d'
      },
      5: {
        q5: 'QUESTION 5',
        q5a: 'Q5A',
        q5b: 'Q5B',
        q5c: 'Q5C',
        q5d: 'Q5D',
        qans: 'q5a'
      },
      6: {
        q6: 'QUESTION 6',
        q6a: 'Q6A',
        q6b: 'Q6B',
        q6c: 'Q6C',
        q6d: 'Q6D',
        qans: 'q6b'
      },
    },
  };

  router.get('/:id/questions', (req, res) => {
    //db.Kwiz(req.params.id)..

    const kwizId = req.params.id;
    res.send(questionsDb[kwizId]);
  });

  return router;

  //STORE CORRECT OR NOT AS BOOLEAN IN AN ARRAY
  //RENDER THE QUIZ INCREMENTAL
};
