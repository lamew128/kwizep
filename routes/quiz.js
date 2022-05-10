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
    // console.log("id is" , req.cookies.id);
    kwiz.userId = req.cookies.id;
    console.log(kwiz);
    if (kwiz.private = 'on') {
      kwiz.public = false;
    } else {
      kwiz.public = true;
    }
    let keys = Object.keys(kwiz).sort();
    let answerKeys = keys.slice(5,keys.length - 2);
    let answerArr = [];
    for (let i = 0; i < answerKeys.length; i++) {
      let ans = answerKeys[i];
      console.log(ans);
      if (ans[ans.length-1] !== 's') {
        let questionId = ans.substring(1,ans.length - 1);
        // console.log(questionId);
        let option = ans[ans.length-1];
        let correct;
        let answer = kwiz[ans];
        if (i !== ans.length - 1 && answerKeys[i+1][ans.length-1] == 's'){
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
   // ansarr looks like[
    //   'q1a',
    //   'q1ans', 'q1b',
    //   'q1c',   'q1d',
    //   'q2a',   'q2ans',
    //   'q2b',   'q2c',
    //   'q2d'
    // ]


    db.addKwiz(kwiz)
      .then(() => {
        // console.log("quizId is",kwiz.quizId);
        db.addKwizQuestions(kwiz.q1,kwiz.quizId)})
      .then (() =>{
        db.addKwizAnswers(answerArr);
        }
      );
    //bug:the last answer cannot be converted to the answer arr
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
