

$(function () {
  var uid = uuidv4();
  
  console.log("uploaded file is loaded");
  $('input[name="uid"]').val(uid);

  console.log( $('#uid').val() )
  function uuidv4() {
    return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, (c) =>
      (
        c ^
        (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))
      ).toString(16)
    );
  }
  
});



$("#uploadForm").submit(function (e) {
  e.preventDefault();

 let title= $('#titleRemix').val();

  console.log("UPLOAD-FILE called! "+ title);
  var storageReference = firebase.storage().ref();
  var file = document.getElementById("customFile").files[0];
  var id =$('input[name="uid"]').val();
   console.log(file)
fileName=file.name;
   var ext = fileName.substr(fileName.lastIndexOf('.') + 1);
 console.log(ext)
  storageReference
    .child(`remixes/${id}/` + title+'.'+ext)
    .put(file)
    .then((result) => {
      console.log("Image uploaded!");
      alert("File uploaded!");
    })
    .catch((error) => {
      console.log("Error ==== ", error);
      alert("Something went wrong!");
    });

    let obj = {
      uid:id,
      name: title,
      
  }
  
  fetch('https://fullproject-backend.herokuapp.com/remix/saveUpload', {
      method: 'POST',
      body: JSON.stringify(obj),
      headers: { 'Content-Type': 'application/json' }
  }).then(res => res.json())
    .then(json => console.log(json))
    .catch(err => console.log(err))

  });