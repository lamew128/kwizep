// const properties = require('./json/properties.json');
// const users = require('./json/users.json');
const { url } = require('inspector');
const { Pool } = require('pg');
const pool = new Pool({
  user: 'labber',
  password: 'labber',
  host: 'localhost',
  database: 'midterm'
});
pool.query(`SELECT title FROM properties LIMIT 10;`).then(response => {console.log(response)})

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
      console.log(result.rows[0]);
      return result.rows[0];
    })
    .catch((err) => {
      console.log(err.message);
    });
}
exports.getUserWithEmail = getUserWithEmail;

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


// const showMyKwiz = (creatorId)=> {
//   return pool.query
//   (`SELECT * FROM `)
// }

//   return pool.query(`SELECT * FROM users WHERE email = $1`,[email])
//     .then((result) => {
//       console.log(result.rows);
//       return result.rows[0];
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
// const getUserWithEmail = (email) => {
//   return pool.query(`SELECT * FROM users WHERE email = $1`,[email])
//     .then((result) => {
//       console.log(result.rows);
//       return result.rows[0];
//     })
//     .catch((err) => {
//       console.log(err.message);
//     });
//   // let user;
//   // for (const userId in users) {
//   //   user = users[userId];
//   //   if (user.email.toLowerCase() === email.toLowerCase()) {
//   //     break;
//   //   } else {
//   //     user = null;
//   //   }
//   }
// //   return Promise.resolve(user);
// // }
// exports.getUserWithEmail = getUserWithEmail;

// /**
//  * Get a single user from the database given their id.
//  * @param {string} id The id of the user.
//  * @return {Promise<{}>} A promise to the user.
//  */
// const getUserWithId = function(id) {
//   return pool.query(`SELECT * FROM users WHERE id = $1`,[id])
//   .then((result) => {
//     console.log(result.rows);
//     return result.rows[0];
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
// }
// exports.getUserWithId = getUserWithId;


// /**
//  * Add a new user to the database.
//  * @param {{name: string, password: string, email: string}} user
//  * @return {Promise<{}>} A promise to the user.
//  */
// const addUser =  (user) => {
//   return pool.query(`INSERT INTO users (name,email,password)
//   VALUES ($1 ,$2, $3) RETURNING *;`,[user.name,user.email,user.password])
//   .then((result) => {
//     console.log(result.rows);
//     return result.rows;
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });
//   // const userId = Object.keys(users).length + 1;
//   // user.id = userId;
//   // users[userId] = user;
//   // return Promise.resolve(user);
// }
// exports.addUser = addUser;

// /// Reservations

// /**
//  * Get all reservations for a single user.
//  * @param {string} guest_id The id of the user.
//  * @return {Promise<[{}]>} A promise to the reservations.
//  */
// const getAllReservations = function(guest_id, limit = 10) {
//   return pool.query(
//     `SELECT reservations.*, properties.* , AVG(rating) as average_rating FROM properties JOIN reservations ON properties.id = property_id JOIN property_reviews ON properties.id = property_reviews.property_id WHERE reservations.guest_id = $1 GROUP BY reservations.id, properties.id LIMIT $2;`
//     ,[guest_id, limit])
//   .then((result) => {
//     console.log(result.rows);
//     return result.rows;
//   })
//   .catch((err) => {
//     console.log(err.message);
//   });

// }
// exports.getAllReservations = getAllReservations;

// /// Properties

// /**
//  * Get all properties.
//  * @param {{}} options An object containing query options.
//  * @param {*} limit The number of results to return.
//  * @return {Promise<[{}]>}  A promise to the properties.
//  */
// const getAllProperties = (options, limit = 10) => {
//   const queryParams = [];
//   // 2
//   let queryString = `
//   SELECT properties.*, avg(property_reviews.rating) as average_rating
//   FROM properties
//   JOIN property_reviews ON properties.id = property_id
//   `;

//   // 3
//   if (options.city) {
//     queryParams.push(`%${options.city}%`);
//     queryString += `WHERE city LIKE $${queryParams.length} `;
//   }

//   if(options.owner_id) {
//     queryParams.push(owner_id);
//     if (queryParams.length == 1) {
//       queryString += `WHERE owner_id = $${queryParams.length}`;
//     } else {
//       queryString += `AND owner_id = $${queryParams.length} `;
//     }
//   }

//   if(options.minimum_price_per_night) {
//     queryParams.push(options.minimum_price_per_night);
//     if (queryParams.length == 1) {
//       queryString += `WHERE properties.cost_per_night >= $${queryParams.length}`;
//     } else {
//       queryString += `AND properties.cost_per_night >= $${queryParams.length}`;
//     }

//   }

//   if (options.maximum_price_per_night) {
//     queryParams.push(options.maximum_price_per_night);
//     if (queryParams.length == 1) {
//       queryString += `WHERE properties.cost_per_night <= $${queryParams.length}`;
//     } else {
//       queryString += `AND properties.cost_per_night <= $${queryParams.length}`;
//     }
//   }

//   if (options.minimum_rating) {
//     queryParams.push(options.minimum_rating);
//     queryString += `GROUP BY properties.id HAVING avg(property_reviews.rating) >= $${queryParams.length}`;
//   }
//   // 4
//   queryParams.push(limit);
//   queryString += `
//   ORDER BY cost_per_night
//   LIMIT $${queryParams.length};
//   `;

//   // 5
//   console.log(queryString, queryParams);

//   // 6
//   return pool.query(queryString, queryParams).then((res) => res.rows);
// }
// exports.getAllProperties = getAllProperties;


// /**
//  * Add a property to the database
//  * @param {{}} property An object containing all of the property details.
//  * @return {Promise<{}>} A promise to the property.
//  */
// const addProperty = function(property) {
//   const propertyId = Object.keys(properties).length + 1;
//   property.id = propertyId;
//   properties[propertyId] = property;
//   return Promise.resolve(property);
// }
// exports.addProperty = addProperty;
// quiz: {quiz_id : 1
//        url: www.google.com
//        public: true
//        questions: [{questions_id:1,
//                     questions_answers: {a:{answer:4,correct:true},
//                                         b:{answer:3,correct:false}
//                                       }
//                    }
//                   ]
//       }
