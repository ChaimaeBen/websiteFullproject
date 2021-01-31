async function getComments(id) {
  let response = await fetch(
    "https://fullproject-backend.herokuapp.com/comment/getAllById?id=" + id,
    { mode: "cors" }
  )
  return await response.json();

}
async function getUserInfo(id) {
  let response = await fetch("https://fullproject-backend.herokuapp.com/authentication/getById/" + id, { mode: "cors" });
  return await response.json();
}

async function getNameUser(id) {
  let response = await fetch("https://fullproject-backend.herokuapp.com/authentication/getById/" + id, { mode: "cors" });
  return await response.json();
}


async function liked(remixId){
  console.log('here is the remix '+remixId)
  let response = await fetch("https://fullproject-backend.herokuapp.com/likes/Add/"+remixId, { mode: "cors" })
  return await response.json();
}

async function verifyLiked(remixId){
  let response = await fetch("https://fullproject-backend.herokuapp.com/likes/verify/"+remixId, { mode: "cors" })
  return await response.json();
}

async function likedRun(remixId){
  var isLiked = await verifyLiked(remixId);
  console.log('here is the liked')
  var button =document.getElementsByClassName('player__play-stats-likes-icon');
  button.disabled = false

  /*
  if(!isLiked){
     await liked(remixId);
  }else{
    console.log('disable the button here')
    document.getElementsByClassName('player__play-stats-likes-icon').onclick = null;

  }*/
  
}

window.onload = () => {
  var url = window.location.search;
  const urlParams = new URLSearchParams(url);

  const remixId = urlParams.get("remixId");
  const userId = urlParams.get("id");
  $('input[name="remixId"]').val(remixId);
console.log('here your user'+ userId)
  console.log('here is the remixId of comment' + remixId)


  async function detailRun(userId,remixId) {
    const [user,comments] = await Promise.all([ getUserInfo(userId),
      getComments(remixId)

    ]);
    for (let i = 0; i < comments.length; i++) {
     const user = await getNameUser(comments[i].userId);
     const newdate=new Date(comments[i].date.Date*1000)
  console.log(newdate)

      console.log(JSON.stringify(comments[i].date) + " "+newdate)
  

      $(".comments").append(`
        <div class="comments__list">
        <img src="../img/userPicture.jpg" alt="user picture" class="comments__list-image">
        <div class="comments__list-info">
        
            <p class="comments__list-info-name">${user.firstname} ${user.lastname}</p>

            <p class="comments__list-info-comment">${comments[i].comment}</p>

            
        </div>
        
    </div>

          `);
        

    }
    $(".player__play-stats-comments-number").append(`<p>${comments.length}</p>`)

    if (userId) {

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

  detailRun(userId,remixId);
}





