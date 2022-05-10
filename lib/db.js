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

const { count } = require("console");
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
      console.log(result.rows[0]);
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
const createKwiz = (kwiz) => {
  let createKwizParams = [kwiz.creatorId, kwiz.url,kwiz.public,kwiz.title,kwiz.description];
  return pool.query
  (`INSERT INTO quiz (creator_id,url,public,title,description)
   VALUES ($1, $2, $3, $4, $5);`,
  createKwizParams)
  .then((result) => {
    //console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
}

/**
 * add questions to a created Kwiz skeleton
 * @param {array} questions the list of questions
 * @param {integer} quizId the quizId
 * @return {Promise<{}>} A promise to the user.
 */
const addKwizQuestions = (questions, quizId) => {
  for (let question of questions) {
    let KwizQuestionsParams = [quizId, question];
    return pool.query
    (`INSERT INTO quiz_question (quiz_id, question)
      VALUES ($1,$2);`,
    KwizQuestionsParams)
    .then((result) => {
      //console.log(result.rows);
    return result.rows;
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
 const addKwizAnswers = (quizId, quizQuestionId,answers) => {
  for (let answer of answers) {
    for (let option in answer) {
      let KwizAnswerParams = [quizId, quizQuestionId, answer[option].correct, answer[option].answer,option];
      return pool.query
      (`INSERT INTO quiz_answers (quiz_id, quiz_question_id, correct, answer, answer_index)
      VALUES ($1,$2,$3,$4,$5);`,
      KwizAnswersParams)
      .then((result) => {
      //console.log(result.rows);
      return result.rows;
      })
      .catch((err) => {
      console.log(err.message);
      });
    }
  }
};

const showMyKwizzes = (userId) => {
  let myKwizzParams = [userId];
  return pool
    .query(
      `SELECT *
       FROM quiz
       JOIN quiz_question ON quiz.id = quiz_question.quiz_id
       WHERE creator_id = $1;
       GROUP BY quiz.id
       HAVING count(quiz_question.*) > 0`,
      [myKwizzParams])
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
};

const showPublicKwizzes = () => {
  return pool
    .query(
      `Select * FROM quiz
       WHERE public = true;`)
    .then((result) => {
      console.log(result.rows[0]);
      return result.rows[0];
     })
    .catch((err) => {
      console.log(err.message);
    });
};

const generateKwizResponse = (userId,quizId,quizAnswers) => {
  for (let answer of quizAnswers) {
    let kwizResponseParams = [userId, quizId, answer];
    return pool
      .query
       (`INSERT INTO quiz_take (taker_id, quiz_id, quiz_answers_id)
         VALUES ($1,$2,$3);`,
      kwizResponseParams)
      .then((result) => {
      //console.log(result.rows);
      return result.rows;
      })
      .catch((err) => {
      console.log(err.message);
      });
  }
};

const calculateKwizResult = (quizTakeId) => {
  const quizResultParams = [quizTakeId];
  const q1 = `SELECT count(quiz_answers_id.*)
              FROM quiz_take
              WHERE quiz_take.id = $1;`;
  const q2 = `SELECT count(quiz_answers_id.*)
              FROM quiz_take
              JOIN quiz_answers ON quiz_answers_id = quiz_answers.id
              WHERE quiz_take.id = $1
              AND quiz_answers.correct = true;`;
  return Promise.all([pool.query(q1,quizResultParams), pool.query(q2,quizResultParamS)])
                .then((res) => {
                  let result1 = res.rows[0][0];
                  let result2 = res.rows[0][1];
                  let score = result1/result2
                  return score;
                })
                .catch((err) => {
                console.log(err);
                });
};

const addKwizResult = (userId, quizTakeId, score, url) => {
  const kwizResultParams = {userId, quizTakeId,score,url};
  return pool.query
  (`INSERT INTO quiz_result (taker_id, quiz_take_id, score, url)
   VALUES ($1, $2, $3, $4);`,
  kwizResultParams)
  .then((result) => {
    //console.log(result.rows);
    return result.rows;
  })
  .catch((err) => {
    console.log(err.message);
  });
};

module.exports.addUser = addUser;
module.exports.getAllUser = getAllUser;
module.exports.getUserWithEmail = getUserWithEmail;
module.exports.getUserWithId = getUserWithId;
