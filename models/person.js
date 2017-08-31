var mongoose = require('mongoose');
var schema = mongoose.Schema

var personSchema = new schema({
    fname: String,
    lname: String,
    email: String,
    num: Number,
    votes: { type: Number, default: 0 },
    img: { data: Buffer, contentType: String }
});


module.exports = mongoose.model('Person', personSchema);


