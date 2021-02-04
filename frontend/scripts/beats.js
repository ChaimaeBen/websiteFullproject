async function getAllFunc() {
  let response = await fetch("https://fullproject-backend.herokuapp.com/remix/getAll", { mode: "cors" });
  return await response.json();
}

async function getByNew() {
  let response = await fetch("https://fullproject-backend.herokuapp.com/remix/getByNew", { mode: "cors" });
  return await response.json();
}

async function getUserInfo(id) {
  let response = await fetch("https://fullproject-backend.herokuapp.com/authentication/getById/" + id, { mode: "cors" });
  console.log(response);
  return await response.json();
}
async function getNameUser(id) {
  let response = await fetch("https://fullproject-backend.herokuapp.com/authentication/getById/" + id, { mode: "cors" });
  return await response.json();
}

window.onload = () => {
  var url = window.location.search;
  url = url.replace("?id=", "");
  console.log(url);

  console.log("here you go " + url);

  async function run(url) {
    console.log("in the run function ");

    const [getAll, user, newest] = await Promise.all([getAllFunc(), getUserInfo(url), getByNew()]);

    console.log("here is getal " + JSON.stringify(getAll));

    for (let i = 0; i < getAll.length; i++) {
      $(".trending__list").append(`
          <div class="trending__list-item">
          
             <a class="trending__list-item-link" href="https://fullproject-frontend.herokuapp.com/views/remixDetail.html?remixId=${getAll[i].id}&id=${url}">
             
             <img src="../img/albumPicture.png" alt="picture of album" class="trending__list-item-image">
             <p class="trending__list-item-title">${getAll[i].name}</p>
             <p class="trending__list-item-author">By Stefanos</p>
             </a>
            </div>
            `);
    }

    for (let i = 0; i < newest.length; i++) {
      console.log("og " + JSON.stringify(newest));

      console.log("newest data " + JSON.stringify(newest[i].data));
      const user = await getNameUser(newest[i].data.userId);

      $(".random__list").append(`
      
      <div class="random__list-item">
      <a class="random__list-item-link" href="https://fullproject-frontend.herokuapp.com/views/remixDetail.html?remixId=${newest[i].data.id}&id=${url}">
      <img src="../img/albumPicture.png" alt="picture of album" class="random__list-item-image">
      <p class="random__list-item-title">${newest[i].data.name}</p>
      <p class="random__list-item-author">By ${user.firstname}</p>
      </a>
  </div>  


   `);
    }

    console.log("here is the url " + url);
    if (url) {
      console.log("a user " + JSON.stringify(user));
      $(".user-nav").append(`
<a href="https://fullproject-frontend.herokuapp.com/views/beats.html" class="user-nav__link">Beats</a>
<a href="sampleGenerator.html" class="user-nav__link">Generate sample</a>
<div class="user-nav__user">
    <p class="user-nav__user-name">${user.firstname} ${user.lastname}</p>
    <img src="../img/userPicture.jpg" alt="user picture" class="user-nav__user-photo">
</div>`);
    } else {
      $(".user-nav").append(`
    <a href="https://fullproject-frontend.herokuapp.com/views/beats.html" class="user-nav__link">Beats</a>
    <a href="sampleGenerator.html" class="user-nav__link">Generate sample</a>
    <a href="https://fullproject-frontend.herokuapp.com/views/login.html" class="user-nav__link">Login</a>
    <a  href="https://fullproject-frontend.herokuapp.com/views/signup.html" class="user-nav__link">Sign up</a>
`);
    }
  }

  run(url);
};
