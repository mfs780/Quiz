// app/models/nerd.js
// grab the mongoose module
var mongoose = require('mongoose');
// var mongoose = require('mongoose').Mongoose;

module.exports = mongoose.model('Answer', {
    answer : {type : Array, default: []},
    user: {type: String, default: ""},
    date: {type: Date, default: Date.now},
    score: {type: Number, default: 0 }

});