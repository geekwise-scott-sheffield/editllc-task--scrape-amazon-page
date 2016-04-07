var express = require("express");
var fs = require("fs");
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


            //starting point is a unique header within external site's HTML
            //retrieves the movie subtext
            $(".title_wrapper").filter(function(){
                //storing the now filtered data as a var for easier use later
                var data = $(this);

                //examining  DOM shows title is within first child element of header
                //retrieving the text is easy with this line of jQuery

                //title of movie
                title = data.children(":first-child").next().text();
                //release of movie
                //release = data.children().last().children().text();


                // once the text is retrieved, it'll be stored as a json object
                //title being stored as json object
                json.title = title;
                //release date stored as json object
                //json.release = release;
            });


            //starting point searches within a custom class in the external site's HTML
            //retrieves the movies rating
            $(".ratingValue").filter(function(){
                var data = $(this);

                //rating of movie
                rating = data.text();

                //rating is stored as json object
                json.rating = rating;
            });

        }

        //there are 3 arguments being passed through the writeFile function
        //argument1 - output.json is what the name of the created file will be called
        //argument2 - (json, null, 4) is what will be written in file; JSON.stringify makes content easier to read
        //argument3 - a callback function to notify us the functions status
        fs.writeFile("output.json", JSON.stringify(json, null, 4), function(err){
            console.log("file successfully written - check your project directory for the output.json file");
        });

        //a message is sent through the browser since there's no UI elements to the application
        res.send("check your terminal!");

    });
});

app.listen('8081');
console.log("magic happens at port 8081");
exports = module.exports = app;