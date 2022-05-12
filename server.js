// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3000;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const db = require("./lib/db.js");

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Load the logger first so all (static) HTTP requests are logged to STDOUT
// 'dev' = Concise output colored by response status for development use.
//         The :status token will be colored red for server error codes, yellow for client error codes, cyan for redirection codes, and uncolored for all other codes.
app.use(morgan("dev"));

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

app.use(
  "/styles",
  sassMiddleware({
    source: __dirname + "/styles",
    destination: __dirname + "/public/styles",
    isSass: false, // false => scss, true => sass
  })
);

app.use(express.static("public"));

// Separated Routes for each Resource
// Note: Feel free to replace the example routes below with your own
const usersRoutes = require("./routes/users");
const widgetsRoutes = require("./routes/widgets");
const quizRoutes = require("./routes/quiz");
const { reset } = require("nodemon");

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/widgets", widgetsRoutes(db));
app.use("/kwiz", quizRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  db.getUserWithId(req.cookies.id)
    .then((user) => {
      if (user) {
        res.redirect('/publickwizes');
      }
      if (!user) {
        const templateVars = { user: user };
        res.render("index", templateVars);
      }
    });
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/ NEW ADDED EJS ROUTES \/\/\/\/\/\/\/\/\/\/\/\/\/\/

app.get("/mykwizes", (req, res) => {
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
          const templateVars = { user: user, db: data[0], count: data[1].count, score: data[2].score, public: false };
          res.render("index", templateVars);
        });
    });
});

app.get("/publickwizes", (req, res) => {
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
          const templateVars = { user: user, db: data[0], count: data[1].count, score: data[2].score, public: true };
          res.render("index", templateVars);
        });
    });
});

app.get("/createkwiz", (req, res) => {
  if (!req.cookies.id) {
    res.redirect('/');
  }
  db.getUserWithId(req.cookies.id)
    .then((data) => {
      const templateVars = { user: data };
      res.render("createkwiz", templateVars);
    });
});

app.post("/createkwiz/questions", (req, res) => {
  res.send(req.body);
});

app.post("/results", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// app.get("/results", (req, res) => {
//   db.getUserWithId(req.cookies.id)
//     .then((data) => {
//       const kwizId = req.params.id;
//       const templateVars = { user: data, db: questionsDb[1], answers: userAnswers, correctAns: correct };
//       res.render("results", templateVars);
//     });
// });

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/ NEW ADDED EJS ROUTES \/\/\/\/\/\/\/\/\/\/\/\/\/\/

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
