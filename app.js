var config = require('./config.json')
var https = require('https');
var util = require('util');
var querystring = require('querystring');

var baseGoogleUrl = "https://www.googleapis.com/customsearch/v1?key=%s&cx=%s&num=1&fields=items(title,link)&prettyPrint=false&q=%s";

var key = config.google_key;
var cx = config.google_cx;
var query = querystring.escape("Hello, World");
var targetUrl = util.format(baseGoogleUrl, key, cx, query);

var request = https.get(targetUrl, (response) => {
    response.on('data', (data) => {
        var googleResult = JSON.parse(data);
        if (googleResult.items > 0) {
            console.log(googleResult.items[0].title + ' - ' + googleResult.items[0].link);
        } else {
            console.log("No results found.");
        }
    });
});
