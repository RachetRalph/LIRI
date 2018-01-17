require("dotenv").config();
// NPM Modules used to power this application 
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require("node-spotify-api");
var request = require("request");
// API vars 
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
// Loads the fs pkg to read and write to log.txt files
var fs = require("fs");
// Inline arguments the node application will take
var command = process.argv[2];
var value = process.argv[3];

// Switch statements to create user commands.
switch (command) {
    case "my-tweets":
        myTweets();
        break;
    case "spotify-this-song":
        spotifySearch();
        break;
    case "movie-this":
        movieSearch();
        break;
    case "do-what-it-says":
        doIt();

        // Instructions displayed in terminal to the user
    default:
        console.log("\r\n" + "Try typing one of the following commands after 'node liri.js' : " + "\r\n" +
            "1. my-tweets 'any twitter name' " + "\r\n" +
            "2. spotify-this-song 'any song name' " + "\r\n" +
            "3. movie-this 'any movie name' " + "\r\n" +
            "4. do-what-it-says." + "\r\n" +
            "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};

// Log function that appends log file everytime a serach is conducted using LIRI
function log(textLog) {
    fs.appendFile('log.txt', textLog, function (err, ) {
        if (err) throw err;
    });
}

// Spotify search function that finds song infomation 
function spotifySearch(song) {

    var song = process.argv[3];
    if (!song) {
        song = "Mombasa";
    }
    params = song;

    spotify.search({
        type: 'track',
        query: params + '&limit=1&'
    }, function (err, data) {
        if (err) {
            return console.log('Thats not a song:( ' + err);
        }

        var songIfy = data.tracks.items;
        //   console.log(JSON.stringify(songIfy, null, 2));

        for (var i = 0; i < songIfy.length; i++) {
            var songInfo =
                "===================================================" + "\r\n" +
                "Song: " + songIfy[i].name + "\r\n" +
                "Artist: " + songIfy[i].artists[0].name + "\r\n" +
                "Album: " + songIfy[i].album.name + "\r\n" +
                "Popularity: " + songIfy[i].popularity + "\r\n" +
                "Preview: " + songIfy[i].preview_url + "\n" +
                "===================================================" + "\n" +
                //  Empty string bring cursor to new line for next log.
                ""



            console.log(songInfo);
            log(songInfo);
        }
    });
}
// OMDB search function that finds movie infomation 
function movieSearch(movie) {
    var movie = process.argv[3];
    if (!movie) {
        movie = "Interception";
    }
    params = movie;

    request('http://www.omdbapi.com/?apikey=trilogy&t=' + params + '&y=&plot=short&r=json&tomatoes=true', function (error, response, body) {
        var movieObj = JSON.parse(body);

        var movieInfo =
            "===================================================" + "\r\n" +
            "Title: " + movieObj.Title + "\r\n" +
            "Release Year: " + movieObj.Year + "\r\n" +
            "ESRB Rating: " + movieObj.Rated + "\r\n" +
            "IMDB Rating: " + movieObj.Ratings[0].Value + "\r\n" +
            // "Rotten Tomato : " + movieObj.Ratings[1].Value + "\r\n" +
            "Metacritic : " + movieObj.Ratings.Value + "\r\n" +
            "Country Produced : " + movieObj.Country + "\r\n" +
            "Language : " + movieObj.Language + "\r\n" +
            "Awards : " + movieObj.Awards + "\r\n" +
            "Plot: " + movieObj.Plot + "\r\n" +
            "Actors : " + movieObj.Actors + "\r\n" +
            "==================================================="
        //  console.log(movieInfo);
        if (movieInfo === undefined) {
            console.log("N/A");
        } else {
            console.log(movieInfo);
        };

        log(movieInfo);
    });


}
// Twitter function that retrives my last 20 tweets 
function myTweets(tweety) {
    var tweet = process.argv[2];

    var params = {
        // Follow me on twitter @rachetralph88
        screen_name: 'rachetralph88'
    };

    tweet = params;

    twitter.get('statuses/user_timeline.json?screen_name=' + params + '&count=20', function (error, tweets) {
            if (!error) {
                for (i = 0; i < tweets.length; i++) {
                    //console.log(response); // Show the full response in the terminal
                    var twitterResults =
                        "@" + tweets[i].user.screen_name + ": " +
                        tweets[i].text + "\r\n" +
                        tweets[i].created_at + "\r\n" +
                        "------------------------------ " + i + " ------------------------------" + "\r\n";
                    console.log(twitterResults);
                    log(twitterResults); // calling log function
                }
                } else {
                    console.log("Error :" + error);
                    return;
                }
            });

    }