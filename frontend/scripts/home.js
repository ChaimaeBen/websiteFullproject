async function getAllFunc() {
  let response = await fetch(
    "https://fullproject-backend.herokuapp.com/remix/getAll",
    { mode: "cors" }
  );
  return await response.json();
}

async function getUserInfo(id) {
  let response = await fetch("https://fullproject-backend.herokuapp.com/authentication/getById/" + id, { mode: "cors" });
  return await response.json();
}


window.onload = () => {
  console.log("href " + window.location.search);
  var url = window.location.search;
  url = url.replace("?id=", "");
  console.log(url);


console.log('here you go')
  async function run() {

 const [getAll,user] = await Promise.all([getAllFunc(),getUserInfo(url)]);



 if (url) {
  const user = await getUserInfo(url);

  console.log("a user " + user);
  $(".user-nav").append(`
<a href="https://fullproject-frontend.herokuapp.com/views/home.html" class="user-nav__link">Home</a>
<a href="sampleGenerator.html" class="user-nav__link">Generate sample</a>
<div class="user-nav__user">
    <p class="user-nav__user-name">${user.firstname} ${user.lastname}</p>
    <img src="img/userPicture.jpg" alt="user picture" class="user-nav__user-photo">
</div>`);
} else {
  $(".user-nav").append(`
    <a href="https://fullproject-frontend.herokuapp.com/views/home.html" class="user-nav__link">Home</a>
    <a href="sampleGenerator.html" class="user-nav__link">Generate sample</a>
    <a href="https://fullproject-frontend.herokuapp.com/views/login.html" class="user-nav__link">Login</a>
    <a  href="https://fullproject-frontend.herokuapp.com/views/signup.html" class="user-nav__link">Sign up</a>
`);
}


    for (let i = 0; i < 7; i++) {
      $(".trending__list").append(`
          <div class="trending__list-item">
          
             <a href="https://fullproject-frontend.herokuapp.com/views/remixDetail.html?remixId=${getAll[i].id}">
             
             <img src="../img/albumPicture.png" alt="picture of album" class="trending__list-item-image">
             <p class="trending__list-item-title">${getAll[i].name}</p>
             <p class="trending__list-item-author">By Stefanos</p>
             </a>
            </div>
            `);
    }
  }

  run();
}