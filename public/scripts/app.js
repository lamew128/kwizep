/* eslint-disable no-undef */
// Client facing scripts here
let user;

$(document).ready(() => {

  $('body').prepend(navbar(user));

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

  const renderCards = (database, public) => {
    for (const kwiz of database) {
      if (public === kwiz.public) {
        $('#kwizcontainer').append(createCard(kwiz));
      }
    }
  };

  $(document).on('click', '#publickwizes', (e) => {
    e.preventDefault();
    $('.container').empty().append(renderContainer(user));
    renderCards(database, true);
  });

  $(document).on('click', '#mykwizes', (e) => {
    e.preventDefault();
    $('.container').empty().append(renderContainer(user));
    renderCards(database, false);
  });

  $(document).on('click', '#login', (e) => {
    e.preventDefault();
    $('.container').empty().append(loginPage());
  });

  $(document).on('click', '#logout', (e) => {
    e.preventDefault();
    logOut()
      .then(() => user = null)
      .then(() => $('.container').empty().append(renderContainer(user)))
      .then(() => $('nav').remove())
      .then(() => $('body').prepend(navbar(user)));
  });

  $(document).on('click', '#register', (e) => {
    e.preventDefault();
    $('.container').empty().append(registerPage());
  });

  $(document).on('click', '#createkwiz', (e) => {
    e.preventDefault();
    $('.container').empty().append(createKwiz(user));
  });


  $(document).on('submit', '#subcreatekwiz', function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    console.log(data);

    $.post("/createkwiz", data);
    $('.container').empty().append(questionsForm());
    $('.questions').append(questionN(n));
  });

  let n = 1;
  $(document).on('click', '#newquestion', (e) => {
    e.preventDefault();
    n++;
    $('.questions').append(questionN(n));
  });

  $(document).on('click', '#deletequestion', (e) => {
    e.preventDefault();
    $(`#question${n}`).remove();
    n--;
  });

  $(document).on('submit', '#questionsform', function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    console.log(data);
    $.post("/createkwiz/questions", data);
    $('.container').empty().append(createCard(card));
    n = 0;
  });

  $(document).on('submit', '#login-form', function (e) {
    e.preventDefault();

    const data = $(this).serialize();
    //console.log("data", data);
    logIn(data)
      .then(json => {
        console.log("json", json);
        if (!json.user) {
          console.log('fail');
          return;
        }
        console.log("json.user", json.user);
        user = json.user;
        $('.container').empty().append(renderContainer(user));
        $('nav').remove();
        $('body').prepend(navbar(user));
        //header.update(json.user);
        //views_manager.show('listings');
      });
  });

  $(document).on('submit', '#register-form', function (e) {
    e.preventDefault();

    const data = $(this).serialize();
    signUp(data)
      //.then(getMyDetails)
      .then((json) => {
        console.log("json.user", json.user);
        user = json.user;
        $('.container').empty().append(renderContainer(user));
        $('nav').remove();
        $('body').prepend(navbar(user));
        //header.update(json.user);
        //views_manager.show('listings');
      });
  });

});
