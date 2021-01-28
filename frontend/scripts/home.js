async function getAllFunc() {
  let response = await fetch(
    "https://fullproject-backend.herokuapp.com/remix/getAll",{ mode: "cors" } );
  return await response.json();
}

async function getUserInfo(id) {
  let response = await fetch("https://fullproject-backend.herokuapp.com/authentication/getById/"+id, { mode: "cors" });
  console.log(response)
  return await response.json();
}


window.onload = () => {
  var url = window.location.search;
  url = url.replace("?id=", "");
  console.log(url);


  console.log('here you go '+ url)


  async function run(url) {
    console.log("in the run function ")


    const [getAll,user] = await Promise.all([getAllFunc(),getUserInfo(url)]);

    console.log("here is getal "+JSON.stringify(getAll))

    
    for (let i = 0; i < getAll.length; i++) {

      $(".trending__list").append(`
          <div class="trending__list-item">
          
             <a href="https://fullproject-frontend.herokuapp.com/views/remixDetail.html?remixId=${getAll[i].id}&id=${url}">
             
             <img src="../img/albumPicture.png" alt="picture of album" class="trending__list-item-image">
             <p class="trending__list-item-title">${getAll[i].name}</p>
             <p class="trending__list-item-author">By Stefanos</p>
             </a>
            </div>
            `);
    }

     console.log("here is the url "+url)
    if (url) {

      console.log("a user " + user);
      $(".user-nav").append(`
<a href="https://fullproject-frontend.herokuapp.com/views/home.html" class="user-nav__link">Home</a>
<a href="sampleGenerator.html" class="user-nav__link">Generate sample</a>
<div class="user-nav__user">
    <p class="user-nav__user-name">${user.firstname} ${user.lastname}</p>
    <img src="../img/userPicture.jpg" alt="user picture" class="user-nav__user-photo">
</div>`);
    } else {
      $(".user-nav").append(`
    <a href="https://fullproject-frontend.herokuapp.com/views/home.html" class="user-nav__link">Home</a>
    <a href="sampleGenerator.html" class="user-nav__link">Generate sample</a>
    <a href="https://fullproject-frontend.herokuapp.com/views/login.html" class="user-nav__link">Login</a>
    <a  href="https://fullproject-frontend.herokuapp.com/views/signup.html" class="user-nav__link">Sign up</a>
`);
    }


  }

  run(url);

}