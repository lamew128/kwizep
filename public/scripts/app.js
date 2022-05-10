/* eslint-disable no-undef */
// Client facing scripts here

$(document).ready(() => {
  let num = 1;
  let kwizData;
  let questions;
  let answers = [];
  let correct = [];

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
    logOut()
      .then(() => {
        location.reload();
      });
  });

  $(document).on('click', '#register', (e) => {
    e.preventDefault();
    $('.container').empty().append(registerPage());
  });

  $(document).on('click', '#newquestion', (e) => {
    e.preventDefault();
    num++;
    $('#questionscontainer').append(question(num)).html();
  });

  $(document).on('click', '#deletequestion', (e) => {
    e.preventDefault();
    if (num === 1) {
      alert('You must have at least one question!');
    } else {
      $(`#question${n}`).remove();
      num--;
    }
  });

  $(document).on('submit', '#createkwizform', function (e) {
    e.preventDefault();
    const data = $(this).serialize();
    let submit = true;
    $('.formfield').each(function () {
      if ($(this).val() === '') {
        alert('You did not fill out one of the fields!');
        submit = false;
        return false;
      }
    });
    if (submit) {
      //inject createKwiz;
      createKwiz(data);
      n = 0;
    }
  });


  $(document).on('submit', '#login-form', function (e) {
    e.preventDefault();

    const data = $(this).serialize();
    //console.log("data", data);
    logIn(data)
      .then((data) => {
        if (data === "WRONG INFO") {
          $('.container').append("AAAAAAAAAAA").html();// ADD ERROR MESSAGE (SHOW)
          console.log("WRONG INFOOOOOOOOOOOOOOOOOOOO");
          return;
        }
        location.reload();
      });

  });

  $(document).on('submit', '#register-form', function (e) {
    e.preventDefault();

    const data = $(this).serialize();
    signUp(data)
      //.then(getMyDetails)
      .then((data) => {
        if (data === "EXIST") {
          $('.container').append("AAAAAAAAAAA").html();// ADD ERROR MESSAGE (SHOW)
          console.log("EXISTTTTTTTTTT");
          return;
        }
        location.reload();
      });
  });

  $(document).on('click', '.kwizbutton', function (e) {
    e.preventDefault();
    $.get(`${$(this).attr('href')}/questions`, (data) => {
      kwizId = $(this).attr('href');
      kwizData = data;
      questions = Object.keys(kwizData);
      qnum = 0;
      $('#questions').empty().append(kwizQuestion(kwizData, questions[qnum])).append(nextQuestionButton());
      qnum++;
    });
  });

  //HELPER FUNCTION
  const getObjKey = (obj, value, correct) => {
    const answer = Object.keys(obj).find(key => obj[key] === value);
    if (answer === correct) {
      return true;
    }
    return false;
  };

  $(document).on('click', '#nextbutton', function (e) {
    e.preventDefault();
    const correctAns = kwizData[qnum].qans;
    const answer = $("input:checked").val();
    const userCorrect = getObjKey(kwizData[qnum], answer, correctAns);

    if (!$("input:radio").is(":checked")) {
      alert('Nothing is checked!');
    } else {
      if (qnum === questions.length - 1) {
        correct.push(userCorrect);
        answers.push(answer);
        $('#questions').empty().append(kwizQuestion(kwizData, questions[qnum])).append(submitKwizButton());
      } else {
        correct.push(userCorrect);
        answers.push(answer);
        $('#questions').empty().append(kwizQuestion(kwizData, questions[qnum])).append(nextQuestionButton());
      }
      qnum++;
    }
  });

  $(document).on('submit', '#questions-form', function (e) {
    e.preventDefault();
    const correctAns = kwizData[qnum].qans;
    const answer = $("input:checked").val();
    const userCorrect = getObjKey(kwizData[qnum], answer, correctAns);
    correct.push(userCorrect);
    answers.push(answer);
    const results = { answers, correct };
    console.log(answers, correct);
    $.post('/results', results)
      .then(() => {
        window.location.href = '/results';
      });
  });

});
