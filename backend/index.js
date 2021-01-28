var express = require("express");
const app = express();
var firebase = require("firebase");
const firebaseConfig = require("./firebaseConfig");
const path = require("path");
var bodyParser = require("body-parser");
const port = process.env.PORT || 8080;
var cors = require("cors");

app.engine("html", require("ejs").renderFile);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

const users = require("./routes/UserRoutes.js");
const remix = require("./routes/remixRoutes.js")
const samples = require("./routes/sampleRoutes.js")
const comment = require("./routes/commentRoutes.js")

firebase.initializeApp(firebaseConfig);

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "/public/index.html"));
});


app.use("/authentication", users);
app.use("/remix", remix);
app.use("/sample", samples);
app.use("/comment", comment);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
