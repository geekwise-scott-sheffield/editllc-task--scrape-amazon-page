var express = require("express");
var fs = require ("fs");
var request = require("request");
var cheerio = require("cheerio");
var app = express();

app.get("/scrape", function(req, res) {
    //all scraping code goes here

    //url of website we'll be scraping from
    url = "http://www.imdb.com/title/tt1229340/";

    request(url, function(error, response, html){
        //making sure no errors occurred when making the request
        if(!error){
            //using cheerio library on returned html essentially gives jQuery functionality
            var $ = cheerio.load(html);

            //defining variables captured
            var title, release, rating;
            var json = {title : "", release : "", rating : ""};

            //starting point is a unique header within external HTML
            $(".header").filter(function(){
                //storing the now filtered data as a var for easier use later
                var data = $(this);
            })


        }

    })

});

app.listen('8081');
console.log("magic happens at port 8081");
exports = module.exports = app;