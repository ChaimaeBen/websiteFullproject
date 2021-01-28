async function getAllFunc() {
  let response = await fetch(
    "https://fullproject-backend.herokuapp.com/remix/getAll",
    { mode: "cors" }
  );
  return await response.json();
}




window.onload = () => {
console.log('here you go')
  async function run() {

    const [getAll] = await Promise.all([
      getAllFunc(),
    ]);

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