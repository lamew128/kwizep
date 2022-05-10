/* eslint-disable no-undef */
// Client facing scripts here

$(document).ready(() => {

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

  $(document).on('click', '#login', (e) => {
    e.preventDefault();
    $('.container').empty().append(loginPage());
  });

  $(document).on('click', '#logout', (e) => {
    e.preventDefault();
    logOut();
  });

  $(document).on('click', '#register', (e) => {
    e.preventDefault();
    $('.container').empty().append(registerPage());
  });

  const question = (num) => {
    return `<section id="question${num}">
    <div class="mb-3">
      <label class="form-label">Question ${num} (select the correct answer)</label>
      <input type="text" name="q1" class="form-control formfield" placeholder="Enter a title">
    </div>
    <div class="mb-3">
      <label class="form-label">Answer A</label>
      <input type="radio" name="q${num}ans" value="q${num}a"> <input type="text" name="q${num}a"
        class="form-control formfield">
    </div>
    <div class="mb-3">
      <label class="form-label">Answer B</label>
      <input type="radio" name="q${num}ans" value="q${num}b"><input type="text" name="q${num}b"
        class="form-control formfield">
    </div>
    <div class="mb-3">
      <label class="form-label">Answer C</label>
      <input type="radio" name="q${num}ans" value="q${num}c"><input type="text" name="q${num}c"
        class="form-control formfield">
    </div>
    <div class="mb-3">
      <label class="form-label">Answer D</label>
      <input type="radio" name="q${num}ans" value="q${num}d"><input type="text" name="q${num}d"
        class="form-control formfield">
    </div>
  </section>`;
  };

  let n = 0;
  $(document).on('click', '#newquestion', (e) => {
    e.preventDefault();
    n++;
    $('#questionscontainer').append(question(n)).html();
  });

  $(document).on('click', '#deletequestion', (e) => {
    e.preventDefault();
    console.log(n);
    $(`#question${n}`).remove();
    n === 0 ? n : n--;
  });

  const card = (data) => {
    return `
    <article class="col-lg-4 col-md-5 col-10">
      <div class="card kwizcard">
        <img src="${data.imageurl} KWIZ" class="card-img-top img-fluid" alt="quizimg">
          <div class="card-body">
            <h5 class="card-title">${data.title}</h5>
            <p class="card-text">${data.description}</p>
            <a href="#" class="btn btn-primary">KWIZ!</a>
          </div>
      </div>
    </article>`;
  };

  $(document).on('submit', '#questionsform', function(e) {
    e.preventDefault();
    const data = $(this).serialize();
    if ($.trim($("#title, #description", "#image").val()) === "") {
      alert('you did not fill out one of the fields');
      return;
    }
    $.post("/createkwiz/questions", data)
      .then((res) => {
        $('.container').empty().append(card(res));
      });
    n = 0;
  });

  $(document).on('submit', '#login-form', function(e) {
    e.preventDefault();

    const data = $(this).serialize();
    //console.log("data", data);
    logIn(data)
      .then((json) => {
        console.log("json", json);
        if (!json.user) {
          console.log('fail');
          return;
        }
        console.log("json.user", json.user);
        //header.update(json.user);
        //views_manager.show('listings');
      });
  });

  $(document).on('submit', '#register-form', function (e) {
    e.preventDefault();

    const data = $(this).serialize();
    signUp(data)
      .then((json) => {
        console.log("json.user", json.user);
        //header.update(json.user);
        //views_manager.show('listings');
      });
  });

});
