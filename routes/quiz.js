const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));

module.exports = (db) => {

  //show all private kwiz created by the current logged in user
  router.get("/mykwizes", (req, res) => {
    if (!req.cookies.id) {
      res.redirect('/');
      return;
    }
    db.getUserWithId(req.cookies.id)
      .then((user) => {
        Promise.all([
          db.showMyKwizzes(user.id),
          db.countMyKwiz(req.cookies.id),
          db.myLastKwiz(req.cookies.id)
        ])
          .then((data) => {
            let dataScore = 0;
            if (data[2]) {
              dataScore = data[2].score;
            }
            const templateVars = { user: user, db: data[0], count: data[1].count, score: dataScore, public: false };
            res.render("index", templateVars);
          });
      });
  });

  //show all public kwiz
  router.get("/publickwizes", (req, res) => {
    if (!req.cookies.id) {
      res.redirect('/');
      return;
    }
    db.getUserWithId(req.cookies.id)
      .then((user) => {
        Promise.all([
          db.showPublicKwizzes(),
          db.countMyKwiz(req.cookies.id),
          db.myLastKwiz(req.cookies.id)
        ])
          .then((data) => {
            let dataScore = 0;
            if (data[2]) {
              dataScore = data[2].score;
            }
            const templateVars = { user: user, db: data[0], count: data[1].count, score: dataScore, public: true };
            res.render("index", templateVars);
          });
      });
  });

  //go to the create kwiz page
  router.get("/createkwiz", (req, res) => {
    if (!req.cookies.id) {
      res.redirect('/');
    }
    db.getUserWithId(req.cookies.id)
      .then((data) => {
        const templateVars = { user: data };
        res.render("createkwiz", templateVars);
      });
  });

  //create a kwiz
  router.post('/create', (req, res) => {
    const kwiz = req.body;
    kwiz.userId = req.cookies.id;
    let questionArr = kwiz.q1;
    if (!Array.isArray(questionArr)) {
      questionArr = [questionArr];
    }
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
    db.addKwiz(kwiz)
      .then(() => db.addKwizQuestions(questionArr, kwiz.quizId, answerArr))
      .then(() => {
        res.send({});
      });
  });

  //go to the quiz page with the quiz id
  router.get('/:id', (req, res) => {
    Promise.all([
      db.getKwizCover(req.params.id),
      db.getUserWithId(req.cookies.id)
    ])
    .then((data) => {
      const kwizId = req.params.id;
      const templateVars = { user: data[1], id: kwizId, image: data[0].url, title: data[0].title, description: data[0].description };
      res.render("kwiz", templateVars);
    });
  });

  //store the questions after clicking the start quiz button
  router.get('/:id/questions', (req, res) => {
    db.takeKwiz(req.params.id)
      .then((data) => {
        res.send(data);
      });
  });

  //create result page after submitting a quiz (insert)
  router.post('/result', (req, res) => {
    let data = req.body;
    let kwizId = data.kwizId;
    let correctArr = data['correct[]'];
    if (!Array.isArray(correctArr)) {
      correctArr = [correctArr];
    }
    let userId = req.cookies.id || 1;
    db.generateKwizResponse(userId, kwizId, correctArr)
      .then((rows) => {
        res.send(rows);
      });
  });

  //go to the result page with an id
  router.get('/result/:id', (req, res) => {
    let user = req.cookies.id;
    db.getKwizResult(req.params.id) // => if user = undefined ? user = guest
      .then(function(data) {
        const templateVars = { user, username: data.user, title: data.title, image: data.url, score: data.score, quizId: data.quiz_id };
        res.render("results", templateVars);
      });
  });

  return router;
};
