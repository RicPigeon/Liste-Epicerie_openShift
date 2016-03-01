var express = require('express');
var bodyParser = require('body-parser');
var morgan = require('morgan');

var config = require('./config');
var Firebase = require("firebase");

//  Set the environment variables we need.
config.ipaddress = process.env.OPENSHIFT_NODEJS_IP || "127.0.0.1";
config.port      = process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || 1337;

var myFirebaseRef = new Firebase(config.database);

var app = express();

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'));


//var api = require('./app/routes/api')(app, express);
//app.use('/api', api);


app.get('*', function(req,res){
	res.sendFile(__dirname + '/public/index.html')
});

//  Start the app on the specific interface (and port).
app.listen(config.port, config.ipaddress, function(err) {
	if(err){
		console.log(err);
	} else {
		console.log('%s: Node server started on %s:%d ...',
				Date(Date.now() ), config.ipaddress, config.port);
	}

});

//var jsdom = require("jsdom");

//function notStringEmpty(element, index, array) {
//	return (element !== "");
//}
 

 /*
//Function qui obtient les ingredients des sites de cuisine !!
jsdom.env({
  url: "http://www.ricardocuisine.com/recettes/7028-chili-i-con-carne-i-",
  scripts: ["http://code.jquery.com/jquery.js"],
  done: function (err, window) {
    var $ = window.$;
    var ingredients = $("[itemprop='ingredients']").text().trim().replace(/\t/g, '').split('\n').filter(notStringEmpty);

    console.log(ingredients);
  }
});
*/