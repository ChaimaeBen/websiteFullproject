const { render } = require("ejs");
var express = require("express");
const likeRouter = express.Router();
var firebase = require("firebase");

likeRouter.route("/Add").post((req, res) => {
  let user = firebase.auth().currentUser.uid;
  if (user) {
    firebase.firestore().collection("likes").doc().set({
        remixId: req.body.remixId,
        userId: user,
        date:new Date()
      })
      .then(function (doc) {
        console.log(doc);
      })
      .catch(function (error) {
        console.error("Error adding document: ", error);
      });
  } else {
    res.redirect("https://fullproject-frontend.herokuapp.com/views/login.html");
  }
});

likeRouter.route("/remove").get((req, res) => {
  let user = firebase.auth().currentUser.uid;
  if (user) {
    let query = db
      .collection("likes")
      .where("userId", "==", user)
      .where("remixId", "==", req.body.remixId);
    query.get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        doc.ref.delete();
      });
    });
  } else {
    res.redirect("https://fullproject-frontend.herokuapp.com/views/login.html");
  }
});

module.exports = likeRouter;
