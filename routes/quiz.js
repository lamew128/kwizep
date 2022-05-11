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
    console.log(answerArr);
    db.addKwiz(kwiz)
      .then(() => db.addKwizQuestions(kwiz.q1, kwiz.quizId, answerArr))
      .then(() => {
        res.send({});
      });
  });


  //  router.get('/:quizId',(req,res) => {
  //    db.
  //    const questionsDb = {

  //     1: {
  //       1: {
  //         q1: 'QUESTION 1',
  //         q1a: 'AAAAAAAAAA',
  //         q1b: 'BBBBBBBBBB',
  //         q1c: 'CCCCCCCC',
  //         q1d: 'DDDDDDDDD',
  //         qans: 'q1a'
  //       },
  //       2: {
  //         q2: 'QUESTION 2',
  //         q2a: 'Q2A',
  //         q2b: 'Q2B',
  //         q2c: 'Q2C',
  //         q2d: 'Q2D',
  //         qans: 'q2b'
  //       },
  //       3: {
  //         q3: 'QUESTION 3',
  //         q3a: 'Q3A',
  //         q3b: 'Q3B',
  //         q3c: 'Q3C',
  //         q3d: 'Q3D',
  //         qans: 'q3c'
  //       },
  //       4: {
  //         q4: 'QUESTION 4',
  //         q4a: 'Q4A',
  //         q4b: 'Q4B',
  //         q4c: 'Q4C',
  //         q4d: 'Q4D',
  //         qans: 'q4d'
  //       },
  //       5: {
  //         q5: 'QUESTION 5',
  //         q5a: 'Q5A',
  //         q5b: 'Q5B',
  //         q5c: 'Q5C',
  //         q5d: 'Q5D',
  //         qans: 'q5a'
  //       },
  //       6: {
  //         q6: 'QUESTION 6',
  //         q6a: 'Q6A',
  //         q6b: 'Q6B',
  //         q6c: 'Q6C',
  //         q6d: 'Q6D',
  //         qans: 'q6b'
  //       },
  //     },
  //   };

  //  })

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
