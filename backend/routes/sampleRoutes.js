const { render } = require("ejs");
var firebase = require("firebase");

var express = require("express");
const sampleRouter = express.Router();
global.XMLHttpRequest = require("xhr2");
require("firebase/storage");
const http = require("https"); // or 'https' for https:// URLs
const fs = require("fs");
URL = require("url");


sampleRouter.get("/download", (req, res) => {
    //download sa marche
    var userId = firebase.auth().currentUser.uid;
  
    const storageRef = firebase.storage().ref();
  
    //get id from url
    //get name query with id
    storageRef
      .child("samples/67536Y/schu_143_2.mid")
      .getDownloadURL()
      .then((url) => {
        res.redirect(url);
      })
      .catch((error) => {
        console.log(error);
      });
  });



  module.exports = sampleRouter;