/* eslint-disable no-undef */
// Client facing scripts here

$(document).ready(() => {

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

  $('#scroll-top').fadeOut();

  $(document).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $('#scroll-top').fadeIn();
    } else {
      $('#scroll-top').fadeOut();
    }
  });

  $('#scroll-top').on('click', () => {
    $(document).scrollTop(0);
  });

  const createCard = (kwiz) => {
    const kwizAppend = `
    <article class="col-lg-4 col-md-5 col-10">
      <div class="card kwizcard">
        <img src="${kwiz.imageurl}" class="card-img-top img-fluid" alt="quizimg">
          <div class="card-body">
            <h5 class="card-title">${kwiz.title} KWIZ</h5>
            <p class="card-text">${kwiz.description}</p>
            <a href="#" class="btn btn-primary">KWIZ!</a>
          </div>
      </div>
    </article>`;
    return kwizAppend;
  };

  const loginPage = () => {
    return `
      <form action="api/users/login" method="POST">
        <div class="mb-3">
          <label class="form-label">Email address</label>
          <input type="email" name="email" class="form-control" placeholder="Enter your e-mail">
        </div>
        <div class="mb-3">
          <label class="form-label">Password</label>
          <input type="password" name="password" class="form-control" placeholder="Password">
        </div>
        <button type="submit" class="btn btn-primary">Submit</button>
      </form>
      `;
  };

  const registerPage = () => {
    return `
    <form action="/register" method="POST">
      <div class="mb-3">
        <label class="form-label">Name</label>
        <input type="name" name="name" class="form-control" placeholder="Enter your name">
      </div>
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <input type="email" name="email" class="form-control" placeholder="Enter your e-mail">
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input type="password" name="password" class="form-control" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `;
  };

  const renderContainer = () => {
    return `
    <div class="row d-flex justify-content-center">

    <!-- PROFILE CARD -->
    <div class="col-md-3 col-10">
      <div class="row">
        <div class="col kwizcard profile rounded my-5 fixed">
          <div class="col">
            <div class="row d-flex justify-content-center">
            </div>
            <div class="profileinfo">
              <section class="row">
                <p class="h3 text-center">USERNAME</p>
              </section>
              <section class="row border rounded d-flex justify-content-center m-1">
                <h5 class="text-center my-0 p-0">LAST KWIZ RESULT:</h5>
                <hr class="w-75">
                <p class="text-center my-0 p-0">(WIN/LOSS)</p>
                <hr class="w-75">
                <p class="text-center my-0 p-0">8 out of 10</p>
              </section>
              <p class="py-3 m-0">Kwizes created: 3</p>
              <hr class="w-100">
              <p class="py-3 m-0">Kwizes participated: 8</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col">
          <div class="row d-flex justify-content-center mb-5">
            <a href="/createkwiz" id="createkwiz">
              <button class="pushable w-50">
                <span class="front">
                  Create new KWIZ!
                </span>
              </button>
            </a>
          </div>
          <div class="row" id="kwizcontainer">

          </div>
        </div>
  </div>
    `;
  };

  const renderCards = (database, public) => {
    for (const kwiz of database) {
      if (public === kwiz.public) {
        $('#kwizcontainer').append(createCard(kwiz));
      }
    }
  };

  $('#publickwizes').click((e) => {
    e.preventDefault();
    $('.container').empty().append(renderContainer());
    renderCards(database, true);
  });

  $('#mykwizes').click((e) => {
    e.preventDefault();
    $('.container').empty().append(renderContainer());
    renderCards(database, false);
  });

  $('#login').click((e) => {
    e.preventDefault();
    $('.container').empty().append(loginPage());
  });

  $('#register').click((e) => {
    e.preventDefault();
    $('.container').empty().append(registerPage());
  });

  const createKwiz = () => {
    return `
    <form action="/createkwiz" method="POST" id="subcreatekwiz">
        <div class="mb-3">
          <label class="form-label">Title</label>
          <input type="text" name="title" class="form-control" placeholder="Enter a title">
        </div>
        <div class="mb-3">
          <label class="form-label">Description</label>
          <input type="text" name="description" class="form-control" placeholder="Enter a description">
        </div>
        <div class="mb-3">
          <label class="form-label">Image</label>
          <input type="url" name="imageurl" accept="image/gif, image/jpg, image/jpeg" class="form-control"
            placeholder="Image URL">
        </div>
        <div class="mb-3">
          <label class="form-label">Private</label>
          <input type="checkbox" name="private" class="form-check-label">
        </div>
        <a href="/createkwiz/questions">
          <button type="submit" class="btn btn-primary">Submit</button>
        </a>
      </form>
    `;
  };

  const questionsForm = () => {
    return `
    <form action="/createkwiz/questions" method="POST" id="questionsform">

    <section class="questions">

    </section>

    <button type="button" class="btn btn-primary" id="newquestion">Create new question</button>
    <button type="submit" class="btn btn-primary">Submit</button>

    </form>`;
  };

  // ADD CORRECT ANSWER

  const questionN = (questionN) => {
    return `
        <div class="mb-3">
          <label class="form-label">Question ${questionN}</label>
          <input type="text" name="q${questionN}" class="form-control" placeholder="Enter a title">
        </div>
        <div class="mb-3">
          <label class="form-label">Answer A</label>
          <input type="text" name="q${questionN}a" class="form-control" placeholder="Enter a title">
        </div>
        <div class="mb-3">
          <label class="form-label">Answer B</label>
          <input type="text" name="q${questionN}b" class="form-control" placeholder="Enter a title">
        </div>
        <div class="mb-3">
          <label class="form-label">Answer C</label>
          <input type="text" name="q${questionN}c" class="form-control" placeholder="Enter a title">
        </div>
        <div class="mb-3">
          <label class="form-label">Answer D</label>
          <input type="text" name="q${questionN}d" class="form-control" placeholder="Enter a title">
        </div>
        <button type="button" class="btn btn-primary" id="deleteq${questionN}">Delete question</button>
      `;
  };

  $(document).on('click', '#createkwiz', (e) => {
    e.preventDefault();
    $('.container').empty().append(createKwiz());
  });

  let n = 1;
  $(document).on('submit', '#subcreatekwiz', function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $.post("/createkwiz", data)
      .then(() => console.log);
    $('.container').empty().append(questionsForm());
    $('.questions').append(questionN(n));
  });

  $(document).on('click', '#newquestion', (e) => {
    e.preventDefault();
    n++;
    $('.questions').append(questionN(n));
  });

  $(document).on('submit', '#questionsform', function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    $.post("/createkwiz/questions", data);
    n = 0;
  });

});
