var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var multer = require('multer');
var upload = multer({ dest: './uploads' });
var mongoose = require('mongoose')
var fs = require('fs');
var uri = "mongodb://heroku_fhgfqzv4:illhcbd073l1skc2vjlm177863@ds125262.mlab.com:25262/heroku_fhgfqzv4"
mongoose.Promise = global.Promise
//connect to mongodb
mongoose.connect(uri);
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

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
app.post('/submit.html', upload.single('profimage'), function(req, res){
	//get parsed information
	var personInfo = req.body;
	if(!personInfo.lname || !personInfo.fname || !personInfo.num){
      console.log("all the info has not been filled");}
	   else {
      var newPerson = new Person({
         fname: personInfo.fname,
         lname: personInfo.lname,
		 email: personInfo.email,
         num: personInfo.num
      });
		if(req.file.data){
			cosole.log("the image has been referenced")
			}else{
					console.log("the image has not yet been referenced")
				}
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