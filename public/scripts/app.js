/* eslint-disable no-undef */
// Client facing scripts here

$(document).ready(() => {

  const database = [
    {
      title: 'CANADA',
      description: 'Oh Canada! 🇨🇦',
      imageurl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJFZ65LwsawfGT8XIQrWoCg-6inXNiMkopHQ&usqp=CAU'
    },
    {
      title: 'USA',
      description: 'You know everything about america? Find out!',
      imageurl: 'https://images.unsplash.com/photo-1628510118714-d2124aea4b8a?ixlib=rb-1.2.1&q=80&fm=jpg&crop=entropy&cs=tinysrgb&w=1080&fit=max'
    }
  ];

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

  const renderCards = (database) => {
    for (const kwiz of database) {
      console.log('WORKS');
      $('#kwizcontainer').append(createCard(kwiz));
    }
  };

  console.log('WORKING!!!!!!')
  renderCards(database);

});
