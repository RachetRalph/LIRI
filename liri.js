require("dotenv").config();
// NPM Modules used to power this application 
var twitt = require("twitter");
var omdb = require("request");
var spotify = require ("spotify");
// Loads the fs pkg to read and write to log.txt files
var fs = require("fs");
// Inline arguments the node application will take
var command = process.argv[2];
var value = process.argv[3]; 
