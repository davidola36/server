var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  routes = require('./controllers/index.js');
var multer = require('multer');
// var upload = multer({ dest: './uploads' });
// var 
var fs = require('fs');
// var uristring =
//   process.env.MONGOLAB_URI ||
//   process.env.MONGOHQ_URL ||
//   'mongodb://davidola36:1cancomea@ds061374.mlab.com:61374/sample';


var uristring = 'mongodb://127.0.0.1:27017/photosplash'

////connect to mongodb
// Makes connection asynchronously.  Mongoose will queue up database
// operations and release them when the connection is complete.
mongoose.connect(uristring, function (err, res) {
  if (err) {
    console.log('ERROR connecting to: ' + uristring + '. ' + err);
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');


app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));


app.use(express.static('views'));


app.use('/', routes);



app.listen(process.env.PORT || 5000);
console.log('app listening on port 5000')
