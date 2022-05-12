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

// Mount all resource routes
// Note: Feel free to replace the example routes below with your own
app.use("/users", usersRoutes(db));
app.use("/widgets", widgetsRoutes(db));
app.use("/kwiz", quizRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
app.get("/", (req, res) => {
  db.getUserWithId(req.cookies.id)
    .then((user) => {
      if (user) {
        res.redirect('/kwiz/publickwizes');
      }
      if (!user) {
        const templateVars = { user: user };
        res.render("index", templateVars);
      }
    });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
