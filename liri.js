require("dotenv").config();

// Link to keys.js to access keys!
var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);