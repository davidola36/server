var express = require('express'),
    router = express.Router(),
    Person = require('../models/person.js');
var multer = require('multer')

var fs = require('fs')

var upload = multer({ dest: 'uploads/' });


router.get('/alluser', function (req, res) {
    Person.find({}, function (err, person_obj) {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            res.send(person_obj)
        }
    })
})

router.get('/user/:id', function (req, res) {
    Person.findOne({ _id: req.body.id }, function (err, person_obj) {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            res.send(person_obj)
        }
    })
})

router.post('/submit.html', function (req, res) {

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

        newPerson.img.data = fs.readFileSync(req.file.path)
        newPerson.img.contentType = 'image/png';


        newPerson.save(function (err, person_obj) {
            if (err) {
                console.log("the file didnt save");
                res.send({ status: false, message: 'upload failed' })
            }

            console.log('user saved');
            res.send(person_obj)
        });
    }
});

router.get('/', function (req, res) {
    res.render('photosplash');

});

module.exports = router;
