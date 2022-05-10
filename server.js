// load .env data into process.env
require("dotenv").config();

// Web server config
const PORT = process.env.PORT || 3000;
const sassMiddleware = require("./lib/sass-middleware");
const express = require("express");
cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const app = express();
const morgan = require("morgan");

// PG database client/connection setup
const db = require("./lib/db.js");

app.use(cookieParser());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ---------------------------------------------------------------------------
const database = [
  {
    title: 'CANADA',
    description: 'Oh Canada! 🇨🇦',
    imageurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFZ65LwsawfGT8XIQrWoCg-6inXNiMkopHQ&usqp=CAU',
    public: true
  },
  {
    title: 'USA',
    description: 'You know everything about america? Find out!',
    imageurl: 'https://images.unsplash.com/photo-1628510118714-d2124aea4b8a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max',
    public: true
  },
  {
    title: 'TORONTO',
    description: 'How much you know about the 6ix?',
    imageurl: 'https://blogdointercambio.west1.com.br/wp-content/uploads/2019/01/268152-toronto-principais-pontos-turisticos-atracoes-e-custo-de-vida-1024x683.jpg',
    public: true
  },
  {
    title: 'TECHNOLOGY',
    description: `Are you a technophile? Let's see!`,
    imageurl: 'https://greatpeopleinside.com/wp-content/uploads/2017/05/HR-GR8-technology.jpg',
    public: false
  },
  {
    title: 'MARVEL',
    description: 'Love Spider-man and company? Test your knowledge!',
    imageurl: 'https://d5y9g7a5.rocketcdn.me/wp-content/uploads/2020/06/marvel-a-historia-da-editora-nos-quadrinhos-e-no-cinema-1024x512.jpg',
    public: false
  },
  {
    title: 'DC',
    description: 'Are you a gamemanic? See if you know everything about videogames!',
    imageurl: 'https://files.tecnoblog.net/wp-content/uploads/2020/06/spotify-dc-comics-warner-700x513.jpg',
    public: false
  },
  {
    title: 'GAMES',
    description: 'Batman, Superman, and the Justice League!',
    imageurl: 'https://thumbs2.imgbox.com/2d/46/Ba6012x0_t.jpg',
    public: false
  },
];
// ---------------------------------------------------------------------------

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
app.use("/quiz", quizRoutes(db));
// Note: mount other resources here, using the same pattern above

// Home page
// Warning: avoid creating more routes in this file!
// Separate them into separate routes files (see above).

app.get("/", (req, res) => {
  db.getUserWithId(req.cookies.id)
    .then((data) => {
      const templateVars = { user: data, db: database, public: false };
      res.render("index", templateVars);
    });
});

// \/\/\/\/\/\/\/\/\/\/\/\/\/\/ NEW ADDED EJS ROUTES \/\/\/\/\/\/\/\/\/\/\/\/\/\/

app.get("/mykwizes", (req, res) => {
  db.getUserWithId(req.cookies.id)
    .then((data) => {
      const templateVars = { user: data, db: database, public: false };
      res.render("index", templateVars);
    });
});

app.get("/publickwizes", (req, res) => {
  db.getUserWithId(req.cookies.id)
    .then((data) => {
      const templateVars = { user: data, db: database, public: true };
      res.render("index", templateVars);
    });
});

app.get("/createkwiz", (req, res) => {
  db.getUserWithId(req.cookies.id)
    .then((data) => {
      const templateVars = { user: data };
      res.render("createkwiz", templateVars);
    });
});

app.post("/createkwiz/questions", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});
// \/\/\/\/\/\/\/\/\/\/\/\/\/\/ NEW ADDED EJS ROUTES \/\/\/\/\/\/\/\/\/\/\/\/\/\/

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`);
});
