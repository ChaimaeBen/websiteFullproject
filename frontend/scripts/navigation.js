async function getUserInfo(id) {
  let response = await fetch("https://fullproject-backend.herokuapp.com/authentication/getById/" + id, { mode: "cors" });
  console.log(response);
  return await response.json();
}

window.onload = () => {
  var url = window.location.search;
  url = url.replace("?id=", "");
  console.log(url);

  async function runAll(url) {
    console.log("entered");
    if (url) {
      const user = await getUserInfo(url);

      console.log("a user " + user);
      $(".user-nav").append(`
    <a href="https://fullproject-frontend.herokuapp.com/views/beats.html" class="user-nav__link">Beats</a>
    <a href="sampleGenerator.html" class="user-nav__link">Generate sample</a>
    <div class="user-nav__user">
        <p class="user-nav__user-name">${user.firstname} ${user.lastname}</p>
        <img src="img/userPicture.jpg" alt="user picture" class="user-nav__user-photo">
    </div>`);
    } else {
      $(".user-nav").append(`
      <a href="beats.html" class="user-nav__link">Beats</a>
      <a href="sampleGenerator.html" class="user-nav__link">Generate sample</a>
      <a href="login.html" class="user-nav__button user-nav__link">Sign in</a>
    `);
    }
  }
  runAll();
};
