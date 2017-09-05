var express = require('express'),
    router = express.Router(),
    Person = require('../models/person.js'),
    multer = require('multer'),
    upload = multer({ dest: 'public/uploads/' });

/**
 * get all user saved in the db
 */
router.get('/api/alluser', function (req, res) {
    console.log('trying to get all user')
    Person.find({}, function (err, person_obj) {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            console.log(person_obj)
            res.send(person_obj)
        }
    })
});

/**
 * get the information of a user
 */
router.get('/api/user/:id', function (req, res) {
    console.log('user id')
    console.log(req.params)
    Person.findOne({ _id: req.params.id }, function (err, person_obj) {
        if (err) {
            console.log(err)
            res.send(err)
        }
        else {
            res.send(person_obj)
        }
    })
});


/**
 * submit new user details
 */
router.post('/api/submitdetails', upload.single('file'), function (req, res) {

    var personInfo = req.body;
    if (!personInfo.lname || !personInfo.fname || !personInfo.num) {
        console.log("all the info has not been filled");
    }
    else {
        console.log('else worked')
        var newPerson = new Person({
            fname: personInfo.fname,
            lname: personInfo.lname,
            email: personInfo.email,
            num: personInfo.num,
            file: req.file

        });

        newPerson.save(function (err, person_obj) {
            console.log('trying to save')
            if (err) {
                console.log("the file didnt save");
                res.send({ success: false, message: 'upload failed' })
            }

            console.log('user saved');
            res.send({ success: true, data: person_obj });
        });
    }
});

router.post('/api/vote', function (req, res) {
    console.log('lets get the body id');
    console.log(req.body._id);
    Person.update({ _id: req.body._id }, { $inc: { votes: 1 } }, function (err, user_obj) {
        if (err) {
            console.log(err);
            res.send({ success: false, data: err })
        }
        if (!user_obj) {
            console.log('user not found');
            res.send({ success: false, data: ' User not found' })
        }
        else {
            console.log('vote updated');
            console.log(user_obj);
            res.send({ success: true, data: user_obj });
        }
    });
});

router.get('/submit', function (req, res) {

    res.render('submit')

});

router.get('/gallery', function (req, res) {

    res.render('gallery')

});

router.get('/aboutus', function (req, res) {

    res.render('aboutus')

});



router.get('/thecompetition', function (req, res) {

    res.render('thecompetition')

});

router.get('/', function (req, res) {
    res.render('photosplash');

});
router.get('/photosplash', function (req, res) {
    res.render('photosplash');

});

module.exports = router;

