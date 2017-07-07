var express = require("express");
var bodyParser = require("body-parser");
var mongoose = require("mongoose");
var Note = require("./models/Note.js");
var Article = require("./models/Article.js");
var request = require("request");
var cheerio = require("cheerio");

mongoose.Promise = Promise;

var app = express();

// app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// app.use(methodOverride("_method"));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");


// Database configuration with mongoose
mongoose.connect("mongodb://localhost/newsScraper");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});





// app.get('/save', function(req, res) {
//   var entry = new Article ({title: this.title, link: this.link});
//   entry.save(function(err, doc) {
//     if (err) {
//       console.log(err)
//     }
//     else {
//       console.log(doc);
//     }
//   })
// })
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);


// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});