//ADD FLOATING LABELS (BOOTSTRAP)

const loginPage = () => {
  return `
    <form id="login-form">
      <div class="mb-3">
        <label class="form-label">Email address</label>
        <input id='email' type="email" name="email" class="form-control" placeholder="Enter your e-mail">
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input id='password' type="password" name="password" class="form-control" placeholder="Password">
      </div>
      <button type="submit" class="btn btn-primary">Submit</button>
    </form>
    `;
};

const registerPage = () => {
  return `
  <form id="register-form">
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

const question = (num) => {
  return `
  <section id="question${num}">
  <div class="form-floating mb-3">
    <input type="text" name="q1" class="form-control formfield" id="floatingInput" placeholder="Question 1">
    <label for="floatingInput">Question ${num} (select the correct answer below)</label>
  </div>
  <div class="mb-3">
    <label class="form-label">Answer A</label>
    <input type="radio" name="q${num}ans" value="q${num}a" required> <input type="text" name="q${num}a"
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
  <div class="mb-5">
    <label class="form-label">Answer D</label>
    <input type="radio" name="q${num}ans" value="q${num}d"><input type="text" name="q${num}d"
      class="form-control formfield">
  </div>
</section>`;
};

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

const kwizQuestion = (data, question) => {
  const qnum = `q${question}`;
  return `
         <div class="mb-3">
            <label class="form-label">Question ${question} - ${data[question][qnum]}</label>
          </div>
          <div class="form-check">
          <label class="form-check-label" for="${data[question][`${qnum}a`]}">
            <input class="form-check-input" type="radio" name="${qnum}" id="${data[question][`${qnum}a`]}" value="${data[question][`${qnum}a`]}" required>
              <span>${data[question][`${qnum}a`]}</span>
            </label>
          </div>
          <div class="form-check">
          <label class="form-check-label" for="${data[question][`${qnum}b`]}">
            <input class="form-check-input" type="radio" name="${qnum}" id="${data[question][`${qnum}b`]}" value="${data[question][`${qnum}b`]}" required>
              <span>${data[question][`${qnum}b`]}</span>
            </label>
          </div>
          <div class="form-check">
          <label class="form-check-label" for="${data[question][`${qnum}c`]}">
            <input class="form-check-input" type="radio" name="${qnum}" id="${data[question][`${qnum}c`]}" value="${data[question][`${qnum}c`]}" required>
              <span>${data[question][`${qnum}c`]}</span>
            </label>
          </div>
          <div class="form-check">
          <label class="form-check-label" for="${data[question][`${qnum}d`]}">
            <input class="form-check-input" type="radio" name="${qnum}" id="${data[question][`${qnum}d`]}" value="${data[question][`${qnum}d`]}" required>
              <span>${data[question][`${qnum}d`]}</span>
            </label>
          </div>`;
};

const nextQuestionButton = () => {
  return `
  <button id="nextbutton">
  <span>Next Question!</span>
  <svg width="34" height="34" viewBox="0 0 74 74" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="37" cy="37" r="35.5" stroke="black" stroke-width="3"></circle>
    <path d="M25 35.5C24.1716 35.5 23.5 36.1716 23.5 37C23.5 37.8284 24.1716 38.5 25 38.5V35.5ZM49.0607 38.0607C49.6464 37.4749 49.6464 36.5251 49.0607 35.9393L39.5147 26.3934C38.9289 25.8076 37.9792 25.8076 37.3934 26.3934C36.8076 26.9792 36.8076 27.9289 37.3934 28.5147L45.8787 37L37.3934 45.4853C36.8076 46.0711 36.8076 47.0208 37.3934 47.6066C37.9792 48.1924 38.9289 48.1924 39.5147 47.6066L49.0607 38.0607ZM25 38.5L48 38.5V35.5L25 35.5V38.5Z" fill="black"></path>
  </svg>
  </button>`;

  // `<button id="nextbutton">NEXT</button`;
};

const submitKwizButton = () => {
  return `<button type="submit">SUBMIT</button`;
};

