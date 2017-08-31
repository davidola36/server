var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var mongoose = require('mongoose')
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
      console.log ('ERROR connecting to: ' + uristring + '. ' + err);
      } else {
      console.log ('Succeeded connected to: ' + uristring);
      }
    });
	// creating a new model
	var personSchema = mongoose.Schema({
   fname: String,
   lname: String,
   email: String,
   num: Number,
   votes: { type: Number, default: 0 },
   img: { data: Buffer, contentType: String }
});
//using personSchema to create person collection
var Person = mongoose.model("Person", personSchema);

//setting template engine to html
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
app.use(bodyParser.urlencoded({ extended: true}));
// for parsing multipart/form-data
app.use(upload.array());
//setting the root directory as views to watch
app.use(express.static('views'));
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