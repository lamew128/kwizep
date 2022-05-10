
//IF THERE IS COOKIE
// const navbar = (user) => {
//   if (user) {
//     return `
//     <nav class="navbar navbar-expand-md navbar-dark fixed-top">
//       <div class="container-fluid">
//         <a class="navbar-brand" href="/"><img src="" alt="logo" width="auto" height="20px"></a>
//         <button class="navbar-toggler p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//           aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon buttoncolor rounded"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarNav">
//           <ul class="navbar-nav">
//             <li class="nav-item">
//               <a class="nav-link" id="mykwizes" href="/mykwizes">My Kwizes</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" id="publickwizes" href="/publickwizes">Kwizes Listing</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" id="logout">LOGOUT</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>`;
//   } else {
//     return `
//     <nav class="navbar navbar-expand-md navbar-dark fixed-top">
//       <div class="container-fluid">
//         <a class="navbar-brand" href="/"><img src="" alt="logo" width="auto" height="20px"></a>
//         <button class="navbar-toggler p-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
//           aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon buttoncolor rounded"></span>
//         </button>
//         <div class="collapse navbar-collapse" id="navbarNav">
//           <ul class="navbar-nav">
//             <li class="nav-item">
//               <a class="nav-link" id="login">LOGIN</a>
//             </li>
//             <li class="nav-item">
//               <a class="nav-link" id="register">REGISTER</a>
//             </li>
//           </ul>
//         </div>
//       </div>
//     </nav>`;
//   }
// };

// const createCard = (kwiz) => {
//   const kwizAppend = `
//   <article class="col-lg-4 col-md-5 col-10">
//     <div class="card kwizcard">
//       <img src="${kwiz.imageurl}" class="card-img-top img-fluid" alt="quizimg">
//         <div class="card-body">
//           <h5 class="card-title">${kwiz.title} KWIZ</h5>
//           <p class="card-text">${kwiz.description}</p>
//           <a href="#" class="btn btn-primary">KWIZ!</a>
//         </div>
//     </div>
//   </article>`;
//   return kwizAppend;
// };

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

// const renderContainer = (user) => {
//   if (user) {
//     return `
//     <div class="row d-flex justify-content-center">

//     <!-- PROFILE CARD -->
//     <div class="col-md-3 col-10">
//       <div class="row">
//         <div class="col kwizcard profile rounded my-5 fixed">
//           <div class="col">
//             <div class="row d-flex justify-content-center">
//             </div>
//             <div class="profileinfo">
//               <section class="row">
//                 <p class="h3 text-center">${user.name}</p>
//               </section>
//               <section class="row border rounded d-flex justify-content-center m-1">
//                 <h5 class="text-center my-0 p-0">LAST KWIZ RESULT:</h5>
//                 <hr class="w-75">
//                 <p class="text-center my-0 p-0">(WIN/LOSS)</p>
//                 <hr class="w-75">
//                 <p class="text-center my-0 p-0">8 out of 10</p>
//               </section>
//               <p class="py-3 m-0">Kwizes created: 3</p>
//               <hr class="w-100">
//               <p class="py-3 m-0">Kwizes participated: 8</p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>

//     <div class="col">
//           <div class="row d-flex justify-content-center mb-5">
//             <a href="/createkwiz" id="createkwiz">
//               <button class="pushable w-50">
//                 <span class="front">
//                   Create new KWIZ!
//                 </span>
//               </button>
//             </a>
//           </div>
//           <div class="row" id="kwizcontainer">

//           </div>
//         </div>
//   </div>
//     `;
//   }
// };

const createKwiz = () => {
  `
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
  <button type="button" class="btn btn-primary" id="deletequestion">Delete question</button>
  <button type="submit" class="btn btn-primary">Submit</button>

  </form>`;
};

const questionN = (questionN) => {
  return `
  <section id="question${questionN}">
  <div class="mb-3">
  <label class="form-label">Question ${questionN} (select the correct answer)</label>
  <input type="text" name="q1" class="form-control" placeholder="Enter a title">
</div>
<div class="mb-3">
  <label class="form-label">Answer A</label>
  <input type="radio" name="q${questionN}ans" value="q${questionN}a"> <input type="text" name="q${questionN}a" class="form-control">
</div>
<div class="mb-3">
  <label class="form-label">Answer B</label>
  <input type="radio" name="q${questionN}ans" value="q${questionN}b"><input type="text" name="q${questionN}b" class="form-control">
</div>
<div class="mb-3">
  <label class="form-label">Answer C</label>
  <input type="radio" name="q${questionN}ans" value="q${questionN}c"><input type="text" name="q${questionN}c" class="form-control">
</div>
<div class="mb-3">
  <label class="form-label">Answer D</label>
  <input type="radio" name="q${questionN}ans" value="q${questionN}d"><input type="text" name="q${questionN}d" class="form-control">
</div>
  </section>
    `;
};
