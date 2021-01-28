const { render } = require("ejs");
var express = require("express");
const userRouter = express.Router();
var firebase = require("firebase");

userRouter
  .route("/signup")
  .get((req, res) => {
    res.redirect("https://fullproject-frontend.herokuapp.com/views/signup.html");
  })
  .post((req, res) => {
    var db = firebase.firestore();

    console.log("the route is entered");
    console.log("here is the req " + JSON.stringify(req.body.email));
    firebase
      .auth()
      .createUserWithEmailAndPassword(req.body.email, req.body.pwd)
      .then((userCredential) => {
        var user = userCredential.user;
        console.log("here is the user info " + JSON.stringify(user));

        db.collection("users").doc(user.uid).set({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            joinedOn:new Date()
          })
          .then(function (docRef) {
          })
          .catch(function (error) {
            console.error("Error adding document: ", error);
          });
          res.redirect('/authentication/profile')

      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        console.log(error + " " + error.message);
      });
  });

userRouter
  .route("/login")
  .get((req, res) => {
    res.redirect("https://fullproject-frontend.herokuapp.com/views/login.html");
  })
  .post((req, res) => {
    console.log("entered sign in");
    firebase
      .auth()
      .signInWithEmailAndPassword(req.body.email, req.body.pwd)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
       console.log("successfully logged in " + JSON.stringify(user));
        res.redirect("https://fullproject-frontend.herokuapp.com/views/home.html?id="+user.uid);
      })
      .catch((error) => {
        console.log(error)
        var errorCode = error.code;
        var errorMessage = error.message;
      });
  });


  userRouter.route("/getById/:id").get((req, res) => {
    //get the detail information of the remix by remix id
    var ref = firebase.firestore().collection("users").doc(req.params.id).get();
  
    ref.then(function (doc) {
      if (doc.exists) {
        console.log("Document data:", doc.data());
        res.send(doc.data());
      } else {
        console.log("No such document!");
      }
    });
  });

  userRouter.get("/profile", (req, res) => {

  var userId = firebase.auth().currentUser.uid;
  console.log('entered profile '+JSON.stringify(userId))

  if (userId != null) {
    var ref = firebase.firestore().collection("users").doc(userId).get();

    ref
      .then(function (doc) {
        if (doc.exists) {
          console.log("Document data:", doc.data());

          res.redirect('https://fullproject-frontend.herokuapp.com/views/profile.html?userId='+userId)
        } else {
          console.log("No such document!");
        }
      })
      .catch(function (error) {
        console.log("Error getting document:", error);
      });
   
  } else {
    console.log("you need to be authenticated first");
    //redirect to home page
  }
});

userRouter.get("/Logout", (req, res) => {
  firebase
    .auth()
    .signOut()
    .then(() => {
      res.redirect("/authentication/login");
    })
    .catch((error) => {
      // An error happened.
    });
});

userRouter
  .route("/forgotPassword")
  .get((req, res) => {
    res.redirect("https://fullproject-frontend.herokuapp.com/views/forgotpassword.html");
  })
  .post((req, res) => {
    console.log("entered forgotten abyss");
    firebase
      .auth()
      .sendPasswordResetEmail(req.body.email)
      .then(function () {
        console.log("email was send");
      })
      .catch(function (error) {
        console.log(error);
      });
  });

module.exports = userRouter;
