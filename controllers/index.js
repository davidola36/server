var express = require('express'),
    router = express.Router(),
    Person = require('../models/person.js'),
    multer = require('multer'),
    upload = multer({ dest: './uploads' });



router.get('/', function (req, res) {
    res.render('photosplash');

});

router.post('/submit.html', upload.single('profimage'), function (req, res) {
    //get parsed information
    var personInfo = req.body;
    if (!personInfo.lname || !personInfo.fname || !personInfo.num) {
        console.log("all the info has not been filled");
    }
    else {
        var newPerson = new Person({
            fname: personInfo.fname,
            lname: personInfo.lname,
            email: personInfo.email,
            num: personInfo.num
        });
        newPerson.save(function (err, Person) {
            if (err)
                console.log("the file didnt save");
            else
                console.log("the file saved");
            console.log(req.body);
        });
    }
});

module.exports = router;
