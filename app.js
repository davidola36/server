<<<<<<< HEAD
var express = require('express'),
  app = express(),
  bodyParser = require('body-parser'),
  mongoose = require('mongoose'),
  routes = require('./controllers/index.js');
 var multer = require('multer');
 var upload = multer({ dest: './uploads' });
// var 
=======
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose')
>>>>>>> 9a6eef239861d0040975373fd22410387db01bc1
var fs = require('fs');
var uristring =
  process.env.MONGOLAB_URI ||
  process.env.MONGOHQ_URL ||
  'mongodb://davidola36:1cancomea@ds061374.mlab.com:61374/sample';


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

//defining the path of the image
app.use(multer({ dest: './uploads/',
	rename: function (fieldname, filename){
		return filename;
		},
	}));

// for parsing application/json
app.use(bodyParser.json());

// for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));
// for parsing multipart/form-data
app.use(upload.array());
//setting the root directory as views to watch
app.use(express.static('views'));
<<<<<<< HEAD


app.use('/', routes);



app.listen(process.env.PORT || 5000);
console.log('app listening on port 5000')
=======
app.get('/', function(req, res){
	res.render('photosplash');
		
});
app.post('/submit.html', function(req, res){
	//get parsed information
	var personInfo = req.body;
	if(!personInfo.lname || !personInfo.fname || !personInfo.num){
      console.log("all the info has not been filled");}
	   else {
      var newPerson = new Person({
         fname: personInfo.fname,
         lname: personInfo.lname,
		 email: personInfo.email,
         num: personInfo.num,
      });
	  newPerson.img.data = fs.readFileSync(req.files.userPhoto.path)
	  newPerson.img.contentType= 'image/png';
      newPerson.save(function(err, Person){
         if(err)
            console.log("the file didnt save");
         else
           console.log("the file saved");
		   console.log(req.body);
      });
   }
});
app.listen(process.env.PORT || 5000);
>>>>>>> 9a6eef239861d0040975373fd22410387db01bc1
