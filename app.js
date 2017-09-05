var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  routes = require('./controllers/index.js'),
  morgan = require('morgan'),
  cors = require('cors');

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
    // console.log('ERROR connecting to: ' + uristring + '. ' + err);
    console.log(err)
  } else {
    console.log('Succeeded connected to: ' + uristring);
  }
});

//express cors


app.engine('html', require('ejs').renderFile);

app.set('view engine', 'html');

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: true })); //use bodyParser for request and parsing info
app.use(bodyParser.json());




app.set('views', __dirname + '/views');
app.use(express.static(__dirname + '/public')); //use to serve static files like favicon, css, angular and the rest

app.use('/', routes)


app.listen(process.env.PORT || 5000)
console.log("Server Listening on port ", process.env.PORT || 5000);

