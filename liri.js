require("dotenv").config();
// NPM Modules used to power this application 
var keys = require("./keys");
var Twitter = require("twitter");
var Spotify = require ("node-spotify-api");
var omdb = require("request");
// API vars 
var spotify = new Spotify(keys.spotify);
var twitter = new Twitter(keys.twitter);
// Loads the fs pkg to read and write to log.txt files
var fs = require("fs");
// Inline arguments the node application will take
var command = process.argv[2];
var value = process.argv[3]; 

// Switch statements to create user commands.
switch(command){
    case "my-tweets": myTweets();
    break;
    case "spotify-this-song":spotifySearch();
    break;
    case "movie-this":movieThis();
    break;
    case "do-what-it-says":doIt();

    // Instructions displayed in terminal to the user
		default: console.log("\r\n" +"Try typing one of the following commands after 'node liri.js' : " +"\r\n"+
        "1. my-tweets 'any twitter name' " +"\r\n"+
        "2. spotify-this-song 'any song name' "+"\r\n"+
        "3. movie-this 'any movie name' "+"\r\n"+
        "4. do-what-it-says."+"\r\n"+
        "Be sure to put the movie or song name in quotation marks if it's more than one word.");
};

// Spotify search function that finds song infomation 
function spotifySearch(song) {
    
    var song = process.argv[3];
    if (!song){
        song = "Mombasa";
    }
    params = song;

    spotify.search({ type: 'track', query: params + '&limit=1&' }, function(err, data) {
        if (err) {
          return console.log('Error occurred: ' + err);
        }

      var songIfy = data.tracks.items;
    //   console.log(JSON.stringify(songIfy, null, 2));

        for (var i=0; i < songIfy.length; i++){
            var songInfo = 
                "Song: " + songIfy[i].name + "\r\n" +
                "Artist: " + songIfy[i].artists[0].name + "\r\n" +
                "Album: " + songIfy[i].album.name + "\r\n" +
                "Popularity: " + songIfy[i].popularity + "\r\n" +
                "Preview: " + songIfy[i].preview_url
                
                
            console.log(songInfo);
        }
      });
}

