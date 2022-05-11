let dbParams = {};
if (process.env.DATABASE_URL) {
  dbParams.connectionString = process.env.DATABASE_URL;
} else {
  dbParams = {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
  };
}

const { count, Console } = require("console");
const { create } = require("domain");
const { promiseImpl } = require("ejs");
const { Pool } = require("pg");
const pool = new Pool(dbParams);

/**
 * Add a new user to the database.
 * @param {{name: string, password: string, email: string}} user
 * @return {Promise<{}>} A promise to the user.
 */
 const addUser =  function(user) {
  return pool
    .query(
      `INSERT INTO users (name, email, password)
       VALUES($1, $2, $3)
       RETURNING *;`, [user.name, user.email, user.password])
    .then((result) => {
      console.log("added ", result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}

/**
 * Get a single user from the database given their email.
 * @param {String} email The email of the user.
 * @return {Promise<{}>} A promise to the user.
 */
 const getUserWithEmail = function(email) {
  return pool
    .query(
      `SELECT * FROM users
       WHERE email = $1`, [email])
    .then((result) => {
      //console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const getAllUser = function(){
  return pool.query(`SELECT * FROM users;`)
    .then(data => {
      const users = data.rows;
      console.log(users);
      return users;
    })
    .catch(err => {
      //res.status(500).json({ error: err.message });
    });
  }

/**
 * Get a single user from the database given their id.
 * @param {string} id The id of the user.
 * @return {Promise<{}>} A promise to the user.
 */
 const getUserWithId = function(id) {
  return pool
    .query(
      `SELECT * FROM users
       WHERE id = $1`, [id])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}

/**
 * Logged in user can create a Kwiz
 * @param {object} Kwiz the Kwiz object with creator_id, url, ispublic...as keys
 * @return {Promise<{}>} A promise to the user.
 */
const addKwiz = (kwiz) => {
  let createKwizParams = [kwiz.userId, kwiz.imageurl,kwiz.public,kwiz.title,kwiz.description];
  // console.log("params is", createKwizParams);
  return pool.query
  (`INSERT INTO quiz (creator_id,url,public,title,description)
   VALUES ($1, $2, $3, $4, $5)
   RETURNING *;`,
  createKwizParams)
  .then((result) => {
    // console.log("result rows is",result.rows);
    kwiz.quizId = result.rows[0].id;
    // console.log("quizId is",quizId, "according to addKwiz");
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

/**
 * add questions to a created Kwiz skeleton
 * @param {array} questions the list of questions
 * @param {integer} quizId the quizId
 * @return {Promise<{}>} A promise to the user.
 */
const addKwizQuestions = (questions, quizId, answerArr) => {
  // console.log('questions is ', questions);
  // console.log('quizId is', quizId);
  for (let i = 0; i < questions.length; i++) {
    const answers = answerArr[i]
    const question = questions[i]
    // console.log(question);
    const params = [quizId, question];
    pool.query
    (`INSERT INTO quiz_question (quiz_id, question)
      VALUES ($1,$2)
      RETURNING *;`,
      params)
    .then((result) => {
      const questionId = result.rows[0].id;
      addKwizAnswers(quizId, questionId, answers);
    })
    .catch((err) => {
    console.log(err.message);
    });
  }
};


/**
 * add answers to an existing quiz questions
 * @param {quizId} Integer the list of questions
 * @param {quizQuestionsId} Integer
 * @param {answers} Array of Object a:{answer: 123, correct: true}, b:{answer:456, correct: false}
 * @return {Promise<{}>} A promise to the user.
 */
 const addKwizAnswers = (quizId,questionId,answerArr) => {
  for (let i = 0; i < answerArr.length; i++){
      const answer = answerArr[i]
      const params = [quizId, questionId, answer.correct, answer.answer, answer.option];
      pool.query
      (`INSERT INTO quiz_answers (quiz_id, quiz_question_id, correct, answer, answer_index)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *;`,
      params)
      .then((result) => {
      console.log(result.rows);
      return result.rows;
      })
      .catch((err) => {
      console.log(err.message);
      });
  }
};

const takeKwiz = (kwizId) => {
  const takeKwizParams =[kwizId];
  return pool
   .query(
     `SELECT quiz_question.id,quiz_question.question,quiz_answers.answer,quiz_answers.correct,quiz_answers.answer_index
      FROM quiz_question
      JOIN quiz_answers ON quiz_question_id = quiz_question.id
      WHERE quiz_answers.quiz_id = $1
      ORDER BY quiz_question.id, quiz_answers.answer_index;`,
      takeKwizParams
   )
   .then((result) => {
    //  console.log(result.rows);
     const starterQuestion = result.rows[0].id;
     const questionDelta = starterQuestion - 1;
     const questionDb = {};
     questionDb[kwizId] = {};
     for (let i = 0; i < result.rows.length; i++) {
       const questionId = result.rows[i].id;
       const questionNumber = questionId - questionDelta;
       if(!questionDb[kwizId].hasOwnProperty(questionNumber)){
        questionDb[kwizId][questionNumber] = {};
       }
       questionDb[kwizId][questionNumber][`q${questionNumber}`] = result.rows[i].question;
       questionDb[kwizId][questionNumber][`q${questionNumber}${result.rows[i].answer_index}`] = result.rows[i].answer;
       if(result.rows[i].correct){
         questionDb[kwizId][questionNumber].qans = `q${questionNumber}${result.rows[i].answer_index}`;
       }
      }
      // console.log(questionDb);
      return questionDb;
     })
   .catch((error) => console.log(error));
}

const showMyKwizzes = (userId) => {
  return pool
    .query(
      `SELECT id, title, description, url as imageurl, public
       FROM quiz
       WHERE creator_id = $1`,
      [userId])
    .then((result) => {
      console.log("quizzzzz", result.rows);
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const showPublicKwizzes = () => {
  return pool
    .query(
      `Select id, title, description, url as imageurl, public
       FROM quiz
       WHERE public = true;`)
    .then((result) => {
      //console.log("quizzzzz", result.rows);
      return result.rows;
     })
    .catch((err) => {
      console.log(err.message);
    });
};

const generateKwizResponse = (userId,kwizId,correctArr) => {
  const saveKwizResponse = `INSERT INTO quiz_take
                              (taker_id, quiz_id, quiz_answers_id)
                              VALUES ($1,$2,$3)
                              RETURNING *;`;
  const saveKwizResponseParams = [userId, kwizId, 1];
  pool.query(saveKwizResponse, saveKwizResponseParams)
      .then((result) => {
        let kwizTakeId = result.rows[0].id;
        generateKwizResult(userId, kwizTakeId,correctArr);
        //  console.log("saveKwizResponse called.");
        //  console.log(result);
  });
}

// const generateKwizResponse = (userId,kwizId,quizAnswers) = {
//   generateAnswerArr(userId,kwizId,quizAnswers)
//    .then()

// }

const generateKwizResult = (userId,kwizTakeId,correctArr) => {
  // taker_id,quiz_take_id,score,url
  const numCorrect = correctArr.filter((a) => a == true).length;
  const numTotal = correctArr.length;
  const score = Math.round(100* (numCorrect/numTotal));
  const url = `kwiz/result/${kwizTakeId}`;
  const writeKwizResultParams = [userId,kwizTakeId,score,url];
  const writeKwizResult = `INSERT INTO quiz_result
                          (taker_id, quiz_take_id,score,url)
                          VALUES ($1,$2,$3,$4)
                          RETURNING *;`;
  pool.query(writeKwizResult, writeKwizResultParams);
}



// const getKwizResult = (quizTakeId,) => {
//   const quizResultParams = [quizTakeId];
//   const q1 = `SELECT count(quiz_answers_id.*)
//               FROM quiz_take
//               WHERE quiz_take.id = $1;`;
//   const q2 = `SELECT count(quiz_answers_id.*)
//               FROM quiz_take
//               JOIN quiz_answers ON quiz_answers_id = quiz_answers.id
//               WHERE quiz_take.id = $1
//               AND quiz_answers.correct = true;`;
//   return Promise.all([pool.query(q1,quizResultParams), pool.query(q2,quizResultParamS)])
//                 .then((res) => {
//                   let result1 = res.rows[0][0];
//                   let result2 = res.rows[0][1];
//                   let score = result1/result2
//                   return score;
//                 })
//                 .catch((err) => {
//                 console.log(err);
//                 });
// };

// const addKwizResult = (userId, quizTakeId, score, url) => {
//   const kwizResultParams = {userId, quizTakeId,score,url};
//   return pool.query
//   (`INSERT INTO quiz_result (taker_id, quiz_take_id, score, url)
//    VALUES ($1, $2, $3, $4);`,
//   kwizResultParams)
//   .then((result) => {
//     //console.log(result.rows);
//     return result.rows;
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// };

// const showKwizResult = (kwizTakeId) => {

// }
module.exports.addUser = addUser;
module.exports.getAllUser = getAllUser;
module.exports.getUserWithEmail = getUserWithEmail;
module.exports.getUserWithId = getUserWithId;
module.exports.showMyKwizzes = showMyKwizzes;
module.exports.showPublicKwizzes = showPublicKwizzes;
module.exports.addKwiz = addKwiz;
module.exports.addKwizQuestions = addKwizQuestions;
module.exports.addKwizAnswers = addKwizAnswers;
module.exports.takeKwiz = takeKwiz;
module.exports.generateKwizResponse = generateKwizResponse;
module.exports.generateKwizResult = generateKwizResult;
// module.exports.showKwizResult = showKwizResult;

//generateKwizResponse with the answers chosen - leave as a stretch to work on
// const generateKwizResponse = (userId,kwizId,quizAnswers) => {
//   [q1B, q2A, q3D, q4A] => [100,123,143,150, 160]
//   [true,false,true,true]
//   let answersChosen = [];
//   for (let answer of quizAnswers) {
//     const index = answer[answer.length - 1];
//     const questionNumber = answer.slice(1,-1);
//     console.log(questionNumber);
//     const getQuestionId =  `SELECT quiz_question.id as questionId
//                           FROM quiz_question
//                           WHERE quiz_id = $1
//                           LIMIT 1 OFFSET $2;
//                           `;
//     let getQuestionIdParams;
//     if (questionNumber == 1) {
//       getQuestionIdParams = [kwizId,0];
//     } else{
//       getQuestionIdParams = [kwizId, questionNumber - 1];
//     }
//     const getAnswerId = `SELECT quiz_answers.id as answerId
//                          FROM quiz_answers
//                          WHERE quiz_question_id = $1
//                          AND answer_index = $2;
//                          `;
//     pool.query (getQuestionId, getQuestionIdParams)
//        .then((result) => {
//           // console.log('getQuestionId result is', result);
//           const questionId = result.rows[0].questionid;
//           const getAnswerIdParams = [questionId, index];
//           // console.log('questionId is', questionId);
//           pool.query(getAnswerId, getAnswerIdParams)
//            .then((result) => {
//             //  console.log('result for getAnswerId is', result);
//              const answerId = result.rows[0].answerid;
//              answersChosen.push(answerId);
//              console.log(answersChosen);
//             //  console.log("getAnswerId query succeeded.");
//            })
//        });
//   }
//   console.log('answersChosen is',answersChosen);
//   const saveKwizResponse = `INSERT INTO quiz_take
//                               (taker_id, quiz_id, quiz_answers_id)
//                               VALUES ($1,$2,$3)
//                               RETURNING *;`;
//   const saveKwizResponseParams = [userId, kwizId, answersChosen];
//   pool.query(saveKwizResponse, saveKwizResponseParams)
//       .then((result) => {
//         return result;
//         //  console.log("saveKwizResponse called.");
//         //  console.log(result);
//         });
// }
