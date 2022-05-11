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

const kwizQuestion = (data, id, question) => {
  const qnum = `q${question}`;
  return `
         <div class="mb-3">
            <label class="form-label">Question ${question} - ${data[id][question][qnum]}</label>
          </div>
          <div class="form-check">
          <label class="form-check-label" for="${data[id][question][`${qnum}a`]}">
            <input class="form-check-input" type="radio" name="${qnum}" id="${data[id][question][`${qnum}a`]}" value="${data[id][question][`${qnum}a`]}" required>
              <span>${data[id][question][`${qnum}a`]}</span>
            </label>
          </div>
          <div class="form-check">
          <label class="form-check-label" for="${data[id][question][`${qnum}b`]}">
            <input class="form-check-input" type="radio" name="${qnum}" id="${data[id][question][`${qnum}b`]}" value="${data[id][question][`${qnum}b`]}" required>
              <span>${data[id][question][`${qnum}b`]}</span>
            </label>
          </div>
          <div class="form-check">
          <label class="form-check-label" for="${data[id][question][`${qnum}c`]}">
            <input class="form-check-input" type="radio" name="${qnum}" id="${data[id][question][`${qnum}c`]}" value="${data[id][question][`${qnum}c`]}" required>
              <span>${data[id][question][`${qnum}c`]}</span>
            </label>
          </div>
          <div class="form-check">
          <label class="form-check-label" for="${data[id][question][`${qnum}d`]}">
            <input class="form-check-input" type="radio" name="${qnum}" id="${data[id][question][`${qnum}d`]}" value="${data[id][question][`${qnum}d`]}" required>
              <span>${data[id][question][`${qnum}d`]}</span>
            </label>
          </div>`;
};

const nextQuestionButton = () => {
  return `<button id="nextbutton">NEXT</button`;
};

const submitKwizButton = () => {
  return `<button type="submit">SUBMIT</button`;
};

