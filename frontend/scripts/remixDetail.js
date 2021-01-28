async function getComments(id) {
    let response = await fetch(
      "https://fullproject-backend.herokuapp.com/comment/getAllById?id="+id,
      { mode: "cors" }
    ) 
    return await response.json();

  }

  /*
  async function getUserInfo(id) {
    let response = await fetch(
      "https://fullproject-backend.herokuapp.com/authentication/getById/"+id,
      { mode: "cors" }
    );
    return await response.json();
  }

*/

  window.onload = () => {
  console.log("href " + window.location.search);
  var url = window.location.search;
  url = url.replace("?remixId=", "");
  $('input[name="remixId"]').val(url);

  async function detailRun(url) {
    const [comments] = await Promise.all([
        getComments(url),

    ]);
    for (let i = 0; i < comments.length; i++) 
        $(".comments").append(`
        <div class="comments__list">
        <img src="../img/userPicture.jpg" alt="user picture" class="comments__list-image">
        <div class="comments__list-info">
            <p class="comments__list-info-name">${comments[i].userId}</p>
            <p class="comments__list-info-comment">${comments[i].comment}</p>
        </div>
        <p class="comments__list-date">${comments[i].date}</p>
    </div>

          `);
      }
      detailRun(url);
}





  