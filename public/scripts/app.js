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
      description: 'ove Spider-man and company? Test your knowledge!',
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

  $(document).scroll(function() {
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
    const kwizAppend =
      `<article class="col-lg-4 col-md-5 col-10">
              <div class="card kwizcard">
                <img
                  src="${kwiz.imageurl}"
                  class="card-img-top img-fluid" alt="quizimg">
                <div class="card-body">
                  <h5 class="card-title">${kwiz.title} KWIZ</h5>
                  <p class="card-text">${kwiz.description}</p>
                  <a href="#" class="btn btn-primary">KWIZ!</a>
                </div>
              </div>
            </article>`;
    return kwizAppend;
  };

  const renderCardsPublic = (database) => {
    for (const kwiz of database) {
      if (kwiz.public) {
        $('#kwizcontainer').append(createCard(kwiz));
      }
    }
  };

  const renderCardsPrivate = (database) => {
    for (const kwiz of database) {
      if (!kwiz.public) {
        $('#kwizcontainer').append(createCard(kwiz));
      }
    }
  };

  $('#publickwizes').click((e) => {
    e.preventDefault();
    $('#kwizcontainer').empty();
    renderCardsPublic(database);
  });

  $('#mykwizes').click((e) => {
    e.preventDefault();
    $('#kwizcontainer').empty();
    renderCardsPrivate(database);
  });



});
