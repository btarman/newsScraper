var request = require('request');
var cheerio = require('cheerio');

var Article = require("./../models/Article.js");
var Comment = require("./../models/Note.js");


module.exports = function(app) {
  app.get('/scrape', function(req, res) {
    // var data = [];
    request('http://deadspin.com/', function(error,response, html) {
      var $ = cheerio.load(html);
      $('h1.headline').each(function(i, element) {
        var result = {};
        result.title = $(this).children('a').text();
        result.link = $(this).children('a').attr('href');
        if(result.title !== '') {
          var entry = new Article (result);
          // data.push(entry);
          // console.log(entry);
          entry.save(function(err, doc) {
            if (err) {
              console.log(err)
            }
            else {
              console.log(doc);
            }
          }); 
        }
      });
      // console.log(data);
      res.redirect('/')  
    });
  })
  app.post("/saved/:id", function (req, res) {
    Article.findOneAndUpdate({"_id": req.params.id}, {"saved": true})
      .exec(function(error, doc) {
          if (error) {
              console.log(error);
          } 
          else {
              res.send(doc);
          }
      });
  });

}

