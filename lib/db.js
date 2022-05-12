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
const { resourceLimits } = require("worker_threads");
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
};

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
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const getAllUser = function() {
  return pool.query(`SELECT * FROM users;`)
    .then(data => {
      const users = data.rows;
      return users;
    })
    .catch(err => {
    });
};

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
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Logged in user can create a Kwiz
 * @param {object} Kwiz the Kwiz object with creator_id, url, ispublic...as keys
 * @return {Promise<{}>} A promise to the user.
 */
const addKwiz = (kwiz) => {
  let createKwizParams = [kwiz.userId, kwiz.imageurl,kwiz.public,kwiz.title,kwiz.description];
  return pool.query(`INSERT INTO quiz (creator_id,url,public,title,description)
                    VALUES($1, $2, $3, $4, $5)
                    RETURNING *;`,
  createKwizParams)
    .then((result) => {
      kwiz.quizId = result.rows[0].id;
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * add questions to a created Kwiz skeleton
 * sequence: add Kwiz skeleton => add questions => add answers
 * @param {array} questions the list of questions
 * @param {integer} quizId the quizId from addKwiz
 * @param {array} answerArr the array of answer objects
 * @return {Promise<{}>} A promise to the user.
 */
const addKwizQuestions = (questions, quizId, answerArr) => {
  for (let i = 0; i < questions.length; i++) {
    const answers = answerArr[i];
    const question = questions[i];
    const params = [quizId, question];
    pool.query(`INSERT INTO quiz_question (quiz_id, question)
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
  for (let i = 0; i < answerArr.length; i++) {
    const answer = answerArr[i];
    const params = [quizId, questionId, answer.correct, answer.answer, answer.option];
    pool.query(`INSERT INTO quiz_answers (quiz_id, quiz_question_id, correct, answer, answer_index)
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

/**
 * get the whole quiz from database with the given quizId, then return an object to front-end for rendering
 * @param {kwizId} Integer the list of questions
 * @return {Promise<{}>} A promise to the user.
 */

const takeKwiz = (kwizId) => {
  const takeKwizParams = [kwizId];
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
      const starterQuestion = result.rows[0].id;
      const questionDelta = starterQuestion - 1;
      const questionDb = {};
      questionDb[kwizId] = {};
      for (let i = 0; i < result.rows.length; i++) {
        const questionId = result.rows[i].id;
        const questionNumber = questionId - questionDelta;
        if (!questionDb[kwizId].hasOwnProperty(questionNumber)) {
          questionDb[kwizId][questionNumber] = {};
        }
        questionDb[kwizId][questionNumber][`q${questionNumber}`] = result.rows[i].question;
        questionDb[kwizId][questionNumber][`q${questionNumber}${result.rows[i].answer_index}`] = result.rows[i].answer;
        if (result.rows[i].correct) {
          questionDb[kwizId][questionNumber].qans = `q${questionNumber}${result.rows[i].answer_index}`;
        }
      }
      return questionDb;
    })
    .catch((error) => console.log(error));
};

/**
 * show all kwizzes created by the user given an userId
 * @param {kwizId} Integer the list of questions
 * @return {Promise<{}>} A promise to the user.
 */

const showMyKwizzes = (userId) => {
  return pool
    .query(
      `SELECT id, title, description, url as imageurl, public
       FROM quiz
       WHERE creator_id = $1`,
      [userId])
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * show all public kwizzes
 * @param NA the list of questions
 * @return {Promise<{}>} A promise to the user.
 */
const showPublicKwizzes = () => {
  return pool
    .query(
      `Select id, title, description, url as imageurl, public
       FROM quiz
       WHERE public = true;`)
    .then((result) => {
      return result.rows;
    })
    .catch((err) => {
      console.log(err.message);
    });
};

/**
 * Save the kwiz take record in the database when a user finishes a kwiz
 * @param {userId} Integer the userId of kwiz taker
 * @param {kwizId} Integer the unique id for the kwiz
 * @return {Promise<{}>} A promise to the user.
 */
const generateKwizResponse = (userId,kwizId,correctArr) => {
  const saveKwizResponse = `INSERT INTO quiz_take
                              (taker_id, quiz_id, quiz_answers_id)
                              VALUES ($1,$2,$3)
                              RETURNING *;`;
  const saveKwizResponseParams = [userId, kwizId, 1];
  return pool.query(saveKwizResponse, saveKwizResponseParams)
    .then((result) => {
      let kwizTakeId = result.rows[0].id;
      let send = generateKwizResult(userId, kwizTakeId, correctArr)
        .then((data) => {
          return data;
        });
      return send;
    });
};

/**
 * calculate the result of a quiz response. This function is nested within generateKwizResponse.
 * @param {userId} Integer the userId of kwiz taker
 * @param {kwizTakeId} Integer the unique id for the kwiz
 * @param {correctArr} Array an array of Boolean that indicates if the taker got the correct answer
 * @return {Promise<{}>} A promise to the user.
 */
const generateKwizResult = (userId,kwizTakeId,correctArr) => {
  const numCorrect = correctArr.filter(a => a === 'true').length;
  const numTotal = correctArr.length;
  const score = Math.round(100 * (numCorrect / numTotal));
  const url = `result/${kwizTakeId}`;
  const writeKwizResultParams = [userId,kwizTakeId,score,url];
  const writeKwizResult = `INSERT INTO quiz_result
                          (taker_id, quiz_take_id,score,url)
                          VALUES ($1,$2,$3,$4)
                          RETURNING *;`;
  return pool.query(writeKwizResult, writeKwizResultParams)
    .then((result) => {
      return result.rows;
    });
};

/**
 * get the kwiz take result from database given the unique kwiz take id
 * @param {quizTakeId} Integer the unique id for the kwiz take
 * @return {Promise<{}>} A promise to the user.
 */
const getKwizResult = (quizTakeId) => {
  const getQuizResultParams = [quizTakeId];
  const getQuizResult = `SELECT users.name as user, score, quiz.url, title, description, quiz.id as quiz_id
                         FROM quiz_result
                         JOIN users ON taker_id = users.id
                         JOIN quiz_take ON quiz_take_id = quiz_take.id
                         JOIN quiz ON quiz_take.quiz_id = quiz.id
                         WHERE quiz_take_id = $1;`;
  return pool.query(getQuizResult,getQuizResultParams)
    .then((res) => {
      return res.rows[0];
    });
};

/**
 * count the number of kwizzes I created. This number shows up on the user profile when logged in
 * @param {userId} Integer the unique user Id
 * @return {Promise<{}>} A promise to the user.
 */
const countMyKwiz = (userId) => {
  const countKwiz = `SELECT COUNT (quiz.*)
                     FROM quiz
                     WHERE creator_id = $1
                     `;
  const countKwizParams = [userId];
  return pool.query(countKwiz,countKwizParams)
    .then((result) => {
      console.log("count kwiz ", result.rows);
      return result.rows[0];
    });
};

/**
 * get the result of a user's latest attempt with the unique userId
 * @param {userId} Integer the unique user Id
 * @return {Promise<{}>} A promise to the user.
 */
const myLastKwiz = (userId) => {
  const showMyLastKwiz = `SELECT score
                          FROM quiz_result
                          WHERE taker_id= $1
                          ORDER BY quiz_result.id DESC
                          LIMIT 1`;
  const showMyLastKwizParams = [userId];
  return pool.query(showMyLastKwiz, showMyLastKwizParams)
    .then((result) => {
      console.log("last kwiz ", result.rows);
      return result.rows[0];
    });
};


module.exports = {
  addUser,
  getAllUser,
  getUserWithEmail,
  getUserWithId,
  showMyKwizzes,
  showPublicKwizzes,
  addKwiz,
  addKwizQuestions,
  addKwizAnswers,
  takeKwiz,
  generateKwizResponse,
  generateKwizResult,
  getKwizResult,
  countMyKwiz,
  myLastKwiz
};
