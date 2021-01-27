const { render } = require("ejs");
var firebase = require("firebase");

var express = require("express");
const remixRouter = express.Router();
global.XMLHttpRequest = require("xhr2");
require("firebase/storage");
const http = require("https"); // or 'https' for https:// URLs
const fs = require("fs");
URL = require("url");

//random

//discover

//newest


  remixRouter
  .route("/getById")
  .get((req, res) => {
    //get the detail information of the remix by remix id
    console.log('id here: '+  req.query.id);
    var ref = firebase.firestore().collection("remixes").doc(req.query.id).get();

    ref
    .then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
      res.send(doc.data())
      } else {
        console.log("No such document!");
      }
    })
 
  })

  remixRouter
  .route("/getAll")
  .get((req, res) => {
    //get the detail information of the remix by remix id
    const ref = await firebase.firestore().collection('remixes').get()
  
    ref.then((querySnapshot) => {
      const data = []
      querySnapshot.forEach((doc) => {
         data.push({ id: doc.id, ...doc.data() })

      })
      res.send(data)
   }) .catch(function (error) {
            console.error("Error displaying documents: ", error);
          });

  })

remixRouter
  .route("/checkLoggedInUpload")
  .get((req, res) => {
    var userId = firebase.auth().currentUser.uid;
if(userId)
   { 
     res.send(userId);
    }
    else{
      res.send("you need to be logged in to upload")
    }
  });

module.exports = remixRouter;
