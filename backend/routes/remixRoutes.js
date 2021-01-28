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

remixRouter.route("/getByNew").get((req, res) => {
  db.collection("remixes").orderBy("date", "desc").limit(6).get().then((el) => {
    console.log(el);
    let data = el.docs.map((doc) => {
      return { id: doc.id, data: doc.data() }
    });
    console.log(...data);
    res.send(data);
  })
    .catch((error) => {
      console.log(error);
    });
});

remixRouter.route("/getById").get((req, res) => {
  //get the detail information of the remix by remix id
  console.log("id here: " + req.query.id);
  var ref = firebase.firestore().collection("remixes").doc(req.query.id).get();

  ref.then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data());
      res.send(doc.data());
    } else {
      console.log("No such document!");
    }
  });
});

remixRouter.route("/saveUpload").post((req, res) => {

  var user = firebase.auth().currentUser.uid;

  if (user) {
    console.log('save loaded backend ' + req.body.uid)
    console.log("id here: " + req.body.name);
    firebase.firestore().collection("remixes").doc(req.body.uid).set({
      name: req.body.name,
      userId: user,
      date: new Date()
    }, { merge: true })
      .then(function (doc) {
        console.log(doc)
        res.send(doc)
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
    res.send(req.body)
  }
  else {
    res.redirect('https://fullproject-frontend.herokuapp.com/views/login.html')
  }
});

remixRouter.route("/getAll").get((req, res) => {
  //get the detail information of the remix by remix id
  const ref = firebase.firestore().collection("remixes").get();

  ref
    .then((querySnapshot) => {
      const data = [];
      querySnapshot.forEach((doc) => {
        data.push({ id: doc.id, ...doc.data() });
      });
      res.send(data);
    })
    .catch(function (error) {
      console.error("Error displaying documents: ", error);
    });
});

remixRouter.route("/checkLoggedInUpload").get((req, res) => {
  var userId = firebase.auth().currentUser.uid;
  if (userId) {
    res.send(userId);
  } else {
    res.send("you need to be logged in to upload");
  }
});


remixRouter.get("/downloadById/:id", (req, res) => {
  //download sa marche

  const storageRef = firebase.storage().ref();

  //get id from url
  //get name query with id

  var ref = firebase.firestore().collection("remixes").doc(req.params.id).get();

  ref.then(function (doc) {
    if (doc.exists) {
      console.log("Document data:", doc.data().name);
      storageRef
        .child(`remixes/${req.params.id}/${doc.data().name}`)
        .getDownloadURL()
        .then((url) => {
          res.redirect(url);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("No such document!");
    }
  });
});

module.exports = remixRouter;
